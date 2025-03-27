
import React from "react";
import { Link } from "react-router-dom";

const ContactSection: React.FC = () => {
  // Function to handle the contact button click
  const handleContactClick = () => {
    // Find the button with the "nav-link" class and dispatch a click event on it
    const contactButton = document.querySelector('button.nav-link[data-target="contact"]');
    if (contactButton) {
      contactButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  };

  return (
    <div className="mt-10 bg-gradient-to-r from-cyan/20 to-blue-500/20 border border-white/10 rounded-lg p-8 text-center">
      <h2 className="text-2xl font-bold text-white mb-4">Still have questions?</h2>
      <p className="text-white/70 mb-6 max-w-md mx-auto">
        We're here to help. Reach out to our support team for personalized assistance with any questions or concerns.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleContactClick}
          className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-gradient-to-r from-cyan to-blue-500 text-white hover:opacity-90 transition-opacity"
        >
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default ContactSection;
