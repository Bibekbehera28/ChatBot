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
          <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              Empowering Text, One Tool at a Time. At Text Utils, our mission is to simplify and supercharge your text editing experience...
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
          <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              Smart Utilities for Smarter Text. Text Utils provides a suite of powerful features including case conversion, whitespace trimming...
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
          <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              We focus on performance and simplicity. Text Utils is lightweight, responsive, and built with user experience in mind...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
