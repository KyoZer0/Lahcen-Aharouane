import { HeroEntrance } from "@/components/Hero/HeroEntrance";
import { FollowingPortrait } from "@/components/Hero/FollowingPortrait";
import { SiteHeader } from "@/components/Hero/SiteHeader";
import { SelectedWork } from "@/components/portfolio/SelectedWork";
import { About } from "@/components/portfolio/About";
import { Services } from "@/components/portfolio/Services";
import { Journal } from "@/components/portfolio/Journal";
import { Contact } from "@/components/portfolio/Contact";
import { PageMotion } from "@/components/portfolio/PageMotion";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <main id="main">
        <HeroEntrance>
          <FollowingPortrait />
          <SiteHeader />
          <div className="hero-rail" aria-hidden="true" data-intro><span>Digital product developer</span><i /><span>2026</span></div>
          <div className="hero-facts" data-intro>
            <p>CTO<span>At Hikaritech</span></p>
            <p>Casablanca<span>Morocco</span></p>
          </div>
          <div className="hero-copy" data-intro>
            <h1 id="hero-title">Hello<span className="sr-only">, I’m Lahcen Aharouane, digital product developer.</span></h1>
            <p className="hero-introduction">— I’m Lahcen Aharouane.</p>
            <p className="hero-description">I build thoughtful digital experiences.</p>
          </div>
          <a className="hero-explore" href="#portfolio" data-intro>Explore my work <span aria-hidden="true">↓</span></a>
        </HeroEntrance>
        <PageMotion><SelectedWork /><About /><Services /><Journal /><Contact /></PageMotion>
      </main>
    </>
  );
}
