import React, { useState, useRef, useEffect } from "react";
import Groq from "groq-sdk";
import { Card, Form, InputGroup, Button, Spinner } from "react-bootstrap";
import { Send, User, Zap } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const groq = new Groq({
  apiKey: process.env.REACT_APP_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const modelName = "openai/gpt-oss-120b";
const initialMessages = [
  {
    role: "assistant",
    content:
      "Hello! I'm a fast AI assistant powered by Groq. How can I help you today?",
    model: modelName,
  },
];

// --- Sub-Component for Message Bubble ---
const MessageBubble = ({ message }) => {
  const isUser = message.role === "user";
  const bubbleClass = isUser
    ? "bg-primary text-white ms-auto"
    : "bg-light me-auto";
  const alignClass = isUser ? "justify-content-end" : "justify-content-start";
  const icon = isUser ? <User size={18} /> : <Zap size={18} />;

  return (
    <div className={`d-flex ${alignClass} mb-2 message-bubble-container`}>
      {!isUser && (
        <span className="me-2 text-primary message-icon">{icon}</span>
      )}
      <Card
        className={`p-3 ${bubbleClass} message-bubble`}
        style={{ maxWidth: "80%" }}
      >
        <div style={{ wordBreak: "break-word" }}>
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm, remarkBreaks]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    showLineNumbers
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {String(message.content || "")}
          </ReactMarkdown>
        </div>
        <div
          className={`mt-1 small text-end ${
            isUser ? "text-white-50" : "text-muted"
          }`}
        >
          {isUser ? "You" : message.model || "AI"}
        </div>
      </Card>
      {isUser && <span className="ms-2 text-primary">{icon}</span>}
    </div>
  );
};

// --- Main ChatBot Component ---
export default function ChatBot() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const aiResponseContentRef = useRef("");

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);

    try {
      const chatMessages = newMessages.map((msg) => ({
        role: msg.role,
        content: String(msg.content || ""),
      }));

      aiResponseContentRef.current = "";

      const response = await groq.chat.completions.create({
        messages: chatMessages,
        model: modelName,
        stream: true,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "", model: modelName },
      ]);

      for await (const chunk of response) {
        const chunkContent = chunk.choices[0]?.delta?.content || "";
        aiResponseContentRef.current += chunkContent;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].content = String(
            aiResponseContentRef.current
          );
          return updated;
        });
      }
    } catch (error) {
      console.error("Groq API Error:", error);
      const errorContent = error.message?.includes("API key")
        ? "Error: Invalid Groq API Key. Please check your .env.local file."
        : `Sorry, I ran into an error: ${error.message || "Please try again."}`;

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: errorContent, model: "Error" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-wrapper">
      <Card
        className="shadow-lg flex-grow-1 chatbot-card"
        style={{ maxHeight: "calc(100vh - 200px)", borderRadius: "15px" }}
      >
        <Card.Header
          as="h5"
          className="bg-primary text-white text-center"
          style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}
        >
          ZAPX AI
        </Card.Header>
        <Card.Body className="d-flex flex-column" style={{ overflowY: "auto" }}>
          <div className="flex-grow-1">
            {messages.map((msg, index) => (
              <MessageBubble key={index} message={msg} />
            ))}
            <div ref={messagesEndRef} />

            {isLoading && messages.length > 0 && (
              <div className="d-flex justify-content-start mb-2">
                <Card
                  className="p-3 bg-light me-auto text-primary message-bubble"
                  style={{ maxWidth: "80%" }}
                >
                  <Spinner animation="grow" size="sm" className="me-2" />
                  <span>AI is typing...</span>
                </Card>
              </div>
            )}
          </div>
        </Card.Body>

        <Card.Footer className="p-3">
          <Form onSubmit={handleSend}>
            <InputGroup>
              <Form.Control
                as="textarea"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message here..."
                disabled={isLoading}
                style={{ resize: "none" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(e);
                  }
                }}
              />
              <Button
                variant="primary"
                type="submit"
                disabled={!input.trim() || isLoading}
              >
                {isLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <Send size={20} />
                )}
              </Button>
            </InputGroup>
          </Form>
        </Card.Footer>
      </Card>
    </div>
  );
}
