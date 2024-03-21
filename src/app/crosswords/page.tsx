import Link from "next/link";
import React from "react";
import Svg from "../assets/Svg";
import { chevronBack } from "../helpers/svgs";
import { alphabet } from "../helpers/utilities";

export default function page() {
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
        <div className="text-pink-50 text-7xl ">Cross words Game</div>
        <div
          className="grid grid-cols-12 grid-rows-12 gap-2 border-2 rounded-md border-gray-50 p-3
        "
        >
          {Array.from({ length: 144 }).map((i, o) => (
            <div
              className="text-3xl text-gray-100 font-bold px-6 py-4 cursor-pointer  rounded-md select-none 
                    "
              style={{
                backgroundColor: "rgba(49, 46, 129, 0.3)",
              }}
              key={o}
            >
              {alphabet[Math.floor(Math.random() * alphabet.length)]}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
