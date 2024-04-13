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
      position: 20,
    },
    {
      letter: "B",
      position: 20,
    },
    {
      letter: "H",
      position: 20,
    },
    {
      letter: "K",
      position: 10,
    },
    {
      letter: "L",
      position: -10,
    },

    {
      letter: "Q",
      position: -50,
    },

    {
      letter: "R",
      position: -10,
    },
    {
      letter: "S",
      position: 10,
    },
    {
      letter: "T",
      position: 20,
    },
    {
      letter: "W",
      position: 20,
    },

    {
      letter: "Y",
      position: 20,
    },
    {
      letter: "Z",
      position: 20,
    },
  ]);
  const [current, setCurrent] = useState(Letters[5]);
  const [carousselX, setCarousselX] = useState(-300);
  const show4letters = () => {
    let index = Letters.indexOf(current);
    let arr = [];
    for (let i = index - 3; i < index + 4; i++) {
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

  const handleLetter = (letter: { letter: string; position: number }) => {
    // setCurrent(letter);
    let index = Letters.indexOf(letter);
    let currentindex = Letters.indexOf(current);
    if (index === currentindex) {
      return;
    }

    let diff = currentindex - index;
    console.log(diff);
    setCarousselX((prev) => {
      return prev + diff * 100;
    });
    setCurrent(letter);
    setLetters((prev) => {
      let arr = [...prev];
      arr[index].position = -50;
      arr.forEach((l, i) => {
        if (i !== index) {
          if (Math.abs(index - i) === 1) {
            arr[i].position = -10;
          } else if (Math.abs(index - i) === 2) {
            arr[i].position = 10;
          } else {
            arr[i].position = 20;
          }
        }
      });
      return arr;
    });
  };

  //   useEffect(() => {
  //     const handleKey = (e: KeyboardEvent) => {
  //       if (e.key === "ArrowRight") {
  //         let index = Letters.indexOf(current);
  //         if (index === Letters.length - 1) {
  //           setCurrent(Letters[0]);
  //         } else {
  //           setCurrent(Letters[index + 1]);
  //         }
  //       } else if (e.key === "ArrowLeft") {
  //         let index = Letters.indexOf(current);
  //         if (index === 0) {
  //           setCurrent(Letters[Letters.length - 1]);
  //         } else {
  //           setCurrent(Letters[index - 1]);
  //         }
  //       }
  //     };
  //     window.addEventListener("keydown", handleKey);
  //     return () => {
  //       window.removeEventListener("keydown", handleKey);
  //     };
  //   }, [Letters, current]);

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
        className="flex items-center"
        style={{
          width: "49rem",
          height: "20rem",
          overflow: "hidden",
        }}
      >
        {" "}
        <motion.div
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
          {Letters.map((letter, index) => (
            <motion.div
              key={index}
              className={`text-7xl p-8 rounded cursor-pointer ${
                letter.position === 10
                  ? "text-gray-800  bg-gray-700"
                  : letter.position === -10
                  ? "text-gray-700  bg-gray-400"
                  : letter.position === -50
                  ? "text-gray-600 bg-white "
                  : ""
              }`}
              onClick={() => handleLetter(letter)}
              initial={{
                y: letter.position,
              }}
              animate={{
                y: letter.position,
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
        </motion.div>
      </div>
    </main>
  );
}
