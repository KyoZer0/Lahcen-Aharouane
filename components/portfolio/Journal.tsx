import { articles } from "@/lib/portfolio";
export function Journal() {
  return <section id="journal" className="section journal-section" aria-labelledby="journal-title">
    <p className="section-label" data-reveal>(04 — Journal)</p>
    <div className="section-heading" data-reveal><h2 id="journal-title">Notes on play &amp; product.</h2><p>A few things I’ve been <br />writing about.</p></div>
    <div className="journal-list">{articles.map((article, index) => <a href={article.url} key={article.url} className="journal-row" target="_blank" rel="noopener noreferrer" data-reveal>
      <span className="journal-category">0{index + 1} / {article.category}</span><h3>{article.title}</h3><span className="journal-publication">{article.publication} <span aria-hidden="true">↗</span></span>
    </a>)}</div>
  </section>;
}

