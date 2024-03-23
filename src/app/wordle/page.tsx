"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Svg from "../assets/Svg";
import { chevronBack } from "../helpers/svgs";
import { alphabetinquerty, getrandomword } from "../helpers/utilities";
import ConfettiScreen from "../assets/ConfettiScreen";
export default function Wordlepage() {
  const tries = 6;
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(true);
  const [acceptedletters, setAcceptedletters] = useState(alphabetinquerty);
  const [gameended, setGameended] = useState(false);
  const [currenttry, setCurrenttry] = useState({
    word: "",
    tries: 0,
  });
  const [wordshistoty, setWordshistoty] = useState([] as string[]);
  useEffect(() => {
    setWord(getrandomword().toUpperCase());
    setLoading(false);
  }, []);

  useEffect(() => {
    if (currenttry.tries === tries) {
      return setGameended(true);
    }
    const wordleboard = document.getElementById("wordleboard");
    if (!wordleboard) return;
    const wordleboardevent = (e: MouseEvent) => {
      if (gameended) return;
      const target = e.target as HTMLElement;
      target.classList.add("bg-indigo-500");
      setTimeout(() => {
        target.classList.remove("bg-indigo-500");
      }, 200);
      if (target.innerText === "⌫") {
        setCurrenttry({
          word: currenttry.word.slice(0, -1),
          tries: currenttry.tries,
        });
      } else if (target.innerText === "Enter") {
        if (currenttry.word.length !== word.length)
          return console.log("Word is not complete");
        if (currenttry.word === word) {
          setWordshistoty([...wordshistoty, currenttry.word]);
          setGameended(true);
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
  }, [currenttry, word, wordshistoty, gameended]);
  const getcurrentletter = (idx: number, lineidx: number) => {
    if (currenttry.tries === lineidx && currenttry.word[idx]) {
      return currenttry.word[idx];
    }
    if (wordshistoty.length > lineidx && wordshistoty[lineidx][idx]) {
      return wordshistoty[lineidx][idx];
    }
    return "";
  };
  const getlettercolor = (idx: number, lineidx: number) => {
    if (wordshistoty.length === 0) return "bg-gray-200";

    if (lineidx + 1 <= wordshistoty.length) {
      if (word[idx] === wordshistoty[lineidx][idx]) {
        return "bg-green-500 text-gray-200 hover:bg-green-500";
      }

      if (word.includes(wordshistoty[lineidx][idx])) {
        return "bg-yellow-500 text-gray-200 hover:bg-yellow-500";
      }
      return "bg-gray-400 text-gray-200 hover:bg-gray-400";
    }
    return "bg-gray-200 text-gray-500";
  };
  useEffect(() => {
    if (gameended) return;
    wordshistoty.forEach((wordwe) => {
      // get the letters that exist in wordwe but not in word
      const letters = wordwe
        .split("")
        .filter((letter) => !word.includes(letter));
      // remove the letters from acceptedletters
      setAcceptedletters((prev) =>
        prev.filter((letter) => !letters.includes(letter))
      );
    });
  }, [wordshistoty, word, gameended]);

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
                    className={`z-10 rounded-xl w-20 h-20 flex items-center justify-center cursor-pointer relative hover:bg-indigo-200 ${getlettercolor(
                      idx2,
                      idx1
                    )}`}
                  >
                    <div className=" text-5xl font-bold ">
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
                } ${
                  acceptedletters.includes(letter)
                    ? "bg-indigo-100"
                    : "bg-gray-500 text-gray-200"
                } 
                
                 z-10 rounded-xl h-16 flex items-center justify-center cursor-pointer relative hover:bg-indigo-200 `}
              >
                <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-gray-800">
                  {letter}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      (!loading &&(
      <div className="text-gray-200 text-3xl font-bold ">{word}</div>
      ))
      {gameended && <ConfettiScreen type="wordle" />}
    </main>
  );
}
