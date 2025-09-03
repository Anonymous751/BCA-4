// src/sharedComponents/Hero.component.jsx
import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function Hero() {
  const typedRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        "Welcome to BlogContent",
        "Share your stories with the world",
        "Read, Write, Inspire"
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1500,
      loop: true,
      showCursor: true,
      cursorChar: "|"
    };

    const typed = new Typed(typedRef.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-r from-indigo-600 to-purple-700">
      <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
        <span ref={typedRef}></span>
      </h1>
      <p className="text-white/80 text-lg md:text-xl max-w-2xl">
        Discover amazing blogs, write your own, and connect with a community of passionate readers.
      </p>
    </div>
  );
}
