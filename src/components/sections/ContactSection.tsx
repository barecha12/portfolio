import { useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowRight, Clock3, Github, Linkedin, Mail, Send, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';
import { CONTACT_CHANNELS, type SocialIcon } from '../../config/site';
import { submitContactForm } from '../../lib/contact';

type FormStatus = 'idle' | 'loading' | 'success' | 'error' | 'rate_limited';

const channelIconMap: Record<SocialIcon, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  telegram: Send
};

export default function ContactSection() {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: ''
  });

  const handleContactSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFormStatus('loading');

    const result = await submitContactForm(formData);

    if (result.ok) {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '', website: '' });
      window.setTimeout(() => setFormStatus('idle'), 3500);
      return;
    }

    if (result.reason === 'rate_limited') {
      setFormStatus('rate_limited');
      return;
    }

    if (result.reason === 'validation') {
      setFormStatus('error');
      return;
    }

    if (result.reason === 'config') {
      setFormStatus('error');
      return;
    }

    setFormStatus('error');
  };

  return (
    <section id="contact" className="section-anchor section-block">
      <AnimatedSection>
        <div className="section-header">
          <div>
            <span className="kicker">Contact</span>
            <h2>Start a Project</h2>
          </div>
        </div>

        <div className="contact-layout enhanced-contact">
          <aside className="panel contact-info-panel">
            <h3>Direct Channels</h3>
            <p className="muted">
              Share your project goal, timeline, and expected outcome. I can help with both product and engineering delivery.
            </p>
            <ul className="contact-channel-list">
              {CONTACT_CHANNELS.map((channel) => {
                const Icon = channelIconMap[channel.icon];
                return (
                  <li key={channel.label}>
                    <a
                      href={channel.href}
                      target={channel.external ? '_blank' : undefined}
                      rel={channel.external ? 'noreferrer' : undefined}
                    >
                      <span className="channel-main">
                        <span className="channel-icon">
                          <Icon size={15} />
                        </span>
                        <span className="channel-text">
                          <strong>{channel.label}</strong>
                          <span>{channel.value}</span>
                        </span>
                      </span>
                      <ArrowRight size={14} />
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="contact-trust">
              <span className="support-chip">
                <Clock3 size={14} />
                Usually replies within 24 hours
              </span>
              <span className="support-chip">
                <ShieldCheck size={14} />
                Clear and reliable communication
              </span>
            </div>
          </aside>

          <div className="panel contact-panel compact-contact">
            {formStatus === 'success' && (
              <div className="alert alert-success" role="status" aria-live="polite">
                Message sent. I will get back to you soon.
              </div>
            )}
            {formStatus === 'error' && (
              <div className="alert alert-error" role="alert">
                Something went wrong. Please email me directly.
              </div>
            )}
            {formStatus === 'rate_limited' && (
              <div className="alert alert-error" role="alert">
                Please wait one minute before sending another message.
              </div>
            )}

            <form className="form" onSubmit={handleContactSubmit}>
              <label className="sr-only-field" aria-hidden="true">
                <span>Website</span>
                <input
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(event) => setFormData({ ...formData, website: event.target.value })}
                />
              </label>
              <label>
                <span>Name</span>
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                  required
                  disabled={formStatus === 'loading'}
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                  required
                  disabled={formStatus === 'loading'}
                />
              </label>
              <label>
                <span>Message</span>
                <textarea
                  name="message"
                  rows={5}
                  minLength={20}
                  placeholder="Describe what you want to build..."
                  value={formData.message}
                  onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                  required
                  disabled={formStatus === 'loading'}
                />
              </label>
                <button type="submit" className="btn" disabled={formStatus === 'loading'}>
                  {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
                <p className="form-note muted">
                  Spam protection enabled: one message per minute.
                </p>
              </form>
            </div>
          </div>
      </AnimatedSection>
    </section>
  );
}
