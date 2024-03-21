"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Svg from "../assets/Svg";
import { chevronBack } from "../helpers/svgs";
import { alphabet, choosedirection, getrandomword } from "../helpers/utilities";
interface Word {
  word: string;
  direction: string;
  idxs: number[];
  found: boolean;
}
export default function Wordpage() {
  const [letters, Setletters] = useState([] as Array<string>);
  const [randomwords, setRandomwords] = useState([] as Array<Word>);

  useEffect(() => {
    // fill 144 random letters using alphabet array

    const t = [] as string[];
    const randomwords = [] as Array<Word>;
    Array.from({ length: 144 }).map((i, o) =>
      t.push(alphabet[Math.floor(Math.random() * alphabet.length)])
    );

    // make 8 words
    for (let i = 0; i < 8; i++) {
      const randomword = getrandomword(
        randomwords.map((i) => i.word)
      ).toUpperCase();
      const randomidx = Math.floor(Math.random() * 144);
      const drection = choosedirection(
        randomidx,
        randomword.length,
        randomwords.map((i) => i.idxs).flat()
      );

      const word = randomword.split("");
      const wordidx = [] as number[];
      word.map((i, o) => wordidx.push(o));
      const randomworditem = {
        word: randomword,
        direction: drection,
        idxs: [] as number[],
        found: false,
      };

      wordidx.map((i, o) => {
        if (drection === "up") {
          randomworditem.idxs.push(randomidx - o * 12);
          return (t[randomidx - o * 12] = word[i]);
        }
        if (drection === "down") {
          randomworditem.idxs.push(randomidx + o * 12);
          return (t[randomidx + o * 12] = word[i]);
        }
        if (drection === "left") {
          randomworditem.idxs.push(randomidx - o);
          return (t[randomidx - o] = word[i]);
        }
        if (drection === "right") {
          randomworditem.idxs.push(randomidx + o);
          return (t[randomidx + o] = word[i]);
        }
        if (drection === "upleft") {
          randomworditem.idxs.push(randomidx - o * 12 - o);
          return (t[randomidx - o * 12 - o] = word[i]);
        }
        if (drection === "upright") {
          randomworditem.idxs.push(randomidx - o * 12 + o);
          return (t[randomidx - o * 12 + o] = word[i]);
        }
        if (drection === "downleft") {
          randomworditem.idxs.push(randomidx + o * 12 - o);
          return (t[randomidx + o * 12 - o] = word[i]);
        }
        if (drection === "downright") {
          randomworditem.idxs.push(randomidx + o * 12 + o);
          return (t[randomidx + o * 12 + o] = word[i]);
        }
      });
      randomwords.push(randomworditem);
    }
    Setletters(t);
    console.log(randomwords);
    setRandomwords(randomwords);
  }, []);
  const checkifidxexist = (idx: number) => {
    const found = randomwords.find((i) => i.idxs.includes(idx));
    if (found) {
      return true;
    }
    return false;
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
      <div
        className="flex flex-col gap-8 items-center w-full 
      "
      >
        <div className="text-pink-50 text-7xl ">Word finder Game</div>
        <div
          className="grid  w-full  justify-center gap-8
        "
          style={{
            gridTemplateColumns: "2fr 1fr",
          }}
        >
          <div
            className="grid grid-cols-12 grid-rows-12 gap-2 border-2 rounded-md border-gray-50 p-3 w-max
        justify-self-end "
          >
            {letters.map((i, o) => (
              <div
                className="text-3xl text-gray-100 font-bold px-6 py-4 cursor-pointer  rounded-md select-none 
                   "
                style={{
                  backgroundColor: !checkifidxexist(o)
                    ? "rgba(49, 46, 129, 0.3)"
                    : "red",
                }}
                key={o}
              >
                {i}
              </div>
            ))}
          </div>
          <div
            className="flex flex-col min-w-80 justify-self-center gap-8
          
          "
          >
            <div className=" text-7xl text-gray-100 font-bold mx-auto">
              Words to find
            </div>
            <div className="flex flex-wrap gap-4">
              {randomwords.map((i, o) => (
                <div
                  className="text-2xl text-gray-100 font-bold px-6 py-4 cursor-pointer  rounded-md select-none bg-indigo-900 
                   "
                  key={o}
                >
                  {i.word}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
