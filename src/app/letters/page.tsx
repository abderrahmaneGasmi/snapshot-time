"use client";
import React, { useState } from "react";
import { chevronBack, letters } from "../helpers/svgs";
import Link from "next/link";
import Svg from "../assets/Svg";
import { motion } from "framer-motion";
export default function Letterspage() {
  const [Letters, setLetters] = useState([
    "A",
    "B",

    "H",
    "K",
    "L",

    "Q",
    "R",
    "S",
    "T",

    "W",

    "Y",
    "Z",
  ]);
  const [current, setCurrent] = useState(Letters[Letters.length / 2]);

  const show4letters = () => {
    let index = Letters.indexOf(current);
    let arr = [];
    for (let i = index - 2; i < index + 3; i++) {
      if (i < 0) {
        arr.push(Letters[Letters.length + i]);
      } else if (i >= Letters.length) {
        arr.push(Letters[i - Letters.length]);
      } else {
        arr.push(Letters[i]);
      }
    }
    return arr;
  };

  const handleLetter = (letter: string) => {
    setCurrent(letter);
  };
  return (
    <main className="h-screen flex flex-col items-center justify-evenly relative">
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
          {current}
        </div>
      </div>
      <motion.div className="flex gap-12">
        {show4letters().map((letter, index) => (
          <motion.div
            key={index}
            className={`text-7xl p-8 rounded cursor-pointer ${
              index % 4 === 0
                ? "text-gray-800  bg-gray-700"
                : index === 1 || index == 3
                ? "text-gray-700  bg-gray-400"
                : "text-gray-600 bg-white "
            }`}
            onClick={() => handleLetter(letter)}
            initial={{
              y: index % 4 === 0 ? 10 : index === 1 || index == 3 ? -10 : -50,
            }}
          >
            {letter}
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
