"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const links = [["About me", "/#about"], ["Work", "/work"], ["Services", "/#services"], ["Journal", "/#journal"]];
export function SiteHeader({ inner = false }: { inner?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className={`site-header${inner ? " site-header-inner" : ""}`} data-intro onKeyDown={event => { if (event.key === "Escape") setOpen(false); }}>
      <Link href="/#top" className="wordmark" aria-label="Lahcen Aharouane, home">LA.</Link>
      <button className="menu-toggle" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>{open ? "Close −" : "Menu +"}</button>
      <nav id="primary-navigation" aria-label="Primary navigation" className={`site-nav ${open ? "is-open" : ""}`}>
        {links.map(([label, href]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>)}
      </nav>
      <Link href="/#contact" className="header-contact text-link" onClick={() => setOpen(false)}>Let’s talk <span aria-hidden="true">↗</span></Link>
    </header>
  );
}

