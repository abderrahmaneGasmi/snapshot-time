"use client";
import React, { useEffect, useState } from "react";
import {
  chevronBack,
  chevrondown,
  chevronup,
  flag,
  timer,
} from "../helpers/svgs";
import Link from "next/link";
import Svg from "../assets/Svg";
import ConfettiScreen from "../assets/ConfettiScreen";
import { motion } from "framer-motion";

interface box {
  value: number | string;
  isBomb: boolean;
  isFlag: "flag" | "question" | "none";
  isOpen: boolean;
}

export default function MinesWeeperpage() {
  const [showdropdown, setShowdropdown] = useState(false);
  const [time, setTimer] = useState({
    minutes: 0,
    seconds: 0,
  });
  const [gamevals, setGamevals] = useState({
    difficulty: "easy",
    bombs: 10,
    rows: 8,
    columns: 8,
    ended: false,
    gamewon: false,
    redsquare: 0,
    curenttime: 0,
    besttime: 0,
  });
  const [flags, setFlags] = useState(gamevals.bombs);
  const [boxes, setBoxes] = useState<box[]>([]);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimer((prev) => {
        if (prev.seconds === 59) {
          return {
            minutes: prev.minutes + 1,
            seconds: 0,
          };
        }
        return {
          minutes: prev.minutes,
          seconds: prev.seconds + 1,
        };
      });
    }, 1000);

    if (gamevals.ended) {
      clearInterval(timer);
      return;
    }
    let tempboxes: box[] = [];
    for (let i = 0; i < gamevals.rows * gamevals.columns; i++) {
      tempboxes.push({
        value: 0,
        isBomb: false,
        isFlag: "none",
        isOpen: false,
      });
    }
    let bombsPlaced = 0;
    while (bombsPlaced < gamevals.bombs) {
      const randomIndex = Math.floor(
        Math.random() * gamevals.rows * gamevals.columns
      );
      if (!tempboxes[randomIndex].isBomb) {
        tempboxes[randomIndex].isBomb = true;
        bombsPlaced++;
      }
    }

    for (let i = 0; i < gamevals.rows * gamevals.columns; i++) {
      if (tempboxes[i].isBomb) {
        if (i % gamevals.columns !== 0) {
          if (typeof tempboxes[i - 1].value === "number")
            tempboxes[i - 1].value = +tempboxes[i - 1].value + 1;
        }
        if (i % gamevals.columns !== gamevals.columns - 1) {
          if (typeof tempboxes[i + 1].value === "number")
            tempboxes[i + 1].value = +tempboxes[i + 1].value + 1;
        }
        if (i > gamevals.columns - 1) {
          if (typeof tempboxes[i - gamevals.columns].value === "number")
            tempboxes[i - gamevals.columns].value =
              +tempboxes[i - gamevals.columns].value + 1;
        }
        if (i < gamevals.columns * (gamevals.rows - 1)) {
          if (typeof tempboxes[i + gamevals.columns].value === "number")
            tempboxes[i + gamevals.columns].value =
              +tempboxes[i + gamevals.columns].value + 1;
        }
        if (i % gamevals.columns !== 0 && i > gamevals.columns - 1) {
          if (typeof tempboxes[i - (gamevals.columns + 1)].value === "number")
            tempboxes[i - (gamevals.columns + 1)].value =
              +tempboxes[i - (gamevals.columns + 1)].value + 1;
        }
        if (
          i % gamevals.columns !== gamevals.columns - 1 &&
          i > gamevals.columns - 1
        ) {
          if (typeof tempboxes[i - (gamevals.columns - 1)].value === "number")
            tempboxes[i - (gamevals.columns - 1)].value =
              +tempboxes[i - (gamevals.columns - 1)].value + 1;
        }
        if (
          i % gamevals.columns !== 0 &&
          i < gamevals.columns * (gamevals.rows - 1)
        ) {
          if (typeof tempboxes[i + (gamevals.columns - 1)].value === "number")
            tempboxes[i + (gamevals.columns - 1)].value =
              +tempboxes[i + (gamevals.columns - 1)].value + 1;
        }
        if (
          i % gamevals.columns !== gamevals.columns - 1 &&
          i < gamevals.columns * (gamevals.rows - 1)
        ) {
          if (typeof tempboxes[i + (gamevals.columns + 1)].value === "number")
            tempboxes[i + (gamevals.columns + 1)].value =
              +tempboxes[i + (gamevals.columns + 1)].value + 1;
        }
      }
    }

    setBoxes(tempboxes);
    document
      .getElementById("box" + gamevals.redsquare)
      ?.classList.remove("bg-red-500");
    return () => {
      clearInterval(timer);
    };
  }, [gamevals]);
  function handleRightClick(
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) {
    event.preventDefault();
    if (gamevals.ended) return;
    if (flags === 0 && boxes[index].isFlag === "none") return;

    let tempboxes = [...boxes];
    if (tempboxes[index].isOpen) return;
    if (tempboxes[index].isFlag === "flag") {
      tempboxes[index].isFlag = "question";
    } else if (tempboxes[index].isFlag === "question") {
      setFlags((prev) => prev + 1);
      tempboxes[index].isFlag = "none";
    } else {
      setFlags((prev) => prev - 1);
      tempboxes[index].isFlag = "flag";
    }
    setBoxes(tempboxes);
  }
  useEffect(() => {
    if (boxes.length === 0) return;
    checkgamewon();
  }, [boxes]);
  const clickbox = (index: number) => {
    if (gamevals.ended) return;
    if (boxes[index].isOpen || boxes[index].isFlag !== "none") return;

    let tempboxes = [...boxes];
    tempboxes[index].isOpen = true;
    if (boxes[index].isBomb) {
      tempboxes = openbombs(tempboxes);
      setBoxes(tempboxes);
      setGamevals((prev) => ({
        ...prev,
        ended: true,
        redsquare: index,
        gamewon: false,
      }));
      document.getElementById("box" + index)?.classList.add("bg-red-500");

      return;
    } else {
    }
    if (boxes[index].value === 0 && !boxes[index].isBomb) {
      tempboxes = openAdjacentBoxes(tempboxes, index);
      setFlags(getflagnumber());
    }

    setBoxes((prev) => {
      const temp = [...prev];
      temp[index].isOpen = true;
      return temp;
    });
  };
  const openAdjacentBoxes = (tempboxes: box[], index: number) => {
    if (index % gamevals.columns !== 0) {
      if (
        !tempboxes[index - 1].isOpen &&
        tempboxes[index - 1].isBomb === false
      ) {
        tempboxes[index - 1].isOpen = true;
        tempboxes[index - 1].isFlag = "none";

        if (tempboxes[index - 1].value === 0) {
          tempboxes = openAdjacentBoxes(tempboxes, index - 1);
        }
      }
    }
    if (index % gamevals.columns !== gamevals.columns - 1) {
      if (
        !tempboxes[index + 1].isOpen &&
        tempboxes[index + 1].isBomb === false
      ) {
        tempboxes[index + 1].isOpen = true;
        tempboxes[index + 1].isFlag = "none";
        if (tempboxes[index + 1].value === 0) {
          tempboxes = openAdjacentBoxes(tempboxes, index + 1);
        }
      }
    }
    if (index > gamevals.columns - 1) {
      if (
        !tempboxes[index - gamevals.columns].isOpen &&
        tempboxes[index - gamevals.columns].isBomb === false
      ) {
        tempboxes[index - gamevals.columns].isOpen = true;
        tempboxes[index - gamevals.columns].isFlag = "none";
        if (tempboxes[index - gamevals.columns].value === 0) {
          tempboxes = openAdjacentBoxes(tempboxes, index - gamevals.columns);
        }
      }
    }
    if (index < gamevals.columns * (gamevals.rows - 1)) {
      if (
        !tempboxes[index + gamevals.columns].isOpen &&
        tempboxes[index + gamevals.columns].isBomb === false
      ) {
        tempboxes[index + gamevals.columns].isOpen = true;
        tempboxes[index + gamevals.columns].isFlag = "none";
        if (tempboxes[index + gamevals.columns].value === 0) {
          tempboxes = openAdjacentBoxes(tempboxes, index + gamevals.columns);
        }
      }
    }
    if (index % gamevals.columns !== 0 && index > gamevals.columns - 1) {
      if (
        !tempboxes[index - (gamevals.columns + 1)].isOpen &&
        tempboxes[index - (gamevals.columns + 1)].isBomb === false
      ) {
        tempboxes[index - (gamevals.columns + 1)].isOpen = true;
        tempboxes[index - (gamevals.columns + 1)].isFlag = "none";
        if (tempboxes[index - (gamevals.columns + 1)].value === 0) {
          tempboxes = openAdjacentBoxes(
            tempboxes,
            index - (gamevals.columns + 1)
          );
        }
      }
    }
    if (
      index % gamevals.columns !== gamevals.columns - 1 &&
      index > gamevals.columns - 1
    ) {
      if (
        !tempboxes[index - (gamevals.columns - 1)].isOpen &&
        tempboxes[index - (gamevals.columns - 1)].isBomb === false
      ) {
        tempboxes[index - (gamevals.columns - 1)].isOpen = true;
        tempboxes[index - (gamevals.columns - 1)].isFlag = "none";
        if (tempboxes[index - (gamevals.columns - 1)].value === 0) {
          tempboxes = openAdjacentBoxes(
            tempboxes,
            index - (gamevals.columns - 1)
          );
        }
      }
    }
    if (
      index % gamevals.columns !== 0 &&
      index < gamevals.columns * (gamevals.rows - 1)
    ) {
      if (
        !tempboxes[index + (gamevals.columns - 1)].isOpen &&
        tempboxes[index + (gamevals.columns - 1)].isBomb === false
      ) {
        tempboxes[index + (gamevals.columns - 1)].isOpen = true;
        tempboxes[index + (gamevals.columns - 1)].isFlag = "none";
        if (tempboxes[index + (gamevals.columns - 1)].value === 0) {
          tempboxes = openAdjacentBoxes(
            tempboxes,
            index + (gamevals.columns - 1)
          );
        }
      }
    }
    if (
      index % gamevals.columns !== gamevals.columns - 1 &&
      index < gamevals.columns * (gamevals.rows - 1)
    ) {
      if (
        !tempboxes[index + (gamevals.columns + 1)].isOpen &&
        tempboxes[index + (gamevals.columns + 1)].isBomb === false
      ) {
        tempboxes[index + (gamevals.columns + 1)].isOpen = true;
        tempboxes[index + (gamevals.columns + 1)].isFlag = "none";
        if (tempboxes[index + (gamevals.columns + 1)].value === 0) {
          tempboxes = openAdjacentBoxes(
            tempboxes,
            index + (gamevals.columns + 1)
          );
        }
      }
    }
    return tempboxes;
  };
  const getflagnumber = () => {
    let count = gamevals.bombs;
    for (let i = 0; i < gamevals.rows * gamevals.columns; i++) {
      if (boxes[i].isFlag === "flag" || boxes[i].isFlag === "question") count--;
    }
    return count;
  };
  const openbombs = (tempboxes: box[]) => {
    for (let i = 0; i < gamevals.rows * gamevals.columns; i++) {
      if (tempboxes[i].isBomb) {
        tempboxes[i].isOpen = true;
        tempboxes[i].isFlag = "none";
      }
    }
    return tempboxes;
  };
  const changeDifficulty = (difficulty: string) => {
    let bombs = 0;
    let rows = 0;
    let columns = 0;
    switch (difficulty) {
      case "easy":
        columns = 7;
        rows = 7;
        bombs = 18;
        break;
      case "medium":
        columns = 14;
        rows = 10;
        bombs = 35;
        break;
      case "hard":
        columns = 18;
        rows = 13;
        bombs = 60;
        break;
    }
    setGamevals((prev) => ({
      ...prev,
      difficulty: difficulty,
      bombs: bombs,
      rows: rows,
      columns: columns,
      ended: false,
    }));
    setTimer({ minutes: 0, seconds: 0 });
    setFlags(bombs);
  };
  const reloadgame = () => {
    setGamevals((prev) => ({
      ...prev,
      ended: false,
      gamewon: false,
      curenttime: 0,
    }));
    setTimer({ minutes: 0, seconds: 0 });
  };
  const checkgamewon = () => {
    if (gamevals.ended || gamevals.gamewon) return;
    let count = 0;
    for (let i = 0; i < gamevals.rows * gamevals.columns; i++) {
      if (boxes[i].isBomb && boxes[i].isFlag === "flag") count++;
      else if (!boxes[i].isBomb && !boxes[i].isOpen) return;
    }
    if (count === gamevals.bombs) {
      setGamevals((prev) => ({
        ...prev,
        ended: true,
        gamewon: true,
        curenttime: time.minutes * 60 + time.seconds,
        besttime:
          prev.besttime < time.minutes * 60 + time.seconds
            ? prev.besttime
            : time.minutes * 60 + time.seconds,
      }));
    }
  };
  const gettime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return `${minutes < 10 ? "0" + minutes : minutes}  :  ${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };
  const getremianingtime = () => {
    const diffrence = gamevals.besttime - (time.minutes * 60 + time.seconds);
    const difftime = {
      minutes: Math.abs(Math.floor(Math.abs(diffrence / 60))),
      seconds: Math.abs(diffrence % 60),
    };

    return {
      time: `${
        difftime.minutes < 10 ? "0" + difftime.minutes : difftime.minutes
      }:${difftime.seconds < 10 ? "0" + difftime.seconds : difftime.seconds}`,
      diffrent: diffrence < 0 ? "below" : diffrence > 0 ? "above" : "equal",
    };
  };
  return (
    <main
      className="h-screen flex flex-col items-center justify-evenly relative"
      onContextMenu={(e) => e.preventDefault()}
    >
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
            {gamevals.difficulty.toUpperCase()}
            <Svg
              path={showdropdown ? chevronup.path : chevrondown.path}
              view={chevronup.viewBox}
              classlist="w-6 h-6 fill-current text-pink-50"
            />
            {showdropdown && (
              <div className="absolute top-full left-0 w-48 bg-indigo-600 rounded flex flex-col ">
                <div
                  className="text-pink-50 text-3xl p-2 hover:bg-indigo-700"
                  onClick={() => changeDifficulty("easy")}
                >
                  Easy
                </div>
                <div
                  className="text-pink-50 text-3xl p-2 hover:bg-indigo-700"
                  onClick={() => changeDifficulty("medium")}
                >
                  Medium
                </div>
                <div
                  className="text-pink-50 text-3xl p-2 hover:bg-indigo-700"
                  onClick={() => changeDifficulty("hard")}
                >
                  Hard
                </div>
              </div>
            )}
          </div>
          <div className="flex  gap-4 items-center">
            <Svg
              path={timer.path}
              view={timer.viewBox}
              classlist="w-8 h-8 fill-current text-pink-50"
            />{" "}
            <div className="text-pink-50 text-3xl">
              {time.minutes < 10 ? "0" + time.minutes : time.minutes}:
              {time.seconds < 10 ? "0" + time.seconds : time.seconds}
            </div>
            <span
              className={`text-pink-50 text-3xl ${
                getremianingtime().diffrent === "below"
                  ? "text-red-500"
                  : getremianingtime().diffrent === "above"
                  ? "text-green-500"
                  : "text-yellow-500"
              }`}
            >
              {getremianingtime().diffrent === "below"
                ? "-"
                : getremianingtime().diffrent === "above"
                ? "+"
                : ""}{" "}
              {getremianingtime().time}{" "}
            </span>
          </div>
          <div className="flex  gap-4 items-center">
            <Svg
              path={flag.path}
              view={flag.viewBox}
              classlist="w-8 h-8 fill-current text-pink-50"
            />{" "}
            <div className="text-pink-50 text-3xl">
              {flags < 10 ? "0" + flags : flags}
            </div>
          </div>
        </div>
        <div
          className="grid  gap-2"
          style={{
            gridTemplateColumns: `repeat(${gamevals.columns},minmax(0,1fr))`,
            gridTemplateRows: `repeat(${gamevals.rows},minmax(0,1fr)`,
          }}
        >
          {boxes.map((v, i) => (
            <div
              key={i}
              id={"box" + i}
              className="p-2 bg-indigo-900 rounded flex items-center justify-center cursor-pointer"
              onClick={() => clickbox(i)}
              onContextMenu={(e) => handleRightClick(e, i)}
            >
              <div
                className={`w-12 h-12 ${
                  v.isOpen ? "" : "bg-indigo-800 "
                }rounded ${
                  v.value === 1
                    ? "text-blue-500"
                    : v.value === 2
                    ? "text-green-500"
                    : v.value === 3
                    ? "text-red-500"
                    : v.value === 4
                    ? "text-purple-500"
                    : v.value === 5
                    ? "text-yellow-500"
                    : v.value === 6
                    ? "text-pink-500"
                    : v.value === 7
                    ? "text-blue-500"
                    : v.value === 8
                    ? "text-green-500"
                    : ""
                } text-4xl flex justify-center items-center font-bold`}
              >
                {v.isOpen ? (v.isBomb ? "💣" : v.value ? v.value : "") : ""}
                {v.isFlag === "flag"
                  ? "🚩"
                  : v.isFlag === "question"
                  ? "❓"
                  : ""}
              </div>
            </div>
          ))}
        </div>
      </div>
      {gamevals.ended && !gamevals.gamewon && (
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
            You Lost the game
          </div>
          <span className="text-4xl text-pink-50 ">You clicked on a bomb</span>
          <div
            className="bg-pink-50 text-white px-4 py-2 rounded-md mt-4 cursor-pointer text-5xl font-bold bg-yellow-500"
            onClick={() => {
              reloadgame();
            }}
          >
            Play Again
          </div>
        </motion.div>
      )}
      {gamevals.gamewon && (
        <>
          {" "}
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
              YOU found all bombs 🎉
            </div>
            <div className="flex flex-col gap-4 items-center">
              <div className="flex gap-4 items-center">
                <Svg
                  path={timer.path}
                  view={timer.viewBox}
                  classlist="w-8 h-8 fill-current text-pink-50"
                />{" "}
                <span className="text-4xl text-pink-50 ">
                  time was{" "}
                  <span className="text-yellow-500">
                    {gettime(gamevals.curenttime)}
                  </span>
                </span>
              </div>
              <div className="flex gap-4 items-center py-3">
                <Svg
                  path={timer.path}
                  view={timer.viewBox}
                  classlist="w-8 h-8 fill-current text-pink-50"
                />{" "}
                <span className="text-4xl text-pink-50 py-3">
                  best time{" "}
                  <span className="text-yellow-500">
                    {gettime(gamevals.besttime)}
                  </span>
                </span>
              </div>
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
