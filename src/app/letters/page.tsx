"use client";
import React, { useEffect, useState } from "react";
import { chevronBack, letters } from "../helpers/svgs";
import Link from "next/link";
import Svg from "../assets/Svg";
import { motion } from "framer-motion";
export default function Letterspage() {
  const [Letters, setLetters] = useState([
    {
      letter: "A",
      x: -100,
      y: 0,
    },
    {
      letter: "B",
      x: -100,
      y: 0,
    },
    {
      letter: "H",
      x: -100,
      y: 0,
    },
    {
      letter: "K",
      x: 0,
      y: 0,
    },
    {
      letter: "L",
      x: 100,
      y: -25,
    },

    {
      letter: "Q",
      x: 200,
      y: -50,
    },

    {
      letter: "R",
      x: 300,
      y: -25,
    },
    {
      letter: "S",
      x: 400,
      y: 0,
    },
    {
      letter: "T",
      x: 500,
      y: 0,
    },
    {
      letter: "W",
      x: 600,
      y: 0,
    },

    {
      letter: "Y",
      x: 600,
      y: 0,
    },
    {
      letter: "Z",
      x: 600,
      y: 0,
    },
  ]);
  const [current, setCurrent] = useState(Letters[5]);

  const handleLetter = (letter: { letter: string; x: number; y: number }) => {
    let index = Letters.indexOf(letter);
    let currentindex = Letters.indexOf(current);

    if (index === currentindex) {
      return;
    }

    // check if cliecked left or right based on the index and current index

    setCurrent(letter);

    let idx = Array.from({ length: Letters.length }, (_, i) => i);
    idx.splice(index, 1);

    setLetters((prev) => {
      let arr = [...prev];
      arr[index].x = 200;
      arr[index].y = -50;

      let carousel = generateCarousel(index, arr.length);
      arr[carousel[0]].x = -100;
      arr[carousel[0]].y = 0;
      arr[carousel[1]].x = -100;
      arr[carousel[1]].y = 0;
      arr[carousel[3]].x = 100;
      arr[carousel[3]].y = -25;
      arr[carousel[2]].x = 0;
      arr[carousel[2]].y = 0;

      arr[carousel[4]].x = 300;
      arr[carousel[4]].y = -25;
      arr[carousel[5]].x = 400;
      arr[carousel[5]].y = 0;
      arr[carousel[6]].x = 500;
      arr[carousel[6]].y = 0;
      arr[carousel[7]].x = 500;
      arr[carousel[7]].y = 0;
      // remove all the indexes that exist in the carousel and idx
      idx = idx.filter((n) => !carousel.includes(n));

      while (idx.length > 0) {
        let next = idx.shift();
        if (next! < index) {
          arr[next!].x = -100;
          arr[next!].y = 0;
        } else {
          arr[next!].x = 600;
          arr[next!].y = 0;
        }
      }

      return arr;
    });
  };

  function generateCarousel(input: number, range: number): number[] {
    const carousel: number[] = [];
    for (let i = input - 4; i <= input + 4; i++) {
      const current = ((i % range) + range) % range; // This ensures the number wraps around the range
      if (current !== input) carousel.push(current);
    }
    return carousel;
  }
  useEffect(() => {
    const keyevent = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        let next = Letters.indexOf(current) + 1;
        if (next === Letters.length) {
          next = 0;
        }
        handleLetter(Letters[next]);
      }
      if (e.key === "ArrowLeft") {
        let next = Letters.indexOf(current) - 1;
        if (next === -1) {
          next = Letters.length - 1;
        }
        handleLetter(Letters[next]);
      }
    };
    window.addEventListener("keydown", keyevent);

    let interval = setInterval(() => {
      let next = Letters.indexOf(current) + 1;
      if (next === Letters.length) {
        next = 0;
      }
      handleLetter(Letters[next]);
    }, 2500);
    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", keyevent);
    };
  }, [Letters, current]);

  return (
    <main className="h-screen flex flex-col items-center justify-evenly relative select-none">
      <Link
        className="absolute top-4 left-4 flex  items-center justify-center text-pink-50 font-bold text-4xl cursor-pointer gap-2 bg-indigo-900 rounded p-2 z-50
      
      "
        href="/"
      >
        <Svg
          path={chevronBack.path}
          view={chevronBack.viewBox}
          classlist="w-8 h-8 cursor-pointer fill-current "
        />
        return
      </Link>
      <div className="flex flex-col gap-8 items-center">
        <div className="text-pink-50 text-7xl ">Letters carousel</div>
      </div>
      <div
        className="flex items-center border-2 border-pink-50 "
        style={{
          width: "20rem",
          height: "20rem",
        }}
      >
        <div
          className="text-pink-50 mx-auto "
          style={{
            fontSize: "20rem",
            lineHeight: "16rem",
            textShadow: "#fff 1px 0 10px",
          }}
        >
          {current.letter}
        </div>
      </div>
      <div
        className="flex items-center relative"
        style={{
          width: "49rem",
          height: "20rem",
          overflow: "hidden",
        }}
      >
        {Letters.map((letter, index) => (
          <motion.div
            key={index}
            className={`text-7xl p-8 rounded cursor-pointer absolute left-0 w-32 text-center ${
              letter.y === 0
                ? "text-gray-800  bg-gray-700"
                : letter.y === -25
                ? "text-gray-700  bg-gray-500"
                : letter.y === -50
                ? "text-gray-600 bg-white "
                : "text-gray-800  bg-gray-800"
            }`}
            style={{
              opacity:
                letter.x === -100 || letter.x === 600 || letter.x == 500
                  ? 0
                  : 1,
            }}
            onClick={() => {
              handleLetter(letter);
            }}
            initial={{
              x: letter.x,
              y: letter.y,
            }}
            animate={{
              x: letter.x,
              y: letter.y,
            }}
            transition={{
              duration: 0.5,
            }}
            whileHover={{
              scale: 1.1,
            }}
          >
            {letter.letter}
          </motion.div>
        ))}
        {/* <motion.div
          className="flex gap-12"
          initial={{
            x: -300,
          }}
          animate={{
            x: carousselX,
          }}
          transition={{
            duration: 0.5,
          }}
        >




        </motion.div> */}
      </div>
    </main>
  );
}
