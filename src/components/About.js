export default function About() {
  return (
    <div className="container about-container">
      <h1 className="my-3">About Us</h1>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item about-accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button about-accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <strong>Our Mission</strong>
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              Building smarter conversations, one message at a time. Our mission
              for the ChatBot project is to provide an intuitive, reliable
              assistant that helps users get answers fast, automate routine
              tasks, and enrich their interaction with AI.
            </div>
          </div>
        </div>

        <div className="accordion-item about-accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed about-accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              <strong>What We Offer</strong>
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              A conversational AI designed for engagement and productivity.
              ChatBot offers natural language understanding, context-aware
              replies, customizable workflows, and seamless integration into
              your web interface so users can ask questions, get
              recommendations, or perform actions without leaving the page.
            </div>
          </div>
        </div>

        <div className="accordion-item about-accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed about-accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              <strong>Why Choose Us</strong>
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              You can count on us for responsiveness, privacy, and ease of use.
              The ChatBot is lightweight, fast-loading, and built using React so
              it adapts to your needs, with a clear focus on delivering helpful,
              human-like interactions while keeping your data safe.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
