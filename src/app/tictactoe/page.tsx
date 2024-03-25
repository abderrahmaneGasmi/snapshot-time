"use client";
import React, { useEffect, useState } from "react";
import { chevronBack, o, x } from "../helpers/svgs";
import Link from "next/link";
import Svg from "../assets/Svg";

export default function TicTacpage() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [turn, setTurn] = useState("X");
  const [gameended, setGameended] = useState({
    winner: "" as "X" | "O" | "",
    isDraw: false,
    score: {
      X: 0,
      O: 0,
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
      setBoard(newBoard);
      setTurn(turn === "X" ? "O" : "X");
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
      });
    }
  };
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
        <div className="grid grid-cols-3 grid-rows-3 w-96 h-96">
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
    </main>
  );
}
