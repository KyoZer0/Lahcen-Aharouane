import { contact } from "@/lib/site";
import { technologyGroups } from "@/lib/technologies";
export function About() {
  return <section id="about" className="section about-section" aria-labelledby="about-title">
    <div className="section-label about-label" data-reveal>(02 — About me)<i aria-hidden="true" /></div>
    <div className="about-content">
      <h2 id="about-title" data-reveal>A developer’s mindset.<br />A product perspective.</h2>
      <div className="about-prose" data-reveal>
        <p>I’m Lahcen, a digital product developer and CTO at Hikaritech, based in Casablanca. I work across software development, product strategy, UI/UX, infrastructure, and digital transformation — building systems that solve real business problems.</p>
        <p>My work spans enterprise software, browser games, and web applications. From understanding the problem to designing, building, deploying, and improving the product, I care about how every part works together.</p>
      </div>
      <dl className="experience-list" data-reveal>
        <div><dt>Now</dt><dd>CTO · Product development</dd><dd><a href="https://hikaritech.ma/en/team" target="_blank" rel="noopener noreferrer">Hikaritech <span aria-hidden="true">↗</span></a></dd></div>
        <div><dt>Previously</dt><dd>IT &amp; digital transformation</dd><dd>Association Initiative Al Amal</dd></div>
        <div><dt>Operations</dt><dd>Processes &amp; digital systems</dd><dd>Diva Ceramica</dd></div>
      </dl>
      <div className="technology-section">
        <div className="technology-heading" data-reveal><h3>What I work with.</h3><p>The tools and disciplines <br />behind the work.</p></div>
        <dl className="technology-list">
          {technologyGroups.map(group => <div key={group.title} data-reveal><dt>{group.title}</dt><dd>{group.items.join(" · ")}</dd></div>)}
        </dl>
      </div>
      <a className="text-link about-link" href={contact.linkedin} target="_blank" rel="noopener noreferrer" data-reveal>More about me on LinkedIn <span aria-hidden="true">↗</span></a>
    </div>
  </section>;
}
