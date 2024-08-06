"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "ABOUT", href: "/about" },
  { name: "WORK", href: "/projects" },
];

const Nav = () => {
  const [time, setTime] = useState(new Date());
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const casablancaTime = new Date(
    time.toLocaleString("en-US", { timeZone: "Africa/Casablanca" })
  );

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    }),
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        ease: "linear",
        type: "spring",
        stiffness: 100,
      }}
      className="py-6 px-4 sm:px-8 flex items-center justify-between "
    >
      <Link href={'/'}>
        <h1 className="text-xl z-20">
          <span className="text-primary-col font-black">AHAROUANE</span>.dev
        </h1>
      </Link>

      {/* Hamburger menu */}
      <button
        ref={buttonRef}
        className={`z-50 lg:hidden ${isOpen ? "fixed top-4 right-4" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            stroke={isOpen ? "black" : "currentColor"}
          ></path>
        </svg>
      </button>

      {/* Desktop menu */}
      <div className="hidden lg:flex items-center justify-center gap-8 bg-[#E8E3DA] py-2 px-6 text-black rounded-lg text-[12px]">
        {links.map((link, index) => (
          <Link key={index} href={link.href} className="">
            {link.name}
          </Link>
        ))}
        <button className="bg-black text-[#E8E3DA] py-4 px-8 rounded-lg">
          GET IN TOUCH
        </button>
      </div>

      {/* Side menu (mobile) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed md:hidden top-0 right-0 h-full w-64 bg-primary-col shadow-2xl  z-40 flex flex-col justify-center items-center gap-10"
          >
            {links.map((link, index) => (
              <motion.div
                key={index}
                variants={linkVariants}
                custom={index}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <Link
                  href={link.href}
                  className="text-black py-4 text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.button
              variants={linkVariants}
              custom={links.length}
              initial="closed"
              animate="open"
              exit="closed"
              className="bg-black text-[#E8E3DA] py-4 px-8 rounded-lg mt-4"
              onClick={() => setIsOpen(false)}
            >
              GET IN TOUCH
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hidden sm:flex flex-col">
        <h1 className="text-lg">Based in Casablanca</h1>
        {isMounted && (
          <p className="self-end">
            {casablancaTime.toLocaleTimeString()} GMT +1
          </p>
        )}
      </div>
    </motion.nav>
  );
};

export default Nav;
