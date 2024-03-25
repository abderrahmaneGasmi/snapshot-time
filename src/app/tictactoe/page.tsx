"use client";
import React, { useEffect, useState } from "react";
import { chevronBack, o, x } from "../helpers/svgs";
import Link from "next/link";
import Svg from "../assets/Svg";
import ConfettiScreen from "../assets/ConfettiScreen";
import { motion } from "framer-motion";
export default function TicTacpage() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [turn, setTurn] = useState("X");
  const [type, setType] = useState("bot" as "2p" | "bot");
  const [gameended, setGameended] = useState({
    winner: "" as "X" | "O" | "",
    isDraw: false,
    score: {
      X: 0,
      O: 0,
      draw: 0,
    },
  });

  useEffect(() => {
    if (gameended.winner || gameended.isDraw) {
      // setTimeout(() => {
      //     setBoard(["", "", "", "", "", "", "", "", ""]);
      //     setGameended({
      //     ...gameended,
      //     winner: "",
      //     isDraw: false,
      //     });
      // }, 3000);
      return;
    }
    checkWinner();
  }, [board]);

  const mark = (index: number) => {
    if (board[index] === "" && !gameended.winner) {
      const newBoard = [...board];
      newBoard[index] = turn;

      if (type === "bot") {
        const empty = newBoard.reduce((acc, curr, index) => {
          if (curr === "") acc.push(index);
          return acc;
        }, [] as number[]);
        const random = Math.floor(Math.random() * empty.length);
        newBoard[empty[random]] = turn === "X" ? "O" : "X";
      }

      setBoard(newBoard);
      if (type === "2p") setTurn(turn === "X" ? "O" : "X");
    }
  };
  const checkWinner = () => {
    const winningCombination = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winningCombination.length; i++) {
      const [a, b, c] = winningCombination[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setGameended({
          winner: board[a] as "X" | "O",
          isDraw: false,
          score: {
            ...gameended.score,
            [board[a]]: gameended.score[board[a] as "X" | "O"] + 1,
          },
        });
      }
    }
    if (!board.includes("")) {
      setGameended({
        ...gameended,
        isDraw: true,
        score: {
          ...gameended.score,
          draw: gameended.score.draw + 1,
        },
      });
    }
  };
  const reloadgame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setGameended({
      winner: "",
      isDraw: false,
      score: gameended.score,
    });
  };
  const chageType = () => {
    setType(type === "2p" ? "bot" : "2p");
    reloadgame();
  };
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
        <div className="text-pink-50 text-7xl ">Tic Tac Toe Game</div>
        <div
          className="grid grid-cols-3 grid-rows-3 "
          style={{
            width: "30rem",
            height: "30rem",
          }}
        >
          <div
            className="flex items-center justify-center text-gray-50 cursor-pointer"
            onClick={() => mark(0)}
          >
            {board[0] && (
              <Svg
                path={board[0] === "X" ? x.path : o.path}
                view={board[0] === "X" ? x.viewBox : o.viewBox}
                classlist="w-20 h-20  fill-current "
              />
            )}
          </div>
          <div
            className="flex items-center justify-center  border-l-2 border-r-2  border-blue-50 text-gray-50 cursor-pointer"
            onClick={() => mark(1)}
          >
            {board[1] && (
              <Svg
                path={board[1] === "X" ? x.path : o.path}
                view={board[1] === "X" ? x.viewBox : o.viewBox}
                classlist="w-20 h-20  fill-current "
              />
            )}
          </div>
          <div
            className="flex items-center justify-center text-gray-50 cursor-pointer"
            onClick={() => mark(2)}
          >
            {board[2] && (
              <Svg
                path={board[2] === "X" ? x.path : o.path}
                view={board[2] === "X" ? x.viewBox : o.viewBox}
                classlist="w-20 h-20  fill-current "
              />
            )}
          </div>
          <div
            className="flex items-center justify-center  border-t-2 border-b-2 border-blue-50 text-gray-50 cursor-pointer"
            onClick={() => mark(3)}
          >
            {board[3] && (
              <Svg
                path={board[3] === "X" ? x.path : o.path}
                view={board[3] === "X" ? x.viewBox : o.viewBox}
                classlist="w-20 h-20  fill-current "
              />
            )}
          </div>
          <div
            className="flex items-center justify-center  border-2 border-blue-50 text-gray-50 cursor-pointer"
            onClick={() => mark(4)}
          >
            {board[4] && (
              <Svg
                path={board[4] === "X" ? x.path : o.path}
                view={board[4] === "X" ? x.viewBox : o.viewBox}
                classlist="w-20 h-20  fill-current "
              />
            )}
          </div>
          <div
            className="flex items-center justify-center   border-t-2 border-b-2  border-blue-50 text-gray-50 cursor-pointer"
            onClick={() => mark(5)}
          >
            {board[5] && (
              <Svg
                path={board[5] === "X" ? x.path : o.path}
                view={board[5] === "X" ? x.viewBox : o.viewBox}
                classlist="w-20 h-20  fill-current "
              />
            )}
          </div>
          <div
            className="flex items-center justify-center text-gray-50 cursor-pointer"
            onClick={() => mark(6)}
          >
            {board[6] && (
              <Svg
                path={board[6] === "X" ? x.path : o.path}
                view={board[6] === "X" ? x.viewBox : o.viewBox}
                classlist="w-20 h-20  fill-current "
              />
            )}
          </div>
          <div
            className="flex items-center justify-center   border-l-2 border-r-2  border-blue-50 text-gray-50 cursor-pointer"
            onClick={() => mark(7)}
          >
            {board[7] && (
              <Svg
                path={board[7] === "X" ? x.path : o.path}
                view={board[7] === "X" ? x.viewBox : o.viewBox}
                classlist="w-20 h-20  fill-current "
              />
            )}
          </div>
          <div
            className=" flex items-center justify-center text-gray-50 cursor-pointer"
            onClick={() => mark(8)}
          >
            {board[8] && (
              <Svg
                path={board[8] === "X" ? x.path : o.path}
                view={board[8] === "X" ? x.viewBox : o.viewBox}
                classlist="w-20 h-20  fill-current "
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-8 items-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="text-4xl text-pink-50 font-bold">Player X</div>
          <div className="text-3xl text-pink-50 font-bold text-center">
            {gameended.score.X}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="text-4xl text-pink-50 font-bold">Draw</div>
          <div className="text-3xl text-pink-50 font-bold text-center">
            {gameended.score.draw}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="text-4xl text-pink-50 font-bold">Player O</div>
          <div className="text-3xl text-pink-50 font-bold text-center">
            {gameended.score.O}
          </div>
        </div>
      </div>
      {gameended.winner && (
        <>
          <ConfettiScreen type="empty" />
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
              {gameended.winner} Won the game
            </div>
            <div
              className="bg-pink-50 text-white px-4 py-2 rounded-md mt-4 cursor-pointer text-5xl font-bold bg-yellow-500"
              onClick={() => {
                reloadgame();
              }}
            >
              Play Again
            </div>
          </motion.div>
        </>
      )}
      {gameended.isDraw && (
        <>
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
              Its a Draw
            </div>
            <div
              className="bg-pink-50 text-white px-4 py-2 rounded-md mt-4 cursor-pointer text-5xl font-bold bg-yellow-500"
              onClick={() => {
                reloadgame();
              }}
            >
              Play Again
            </div>
          </motion.div>
        </>
      )}
    </main>
  );
}
