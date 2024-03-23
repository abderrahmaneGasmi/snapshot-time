"use client";
import Link from "next/link";
import React, { useState } from "react";
import Svg from "../assets/Svg";
import { chevronBack } from "../helpers/svgs";
import { motion } from "framer-motion";
import { alphabetinquerty, getrandomword } from "../helpers/utilities";
export default function Wordlepage() {
  const tries = 6;
  const [word, setWord] = useState(getrandomword());
  return (
    <main className="h-screen flex flex-col items-center justify-around relative">
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
        <div className="text-pink-50 text-7xl ">Wordle Game</div>
        <div
          className="flex flex-col gap-4 
        "
        >
          {Array.from({ length: tries }).map((_, idx) => (
            <div className="flex gap-4" key={idx}>
              {Array.from({ length: word.length }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-gray-200 z-10 rounded-xl w-20 h-20"
                ></div>
              ))}
            </div>
          ))}
        </div>
        {/* <div className="grid grid-cols-4 gap-4 w-max ">
          <div
            className={` w-20 h-20   flex items-center justify-center cursor-pointer  relative`}
          >
            <div className="bg-gray-200 z-10 rounded-xl absolute inset-0"></div>
          </div>
        </div> */}
      </div>
      <div
        className="flex flex-wrap gap-2 content-start justify-evenly"
        id="wordleboard"
        style={{
          width: "calc(46px * 12)",
        }}
      >
        {alphabetinquerty.map((letter, idx) => (
          <div
            key={idx}
            className={`${
              letter === "Enter" || letter == "⌫" ? "w-28" : "w-20"
            } bg-indigo-200 z-10 rounded-xl h-16 flex items-center justify-center cursor-pointer relative`}
          >
            <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
              {letter}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
