"use client";
import React, { useEffect, useState } from "react";
import {
  chevronBack,
  chevrondown,
  chevronup,
  flag,
  o,
  player1,
  player2,
  timer,
  x,
} from "../helpers/svgs";
import Link from "next/link";
import Svg from "../assets/Svg";
import ConfettiScreen from "../assets/ConfettiScreen";
import { motion } from "framer-motion";
export default function MinesWeeperpage() {
  const [showdropdown, setShowdropdown] = useState(false);
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
        <div className="text-pink-50 text-7xl ">Minesweeper Game</div>
        <div className="flex gap-4 justify-between w-full items-center">
          <div
            className="relative text-pink-50 text-3xl cursor-pointer bg-indigo-900 p-2 rounded flex items-center gap-2"
            onClick={() => setShowdropdown(!showdropdown)}
          >
            Easy
            <Svg
              path={showdropdown ? chevronup.path : chevrondown.path}
              view={chevronup.viewBox}
              classlist="w-6 h-6 fill-current text-pink-50"
            />
            {showdropdown && (
              <div className="absolute top-full left-0 w-48 bg-indigo-600 p-2 gap-2 rounded flex flex-col ">
                <div className="text-pink-50 text-3xl">Easy</div>
                <div className="text-pink-50 text-3xl">Medium</div>
                <div className="text-pink-50 text-3xl">Hard</div>
              </div>
            )}
          </div>
          <div className="flex  gap-4 items-center">
            <Svg
              path={timer.path}
              view={timer.viewBox}
              classlist="w-8 h-8 fill-current text-pink-50"
            />{" "}
            <div className="text-pink-50 text-3xl">00:00</div>
          </div>
          <div className="flex  gap-4 items-center">
            <Svg
              path={flag.path}
              view={flag.viewBox}
              classlist="w-8 h-8 fill-current text-pink-50"
            />{" "}
            <div className="text-pink-50 text-3xl">50</div>
          </div>
        </div>
      </div>
    </main>
  );
}
