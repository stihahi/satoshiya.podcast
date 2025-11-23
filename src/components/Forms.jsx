import React, { useState } from 'react';

const Forms = () => {
  const [activeTab, setActiveTab] = useState('feedback');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(`Submitting ${activeTab}:`, data);
    alert(`Thank you for your ${activeTab}! (Check console for data)`);
    e.target.reset();
  };

  return (
    <section id="feedback" className="forms-section">
      <div className="container">
        <h2 className="section-title">Get Involved</h2>
        <div className="forms-container">
          <div className="tabs">
            <button
              className={`tab-btn ${activeTab === 'feedback' ? 'active' : ''}`}
              onClick={() => setActiveTab('feedback')}
            >
              Feedback
            </button>
            <button
              className={`tab-btn ${activeTab === 'request' ? 'active' : ''}`}
              onClick={() => setActiveTab('request')}
            >
              Request Episode
            </button>
            <button
              className={`tab-btn ${activeTab === 'question' ? 'active' : ''}`}
              onClick={() => setActiveTab('question')}
            >
              Ask a Question
            </button>
          </div>

          <div className="form-content">
            <form onSubmit={handleSubmit} className="form">
              {activeTab === 'feedback' && (
                <>
                  <div className="form-group">
                    <label htmlFor="name">Name (Optional)</label>
                    <input type="text" id="name" name="name" placeholder="Your name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Your Feedback</label>
                    <textarea id="message" name="message" required placeholder="What do you think about the show?" rows="5"></textarea>
                  </div>
                </>
              )}

              {activeTab === 'request' && (
                <>
                  <div className="form-group">
                    <label htmlFor="topic">Topic / Guest</label>
                    <input type="text" id="topic" name="topic" required placeholder="Who or what should we talk about?" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="details">Details</label>
                    <textarea id="details" name="details" placeholder="Any specific angles or questions?" rows="5"></textarea>
                  </div>
                </>
              )}

              {activeTab === 'question' && (
                <>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" required placeholder="Your name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="question">Your Question</label>
                    <textarea id="question" name="question" required placeholder="What would you like to ask us?" rows="5"></textarea>
                  </div>
                </>
              )}

              <button type="submit" className="btn btn-submit">Submit {activeTab}</button>
            </form>
          </div>
        </div>
      </div>
      <style>{`
        .forms-section {
          padding: 6rem 0;
          position: relative;
        }
        .forms-container {
          max-width: 600px;
          margin: 0 auto;
          background: var(--card-glass);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 24px;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
        }
        .tabs {
          display: flex;
          padding: 0.5rem;
          background: rgba(0, 0, 0, 0.2);
          border-bottom: 1px solid var(--border-color);
          gap: 0.5rem;
        }
        .tab-btn {
          flex: 1;
          background: transparent;
          border: none;
          padding: 1rem;
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          border-radius: 12px;
          position: relative;
          overflow: hidden;
        }
        .tab-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }
        .tab-btn.active {
          color: white;
          background: var(--accent-gradient);
          box-shadow: var(--shadow-md);
        }
        .form-content {
          padding: 2.5rem;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.8rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 500;
          margin-left: 4px;
        }
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 1rem 1.2rem;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          color: var(--text-primary);
          font-family: inherit;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--accent-color);
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
          background: rgba(0, 0, 0, 0.5);
        }
        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }
        .btn-submit {
          width: 100%;
          padding: 1rem;
          font-size: 1.1rem;
          margin-top: 1rem;
        }
      `}</style>
    </section>
  );
};

export default Forms;
