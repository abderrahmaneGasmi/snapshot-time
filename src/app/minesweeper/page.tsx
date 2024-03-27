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
  isFlag: boolean;
  isOpen: boolean;
}

export default function MinesWeeperpage() {
  const [showdropdown, setShowdropdown] = useState(false);
  const [time, setTimer] = useState({
    minutes: 0,
    seconds: 0,
  });
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

    let tempboxes: box[] = [];
    for (let i = 0; i < 80; i++) {
      tempboxes.push({
        value: 0,
        isBomb: false,
        isFlag: false,
        isOpen: false,
      });
    }
    const bombs = 10;
    let bombsPlaced = 0;
    while (bombsPlaced < bombs) {
      const randomIndex = Math.floor(Math.random() * 80);
      if (!tempboxes[randomIndex].isBomb) {
        tempboxes[randomIndex].isBomb = true;
        bombsPlaced++;
      }
    }

    for (let i = 0; i < 80; i++) {
      if (tempboxes[i].isBomb) {
        if (i % 10 !== 0) {
          if (typeof tempboxes[i - 1].value === "number")
            tempboxes[i - 1].value = +tempboxes[i - 1].value + 1;
        }
        if (i % 10 !== 9) {
          if (typeof tempboxes[i + 1].value === "number")
            tempboxes[i + 1].value = +tempboxes[i + 1].value + 1;
        }
        if (i > 9) {
          if (typeof tempboxes[i - 10].value === "number")
            tempboxes[i - 10].value = +tempboxes[i - 10].value + 1;
        }
        if (i < 70) {
          if (typeof tempboxes[i + 10].value === "number")
            tempboxes[i + 10].value = +tempboxes[i + 10].value + 1;
        }
        if (i % 10 !== 0 && i > 9) {
          if (typeof tempboxes[i - 11].value === "number")
            tempboxes[i - 11].value = +tempboxes[i - 11].value + 1;
        }
        if (i % 10 !== 9 && i > 9) {
          if (typeof tempboxes[i - 9].value === "number")
            tempboxes[i - 9].value = +tempboxes[i - 9].value + 1;
        }
        if (i % 10 !== 0 && i < 70) {
          if (typeof tempboxes[i + 9].value === "number")
            tempboxes[i + 9].value = +tempboxes[i + 9].value + 1;
        }
        if (i % 10 !== 9 && i < 70) {
          if (typeof tempboxes[i + 11].value === "number")
            tempboxes[i + 11].value = +tempboxes[i + 11].value + 1;
        }
      }
    }

    setBoxes(tempboxes);

    return () => {
      clearInterval(timer);
    };
  }, []);
  function handleRightClick(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    // Your code here
  }

  const clickbox = (index: number) => {
    if (boxes[index].isOpen) return;

    let tempboxes = [...boxes];
    tempboxes[index].isOpen = true;
    if (boxes[index].value === 0) {
      tempboxes = openAdjacentBoxes(tempboxes, index);
    }

    setBoxes((prev) => {
      const temp = [...prev];
      temp[index].isOpen = true;
      return temp;
    });
    if (boxes[index].isBomb) {
      console.log("game over");
    } else {
      console.log("safe");
    }
  };
  const openAdjacentBoxes = (tempboxes: box[], index: number) => {
    if (index % 10 !== 0) {
      if (!tempboxes[index - 1].isOpen) {
        tempboxes[index - 1].isOpen = true;
        if (tempboxes[index - 1].value === 0) {
          tempboxes = openAdjacentBoxes(tempboxes, index - 1);
        }
      }
    }
    if (index % 10 !== 9) {
      if (!tempboxes[index + 1].isOpen) {
        tempboxes[index + 1].isOpen = true;
        if (tempboxes[index + 1].value === 0) {
          tempboxes = openAdjacentBoxes(tempboxes, index + 1);
        }
      }
    }
    if (index > 9) {
      if (!tempboxes[index - 10].isOpen) {
        tempboxes[index - 10].isOpen = true;
        if (tempboxes[index - 10].value === 0) {
          tempboxes = openAdjacentBoxes(tempboxes, index - 10);
        }
      }
    }
    if (index < 70) {
      if (!tempboxes[index + 10].isOpen) {
        tempboxes[index + 10].isOpen = true;
        if (tempboxes[index + 10].value === 0) {
          tempboxes = openAdjacentBoxes(tempboxes, index + 10);
        }
      }
    }
    if (index % 10 !== 0 && index > 9) {
      if (!tempboxes[index - 11].isOpen) {
        tempboxes[index - 11].isOpen = true;
        if (tempboxes[index - 11].value === 0) {
          tempboxes = openAdjacentBoxes(tempboxes, index - 11);
        }
      }
    }
    if (index % 10 !== 9 && index > 9) {
      if (!tempboxes[index - 9].isOpen) {
        tempboxes[index - 9].isOpen = true;
        if (tempboxes[index - 9].value === 0) {
          tempboxes = openAdjacentBoxes(tempboxes, index - 9);
        }
      }
    }
    if (index % 10 !== 0 && index < 70) {
      if (!tempboxes[index + 9].isOpen) {
        tempboxes[index + 9].isOpen = true;
        if (tempboxes[index + 9].value === 0) {
          tempboxes = openAdjacentBoxes(tempboxes, index + 9);
        }
      }
    }
    if (index % 10 !== 9 && index < 70) {
      if (!tempboxes[index + 11].isOpen) {
        tempboxes[index + 11].isOpen = true;
        if (tempboxes[index + 11].value === 0) {
          tempboxes = openAdjacentBoxes(tempboxes, index + 11);
        }
      }
    }
    return tempboxes;
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
            <div className="text-pink-50 text-3xl">
              {time.minutes < 10 ? "0" + time.minutes : time.minutes}:
              {time.seconds < 10 ? "0" + time.seconds : time.seconds}
            </div>
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
        <div className="grid grid-cols-10 gap-2">
          {boxes.map((v, i) => (
            <div
              key={i}
              className="p-2 bg-indigo-900 rounded flex items-center justify-center cursor-pointer"
              onClick={() => clickbox(i)}
              onContextMenu={handleRightClick}
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
