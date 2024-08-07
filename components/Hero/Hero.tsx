"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Projects from "./Projects";
import Link from "next/link";
import { AnimatedGradient } from "../Animatedgradient";

function Hero() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <AnimatedGradient />
      </motion.div>

      <section className="min-h-screen relative">
        {/* <Image
          src="/moon.jpg"
          alt="Moon background"
          layout="fill"
          objectFit="cover"
          className="opacity-50 blur-xl select-none"
        /> */}
        <div className="flex flex-col items-center justify-center min-h-screen p-4 relative z-10">
          <motion.h1
            initial={{ y: 0, opacity: 0, scale: 0.7 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              type: "spring",
              stiffness: 100,
            }}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-[150px] text-center mb-4"
          >
            Lahcen Aharouane
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.3, ease: "easeInOut" }}
            className="max-w-4xl text-center text-sm sm:text-base md:text-lg"
          >
            Hello world, I'm a full-stack developer and I love to build web
            applications using the latest technologies. I'm a fast learner and I
            love to learn new things.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 mt-6 sm:mt-9">
            <motion.button
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
              className="bg-primary-col py-2 px-4 rounded-md text-[#E8E3DA] w-full sm:w-auto"
            >
              CONTACT
            </motion.button>
            <Link href="/projects">
              <motion.button
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.8 }}
                className="py-2 px-4 w-full sm:w-auto"
              >
                WORK &rarr;
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-primary-col">
        <div className="min-h-screen p-4 sm:p-8 md:p-12 lg:p-16 flex items-center">
          <div className="text-black max-w-4xl mx-auto">
            <h2 className="text-lg sm:text-xl mb-4">00. About Me</h2>
            <p className="text-xl sm:text-2xl md:text-3xl  lg:text-4xl text-justify">
              Hi, I'm Lahcen Aharouane, a front-end developer and software
              engineering student at Holberton School. I specialize in creating
              responsive, user-friendly websites using CSS, Tailwind, React.js,
              and Figma. Over the years, I've developed various websites across
              sectors like e-commerce and education. Currently, I'm the Graphic
              Designer & Communications Lead at Association Initiative Al Amal,
              where I'm enhancing my skills in design and communication and
              contributing to the success of the association. My goal is to
              become a full-stack developer and create impactful solutions.
            </p>
          </div>
        </div>
      </section>

      <Projects />

      <section className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl mb-8"
        >
          Get In Touch
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center gap-4"
        >
          <Link
            href="mailto:your.email@example.com"
            className="text-primary-col hover:underline"
          >
            lahcen.aharouane@gmail.com
          </Link>
          <div className="flex gap-4">
            <Link
              href="https://ma.linkedin.com/in/lahcen-aharouane-457a29223"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-col hover:underline"
            >
              LinkedIn
            </Link>
            <Link
              href="https://github.com/KyoZer0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-col hover:underline"
            >
              GitHub
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}

export default Hero;
