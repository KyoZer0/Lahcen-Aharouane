import { contact } from "@/lib/site";
export function Contact() {
  return <footer id="contact" className="section contact-section">
    <div className="contact-content" data-reveal>
      <div><p className="section-label">(05 — Get in touch)</p><h2>Have something<br />in mind?</h2>
        <a className="contact-email text-link" href={`mailto:${contact.email}`}>{contact.email} <span aria-hidden="true">↗</span></a>
      </div>
      <p className="contact-note">Based in Casablanca.<br />Open to a good conversation.</p>
    </div>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} Lahcen Aharouane</p><div>
      <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-link">LinkedIn <span aria-hidden="true">↗</span></a>
      <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-link">GitHub <span aria-hidden="true">↗</span></a>
      <a href="#top" className="text-link">Back to top <span aria-hidden="true">↑</span></a>
    </div></div>
  </footer>;
}

