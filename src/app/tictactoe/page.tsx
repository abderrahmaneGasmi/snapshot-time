import React from "react";
import { chevronBack } from "../helpers/svgs";
import Link from "next/link";
import Svg from "../assets/Svg";

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
        <div className="text-pink-50 text-7xl ">Tic Tac Toe Game</div>
        <div className="grid grid-cols-3 grid-rows-3">
          <div className="flex items-center justify-center text-4xl font-bold w-48 h-48">
            1
          </div>
          <div className="flex items-center justify-center text-4xl font-bold border-l-2 border-r-2  border-blue-50">
            2
          </div>
          <div className="flex items-center justify-center text-4xl font-bold">
            3
          </div>
          <div className="flex items-center justify-center text-4xl font-bold border-t-2 border-b-2 border-blue-50">
            4
          </div>
          <div className="flex items-center justify-center text-4xl font-bold border-2 border-blue-50">
            5
          </div>
          <div className="flex items-center justify-center text-4xl font-bold  border-t-2 border-b-2  border-blue-50">
            6
          </div>
          <div className="flex items-center justify-center text-4xl font-bold">
            7
          </div>
          <div className="flex items-center justify-center text-4xl font-bold  border-l-2 border-r-2  border-blue-50">
            8
          </div>
          <div className=" flex items-center justify-center text-4xl font-bold">
            9
          </div>
        </div>
      </div>
    </main>
  );
}
