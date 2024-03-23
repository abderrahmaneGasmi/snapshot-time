"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Svg from "../assets/Svg";
import { chevronBack } from "../helpers/svgs";
import { motion } from "framer-motion";
import { alphabetinquerty, getrandomword } from "../helpers/utilities";
export default function Wordlepage() {
  const tries = 6;
  const [word, setWord] = useState(getrandomword());
  const [acceptedletters, setAcceptedletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currenttry, setCurrenttry] = useState({
    word: "",
    tries: 0,
  });
  const [wordshistoty, setWordshistoty] = useState([] as string[]);
  useEffect(() => {
    setWord(getrandomword());
    setLoading(false);
  }, []);

  useEffect(() => {
    const wordleboard = document.getElementById("wordleboard");
    if (!wordleboard) return;
    const wordleboardevent = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.innerText === "⌫") {
        setCurrenttry({
          word: currenttry.word.slice(0, -1),
          tries: currenttry.tries,
        });
      } else if (target.innerText === "Enter") {
        if (currenttry.word.length !== word.length)
          return console.log("Word is not complete");

        if (currenttry.word === word) {
          console.log("You won");
        } else {
          setWordshistoty([...wordshistoty, currenttry.word]);
          setCurrenttry({
            word: "",
            tries: currenttry.tries + 1,
          });
        }
      } else {
        if (currenttry.word.length >= word.length) {
          return console.log("Word is complete");
        }

        setCurrenttry({
          word: currenttry.word + target.innerText,
          tries: currenttry.tries,
        });
      }
    };

    wordleboard.addEventListener("click", wordleboardevent);

    // add keydown event
    const keyevent = (e: KeyboardEvent) => {
      let key = e.key.toUpperCase();
      if (key === "BACKSPACE") key = "backspace";
      if (key === "ENTER") key = "Enter";
      if (alphabetinquerty.includes(key) || key === "backspace") {
        const target = document.getElementById(key) as HTMLElement;
        console.log(target);
        target?.click();
        //     const target = document.querySelector(
        //       `#wordleboard > div:nth-child(${alphabetinquerty.indexOf(e.key) + 1})`
        //     ) as HTMLElement;
        //     target.click();
      }
    };
    window.addEventListener("keydown", keyevent);
    return () => {
      wordleboard.removeEventListener("click", wordleboardevent);
      window.removeEventListener("keydown", keyevent);
    };
  }, [currenttry, word]);
  const getcurrentletter = (idx: number, lineidx: number) => {
    if (currenttry.tries === lineidx && currenttry.word[idx]) {
      return currenttry.word[idx];
    }
    if (wordshistoty.length > lineidx && wordshistoty[lineidx][idx]) {
      return wordshistoty[lineidx][idx];
    }
    return "";
  };
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
      {!loading && (
        <div className="flex flex-col gap-8 items-center">
          <div className="text-pink-50 text-7xl ">Wordle Game</div>
          <div
            className="flex flex-col gap-4 
        "
          >
            {Array.from({ length: tries }).map((_, idx1) => (
              <div className="flex gap-4" key={idx1}>
                {Array.from({ length: word.length }).map((_, idx2) => (
                  <div
                    key={idx2}
                    className="bg-gray-200 z-10 rounded-xl w-20 h-20 flex items-center justify-center"
                  >
                    <div className=" text-5xl font-bold text-gray-600">
                      {getcurrentletter(idx2, idx1)}
                    </div>
                  </div>
                ))}
              </div>
            ))}
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
                id={letter === "⌫" ? "backspace" : letter}
                className={`${
                  letter === "Enter" || letter == "⌫" ? "w-40" : "w-20"
                } bg-indigo-100 z-10 rounded-xl h-16 flex items-center justify-center cursor-pointer relative hover:bg-indigo-200`}
              >
                <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-gray-800">
                  {letter}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
