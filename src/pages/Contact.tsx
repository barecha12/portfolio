export default function Contact() {
  return (
    <section className="stack gap-lg">
      <h1>Contact</h1>
      <p className="muted">I read every message. You’ll get a reply from me personally.</p>
      {/* Use Formspree, Getform or your backend. Replace the action URL below. */}
      <form className="form" action="https://formspree.io/f/yourFormId" method="POST">
        <label>
          <span>Name</span>
          <input name="name" type="text" placeholder="Enter Your name..." required />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" placeholder="Enter your email here..." required />
        </label>
        <label>
          <span>Message</span>
          <textarea name="message" rows={6} placeholder="Write your message here..." required></textarea>
        </label>
        <button className="btn" type="submit">Send message</button>
      </form>
      <p className="muted">Prefer email? <a href="mailto:you@yourdomain.com">ashenafibarecha34@gmail.com</a></p>
    </section>
  );
}
