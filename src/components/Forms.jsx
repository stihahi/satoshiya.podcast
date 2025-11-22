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
        </div >
      </div >
      <style>{`
            .forms - section {
                padding: 4rem 0;
                background- color: #131318;
    }
        .forms - container {
    max - width: 600px;
    margin: 0 auto;
    background - color: var(--card - bg);
    border - radius: 12px;
    border: 1px solid var(--border - color);
    overflow: hidden;
}
        .tabs {
    display: flex;
    border - bottom: 1px solid var(--border - color);
}
        .tab - btn {
    flex: 1;
    background: transparent;
    border: none;
    padding: 1rem;
    color: var(--text - secondary);
    font - weight: 600;
    transition: all 0.3s;
    border - bottom: 2px solid transparent;
}
        .tab - btn:hover {
    color: var(--text - primary);
    background - color: rgba(255, 255, 255, 0.02);
}
        .tab - btn.active {
    color: var(--accent - color);
    border - bottom - color: var(--accent - color);
    background - color: rgba(100, 108, 255, 0.05);
}
        .form - content {
    padding: 2rem;
}
        .form - group {
    margin - bottom: 1.5rem;
}
        .form - group label {
    display: block;
    margin - bottom: 0.5rem;
    color: var(--text - secondary);
    font - size: 0.9rem;
}
        .form - group input,
        .form - group textarea {
    width: 100 %;
    padding: 0.8rem;
    background - color: var(--bg - color);
    border: 1px solid var(--border - color);
    border - radius: 6px;
    color: var(--text - primary);
    font - family: inherit;
    transition: border - color 0.3s;
}
        .form - group input: focus,
        .form - group textarea:focus {
    outline: none;
    border - color: var(--accent - color);
}
        .btn - submit {
    width: 100 %;
}
`}</style>
    </section >
  );
};

export default Forms;
