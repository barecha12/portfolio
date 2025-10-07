import { useState, FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([formData]);

      if (error) throw error;

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');
    }
  };

  return (
    <section className="stack gap-lg">
      <h1>Contact</h1>
      <p className="muted">I read every message. You'll get a reply from me personally.</p>

      {status === 'success' && (
        <div className="alert alert-success">
          <FiCheckCircle size={20} />
          <span>Message sent successfully! I'll get back to you soon.</span>
        </div>
      )}

      {status === 'error' && (
        <div className="alert alert-error">
          <FiAlertCircle size={20} />
          <span>{errorMessage || 'Failed to send message. Please try again.'}</span>
        </div>
      )}

      <form className="form" onSubmit={handleSubmit}>
        <label>
          <span>Name</span>
          <input
            name="name"
            type="text"
            placeholder="Enter your name..."
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            disabled={status === 'loading'}
          />
        </label>
        <label>
          <span>Email</span>
          <input
            name="email"
            type="email"
            placeholder="Enter your email here..."
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            disabled={status === 'loading'}
          />
        </label>
        <label>
          <span>Message</span>
          <textarea
            name="message"
            rows={6}
            placeholder="Write your message here..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            disabled={status === 'loading'}
          ></textarea>
        </label>
        <button
          className="btn"
          type="submit"
          disabled={status === 'loading'}
          style={{
            display: "inline-block",
            textAlign: "center",
          }}
        >
          {status === 'loading' ? 'Sending...' : 'Send message'}
        </button>
      </form>
      <p className="muted">Prefer email? <a href="mailto:ashenafibarecha34@gmail.com">ashenafibarecha34@gmail.com</a></p>
    </section>
  );
}
