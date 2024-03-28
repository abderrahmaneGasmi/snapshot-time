import Link from "next/link";
import React from "react";
import Svg from "../assets/Svg";
import { chevronBack } from "../helpers/svgs";

export default function Ballspage() {
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
        <div
          className="  justify-center gap-8
        "
        >
          <div className="flex flex-col items-center gap-4 justify-self-end ">
            <div className="text-pink-50 text-7xl "> Ball Simulator</div>
            <div
              className=" border-2 rounded-md border-gray-50 p-3
       "
              style={{
                width: "50rem",
                height: "50rem",
              }}
            ></div>
          </div>
        </div>
      </div>
    </main>
  );
}
