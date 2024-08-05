import React from "react";
import { motion, useInView } from "framer-motion";

interface Project {
  name: string;
  description: string;
  projectNumber: string;
}

const projects: Project[] = [
  {
    name: "AIAIS",
    description:
      "A comprehensive website for Association Initiative Al Amal pour l'Intégration Sociale, focused on promoting social integration and community support.",
    projectNumber: "P.01",
  },
  {
    name: "Centre Al Amal",
    description:
      "An advanced center management platform designed to facilitate interactions between students, teachers, and administrators, streamlining educational operations and communication.",
    projectNumber: "P.02",
  },
  {
    name: "Arcane Studios",
    description:
      "A platform that connects clients with freelancers for a wide range of services, fostering a collaborative environment for professional growth.",
    projectNumber: "P.03",
  },
];

function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="min-h-fit p-4 sm:p-8 md:p-12 lg:p-16 flex items-center bg-[#E8E3DA]">
      <motion.div
        className="text-black w-full mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h2 className="text-lg sm:text-xl mb-4 mt-10" variants={itemVariants}>
          01. Projects
        </motion.h2>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 mt-10">
          {projects.map((project) => {
            const ref = React.useRef(null);
            const isInView = useInView(ref, { once: true, amount: 0.7 });

            return (
              <motion.div
                key={project.projectNumber}
                ref={ref}
                className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] lg:grid-cols-[1fr_3fr_auto] gap-4 items-start sm:items-center border-t border-black py-8 px-4"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={itemVariants}
              >
                <div>
                  <p className="text-sm font-light text-gray-500">
                    {project.projectNumber}
                  </p>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-2">
                    {project.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 mt-2 sm:mt-0">
                  {project.description}
                </p>
                <motion.button
                  className="flex items-center gap-2 bg-primary-col text-black py-2 px-4 rounded hover:scale-105 hover:bg-transparent hover:border border-black transition-all duration-500 mt-4 sm:mt-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Visit{" "}
                  <span className="w-4 h-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="-rotate-45"
                    >
                      <line x1="0" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </motion.button>
              </motion.div>
            );
        })}
        <p className="mt-6 text-center underline underline-offset-2">see more &rarr;</p>
        </div>
      </motion.div>
    </section>
  );
}

export default Projects;
