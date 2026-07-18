import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, AlertCircle, Phone, Mail, MapPin } from 'lucide-react';

export default function Contact({ selectedProject }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    plan: '',
    botcheck: '' // Honeypot spam protector
  });

  const [status, setStatus] = useState({ type: '', message: '' }); // 'success' or 'error'
  const [loading, setLoading] = useState(false);

  // Sync selected project from portfolio inquiry click
  useEffect(() => {
    if (selectedProject) {
      setFormData((prev) => ({
        ...prev,
        subject: `Inquiry regarding ${selectedProject.name}`,
        plan: selectedProject.name,
        message: `I am interested in learning more about the ${selectedProject.name} software platform. Please share details on customization, features, and deployment.`
      }));

      // Scroll to contact form smoothly
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [selectedProject]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    // 1. Check Honeypot
    if (formData.botcheck) {
      console.warn('Bot submission blocked via Honeypot.');
      setStatus({ type: 'success', message: 'Message sent successfully!' }); // False success to fool bots
      return;
    }

    // 2. Validate Inputs
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setStatus({ type: 'error', message: 'All main fields are required.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          plan: formData.plan
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({ type: 'success', message: data.message });
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          plan: '',
          botcheck: ''
        });
      } else {
        // Validation errors returned from backend
        if (data.errors && data.errors.length > 0) {
          setStatus({ type: 'error', message: data.errors[0].message });
        } else {
          setStatus({ type: 'error', message: data.message || 'Something went wrong.' });
        }
      }
    } catch (error) {
      console.error('Contact Form Fetch Error:', error);
      setStatus({ 
        type: 'error', 
        message: 'Could not connect to the server. If this is a demo, please check if the backend is running!' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="section-header reveal">
        <h2 className="section-title">
          Connect <span className="gradient-accent-text">With Us</span>
        </h2>
        <p className="section-subtitle">
          Have a custom software concept or interested in building one of these platforms? Get in touch with us and we'll reply within 24 hours.
        </p>
      </div>

      <div className="contact-grid">
        {/* Info panel */}
        <div className="contact-info-panel reveal">
          <div className="glass" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Direct Communication</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '30px' }}>
              We are currently accepting new projects. Send us a message with your technical requirements, and we typically respond within 24 hours to schedule an initial architecture consultation.
            </p>
            <div className="info-item">
              <div className="info-icon">
                <Mail size={18} />
              </div>
              <div>
                <div className="info-label">Email Support</div>
                <div className="info-val">creators@drixaura.com</div>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <Phone size={18} />
              </div>
              <div>
                <div className="info-label">Direct Lines</div>
                <div className="info-val">+91 98765 43210</div>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <MapPin size={18} />
              </div>
              <div>
                <div className="info-label">Headquarters</div>
                <div className="info-val">Gurugram, India</div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Panel */}
        <div className="contact-form-panel glass reveal" style={{ transitionDelay: '150ms' }}>
          <form onSubmit={handleSubmit}>
            {/* Anti-spam Honeypot field (hidden from users) */}
            <input 
              type="text" 
              name="botcheck" 
              value={formData.botcheck} 
              onChange={handleChange}
              className="honeypot" 
              tabIndex="-1" 
              autoComplete="off" 
              placeholder="If you are human, leave this empty"
            />

            {status.message && (
              <div className={`status-message ${status.type}`}>
                {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                <span>{status.message}</span>
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="form-name">Name</label>
                <input 
                  type="text" 
                  id="form-name"
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="form-email">Email</label>
                <input 
                  type="email" 
                  id="form-email"
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange}
                  placeholder="e.g. john@company.com"
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="form-subject">Subject</label>
                <input 
                  type="text" 
                  id="form-subject"
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange}
                  placeholder="Project subject..."
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="form-plan">Interested Project (Optional)</label>
                <input 
                  type="text" 
                  id="form-plan"
                  name="plan" 
                  value={formData.plan} 
                  onChange={handleChange}
                  placeholder="e.g. ArenaRent"
                  className="form-control"
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="form-message">Message Details</label>
              <textarea 
                id="form-message"
                name="message" 
                value={formData.message} 
                onChange={handleChange}
                placeholder="Describe your project concept, target audience, or timeline requirements..."
                className="form-control"
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Inquiry'}
              {!loading && <Send size={16} />}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
