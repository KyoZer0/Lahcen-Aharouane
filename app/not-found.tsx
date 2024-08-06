import React from "react";
import Image from "next/image";
import Nav from "@/components/Navigation/Nav";

function NotFound() {
  return (
    <>
      <Nav />
      <Image src="/itsfine.gif" alt="404" fill className="-z-10 opacity-10" />
      <div className="h-[70vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-[200px] font-bold">404</h1>
        <p className="text-2xl md:text-3xl lg:text-4xl text-gray-700 mt-4">
          Page Not Found
        </p>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mt-2">
          Sorry, the page you are looking for does not exist.
        </p>
        <a
          href="/"
          className="mt-8 inline-block bg-primary-col text-white px-6 py-3 rounded-lg text-lg md:text-xl transition duration-300 hover:bg-orange-200"
        >
          Go Back Home
        </a>
      </div>
    </>
  );
}

export default NotFound;
