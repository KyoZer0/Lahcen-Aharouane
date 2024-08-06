"use client";

import Nav from "@/components/Navigation/Nav";
import Image from "next/image";
import Link from "next/link";
import { Mail, Github, Twitter, Facebook, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const springEffect = {
  type: "spring",
  stiffness: 100,
  damping: 15,
};

export default function About() {
  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <Nav />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springEffect}
        className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={springEffect}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            About Me
          </h1>
          <p className="text-xl text-gray-600">
            Front-end Developer & UI/UX Designer
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springEffect}
          className="bg-gray-50 rounded-xl p-8 mb-16 shadow-sm"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={springEffect}
            className="relative w-56 h-56 mx-auto mb-8"
          >
            <Image
              src="/lahcen2.jpg"
              alt="Lahcen Aharouane"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, ...springEffect }}
            className="text-lg leading-relaxed mb-6 text-center"
          >
            Hi, I'm Lahcen Aharouane, a front-end developer, ui/ux designer and
            software engineering student at Holberton School. I specialize in
            creating responsive, user-friendly websites using CSS, Tailwind,
            React.js, and Figma. Over the years, I've developed various websites
            across sectors like e-commerce and education.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ...springEffect }}
          className="space-y-12"
        >
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              My Journey
            </h2>
            <div className="space-y-4">
              <p>
                Currently, I'm the Graphic Designer & Web Developer at
                Association Initiative Al Amal pour l'Intégration Sociale, where
                I'm enhancing my skills in design and communication and
                contributing to the success of the association.
              </p>
              <p>
                My goal is to become a full-stack developer and create impactful
                solutions. I'm always eager to learn new technologies and take
                on challenging projects that allow me to grow my skillset.
              </p>
              <p>
                With over five years of experience as a freelancer and having
                worked as a web developer at Arcane Studios, where I helped
                recruit new developers to the server, I bring a wealth of
                knowledge and expertise to every project I undertake.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Skills & Expertise
            </h2>
            <p className="mb-4">
              My core skills include HTML, CSS, JavaScript, React.js, and
              Tailwind CSS. I'm proficient in using Figma for design work and
              enjoy creating intuitive user interfaces that enhance the overall
              user experience.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Let's Connect
            </h2>
            <p className="mb-6">
              I'm always open to new opportunities and collaborations. If you'd
              like to discuss a project or just want to say hi, don't hesitate
              to reach out!
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, ...springEffect }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="mailto:your.email@example.com"
                className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full transition duration-300"
              >
                <Mail size={20} /> Email
              </Link>
              <Link
                href="https://github.com/KyoZer0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full transition duration-300"
              >
                <Github size={20} /> Github
              </Link>

              <Link
                href="https://ma.linkedin.com/in/lahcen-aharouane-457a29223"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition duration-300"
              >
                <Linkedin size={20} /> Linkedin
              </Link>
            </motion.div>
          </section>
        </motion.div>
      </motion.div>
    </div>
  );
}
