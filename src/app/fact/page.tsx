"use client";
import React, { useEffect, useState } from "react";
import { chevronBack, letters } from "../helpers/svgs";
import Link from "next/link";
import Svg from "../assets/Svg";
import { motion } from "framer-motion";
export default function Factspage() {
  return (
    <main className="h-screen flex flex-col items-center justify-evenly relative select-none">
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
        <div className="text-pink-50 text-7xl ">Fractal Trees</div>
      </div>
    </main>
  );
}
