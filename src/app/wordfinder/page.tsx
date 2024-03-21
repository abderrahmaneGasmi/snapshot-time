"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Svg from "../assets/Svg";
import { chevronBack } from "../helpers/svgs";
import { alphabet, choosedirection, getrandomword } from "../helpers/utilities";

export default function Wordpage() {
  const [letters, Setletters] = useState([] as Array<string>);
  useEffect(() => {
    // fill 144 random letters using alphabet array

    Setletters((old) => {
      const t = [] as string[];
      Array.from({ length: 144 }).map((i, o) =>
        t.push(alphabet[Math.floor(Math.random() * alphabet.length)])
      );

      // make 8 words
      for (let i = 0; i < 8; i++) {
        const randomword = getrandomword().toUpperCase();
        const randomidx = Math.floor(Math.random() * 144);
        const drection = choosedirection(randomidx, randomword.length);

        const word = randomword.split("");
        const wordidx = [] as number[];
        word.map((i, o) => wordidx.push(o));

        console.log(randomidx, drection, wordidx, word);

        wordidx.map((i, o) => {
          if (drection === "up") {
            return (t[randomidx - o * 12] = word[i]);
          }
          if (drection === "down") {
            return (t[randomidx + o * 12] = word[i]);
          }
          if (drection === "left") {
            return (t[randomidx - o] = word[i]);
          }
          if (drection === "right") {
            return (t[randomidx + o] = word[i]);
          }
          if (drection === "upleft") {
            return (t[randomidx - o * 12 - o] = word[i]);
          }
          if (drection === "upright") {
            return (t[randomidx - o * 12 + o] = word[i]);
          }
          if (drection === "downleft") {
            return (t[randomidx + o * 12 - o] = word[i]);
          }
          if (drection === "downright") {
            return (t[randomidx + o * 12 + o] = word[i]);
          }
        });
      }
      return t;
    });
  }, []);

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
        <div className="text-pink-50 text-7xl ">Word finder Game</div>
        <div
          className="grid grid-cols-12 grid-rows-12 gap-2 border-2 rounded-md border-gray-50 p-3
        "
        >
          {letters.map((i, o) => (
            <div
              className="text-3xl text-gray-100 font-bold px-6 py-4 cursor-pointer  rounded-md select-none 
                    "
              style={{
                backgroundColor: "rgba(49, 46, 129, 0.3)",
              }}
              key={o}
            >
              {i}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
