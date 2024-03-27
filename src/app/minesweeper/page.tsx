"use client";
import React, { useEffect, useState } from "react";
import { chevronBack, flag, o, player1, player2, x } from "../helpers/svgs";
import Link from "next/link";
import Svg from "../assets/Svg";
import ConfettiScreen from "../assets/ConfettiScreen";
import { motion } from "framer-motion";
export default function MinesWeeperpage() {
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
        <div className="flex gap-4">
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
