"use client";
import React from "react";
import { chevronBack } from "../helpers/svgs";
import Link from "next/link";
import Svg from "../assets/Svg";
import { motion } from "framer-motion";
export default function Letterspage() {
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
        <div className="text-pink-50 text-7xl ">Letters carousel</div>
      </div>
      <div className="flex items-center border-2 border-pink-50  p-2">
        <div
          className="text-pink-50 mx-auto "
          style={{ fontSize: "20rem", lineHeight: "16rem" }}
        >
          A
        </div>
      </div>
      <motion.div className="flex gap-12">
        <motion.div
          className="text-gray-800 text-7xl p-8 bg-gray-500 rounded"
          initial={{
            y: 10,
          }}
        >
          Q
        </motion.div>
        <motion.div
          className="text-gray-700 text-7xl p-8 bg-gray-400 rounded"
          initial={{
            y: -10,
          }}
        >
          C
        </motion.div>
        <motion.div
          className="text-gray-600 text-7xl p-8 bg-white rounded"
          initial={{
            y: -50,
          }}
        >
          A
        </motion.div>
        <motion.div
          className="text-gray-700 text-7xl p-8 bg-gray-400 rounded"
          initial={{
            y: -10,
          }}
        >
          B
        </motion.div>
        <motion.div
          className="text-gray-800 text-7xl p-8 bg-gray-500 rounded"
          initial={{
            y: 10,
          }}
        >
          D
        </motion.div>
      </motion.div>
    </main>
  );
}
