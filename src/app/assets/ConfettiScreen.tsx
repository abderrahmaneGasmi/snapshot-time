import React from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
export default function ConfettiScreen({
  type = "cards",
}: {
  type?: "wordfinder" | "cards";
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {type === "cards" ? (
        <motion.div
          className="
        absolute z-50  backdrop-filter backdrop-blur-xl glowstar pd-8 rounded-xl min-w-80 flex flex-col items-center justify-center 
        "
          initial={{
            opacity: 0,
            scale: 0,
            x: "0%",
            y: "0%",
            //   transformOrigin: "20% 20%",
          }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{
            minHeight: "40rem",
            padding: "0 2rem",
          }}
        >
          <div className="text-9xl text-pink-50 font-bold mx-auto text-center mb-4">
            YOU WON 🎉
          </div>
          <span className="text-4xl text-pink-50 ">
            Congratulations you have won the game , you missed a 5 tries to win
            with perfect score
          </span>
          <div
            className="bg-pink-50 text-white px-4 py-2 rounded-md mt-4 cursor-pointer text-5xl font-bold bg-yellow-500"
            onClick={() => {
              window.location.reload();
            }}
          >
            Play Again
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="
        absolute z-50  backdrop-filter backdrop-blur-xl glowstar pd-8 rounded-xl min-w-80 flex flex-col items-center justify-center 
        "
          initial={{
            opacity: 0,
            scale: 0,
            x: "0%",
            y: "0%",
            //   transformOrigin: "20% 20%",
          }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{
            minHeight: "40rem",
            padding: "0 2rem",
          }}
        >
          <div className="text-9xl text-pink-50 font-bold mx-auto text-center mb-4">
            YOU Completed All the words 🎉
          </div>
          <span className="text-4xl text-pink-50 ">
            Congratulations you have won the game
          </span>
          <div
            className="bg-pink-50 text-white px-4 py-2 rounded-md mt-4 cursor-pointer text-5xl font-bold bg-yellow-500"
            onClick={() => {
              window.location.reload();
            }}
          >
            Play Again
          </div>
        </motion.div>
      )}
      <Confetti
        width={document.body.clientWidth}
        height={document.body.clientHeight}
      />
      ;
    </div>
  );
}
