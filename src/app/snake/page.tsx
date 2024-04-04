"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Svg from "../assets/Svg";
import { chevronBack } from "../helpers/svgs";
import { getrandomsnakefood } from "../helpers/functions";
interface SnakePart {
  x: number;
  y: number;
  nextdir: "up" | "down" | "left" | "right";
  color: string;
}
export default function Snakepage() {
  const [canva, setcanva] = useState<HTMLCanvasElement | null>(null);
  const [ctx, setctx] = useState<CanvasRenderingContext2D | null>(null);
  const box = React.useRef<HTMLDivElement>(null);
  const playinterval = React.useRef<NodeJS.Timeout | null>(null);
  const [vars, setVars] = useState({
    speed: 100,
    wormsize: 20,
    canvaswidth: 500,
    canvasheight: 500,
    gamestatus: "playing" as "playing" | "gameover",
  });

  const snake = React.useRef<SnakePart[]>([
    {
      x: 0,
      y: 0,
      nextdir: "right",
      color: `rgb(${Math.random() * 255},${Math.random() * 255},${
        Math.random() * 255
      })`,
    },
    {
      x: vars.wormsize,
      y: 0,
      nextdir: "right",
      color: `rgb(${Math.random() * 255},${Math.random() * 255},${
        Math.random() * 255
      })`,
    },
    {
      x: vars.wormsize * 2,
      y: 0,
      nextdir: "right",
      color: `rgb(${Math.random() * 255},${Math.random() * 255},${
        Math.random() * 255
      })`,
    },
    {
      x: vars.wormsize * 3,
      y: 0,
      nextdir: "right",
      color: `rgb(${Math.random() * 255},${Math.random() * 255},${
        Math.random() * 255
      })`,
    },
  ]);
  const foodlocation = React.useRef<{ x: number; y: number }>(
    getrandomsnakefood(
      snake.current.map((part) => ({ x: part.x, y: part.y })),
      vars
    )
  );
  useEffect(() => {
    if (vars.gamestatus == "gameover") {
      clearInterval(playinterval.current!);
      return;
    }
    if (box.current) {
      // check if the box is already has a canvas

      if (box.current.querySelector("canvas")) {
        box.current.removeChild(box.current.querySelector("canvas")!);
      }
      if (!canva) {
        const canvas = document.createElement("canvas");
        canvas.width = vars.canvaswidth;
        canvas.height = vars.canvasheight;
        setcanva(canvas);
      } else {
        box.current.appendChild(canva);
        if (!ctx) {
          const ctxv = canva.getContext("2d");
          if (ctxv) {
            setctx(ctxv);
          }
        } else {
          ctx.fillStyle = "black";
          ctx.fillRect(0, 0, canva.width, canva.height);

          snake.current.forEach((part) => {
            ctx.fillStyle = part.color;
            ctx.fillRect(part.x, part.y, vars.wormsize, vars.wormsize);
          });
          ctx.fillStyle = "red";
          ctx.fillRect(
            foodlocation.current.x,
            foodlocation.current.y,
            vars.wormsize,
            vars.wormsize
          );
          ctx.strokeStyle = "rgba(0, 0, 0, 0.5)"; // Adjust the color and opacity as needed

          // Draw vertical grid lines
          for (let x = 0; x <= canva.width; x += vars.wormsize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canva.height);
            ctx.stroke();
          }

          // Draw horizontal grid lines
          for (let y = 0; y <= canva.height; y += vars.wormsize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canva.width, y);
            ctx.stroke();
          }
          // setctx(ctx);
          // animate(ctx, canvas, snake);
        }
      }
    }

    function animate(ctx: CanvasRenderingContext2D, canva: HTMLCanvasElement) {
      if (vars.gamestatus == "gameover") return;
      ctx.clearRect(0, 0, canva.width, canva.height);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canva.width, canva.height);

      ctx.strokeStyle = "rgba(20, 150, 15, 1)"; // Adjust the color and opacity as needed

      // Draw vertical grid lines
      for (let x = 0; x <= canva.width; x += vars.wormsize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canva.height);
        ctx.stroke();
      }

      // Draw horizontal grid lines
      for (let y = 0; y <= canva.height; y += vars.wormsize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canva.width, y);
        ctx.stroke();
      }

      let stop = false;
      ctx.fillStyle = "red";

      ctx.fillRect(
        foodlocation.current.x,
        foodlocation.current.y,
        vars.wormsize,
        vars.wormsize
      );
      if (
        snake.current[snake.current.length - 1].x == foodlocation.current.x &&
        snake.current[snake.current.length - 1].y == foodlocation.current.y
      ) {
        switch (snake.current[0].nextdir) {
          case "up":
            snake.current.unshift({
              x: snake.current[0].x,
              y: snake.current[0].y + vars.wormsize,
              nextdir: "up",
              color: `rgb(${Math.random() * 255},${Math.random() * 255},${
                Math.random() * 255
              })`,
            });
            break;
          case "down":
            snake.current.unshift({
              x: snake.current[0].x,
              y: snake.current[0].y - vars.wormsize,
              nextdir: "down",
              color: `rgb(${Math.random() * 255},${Math.random() * 255},${
                Math.random() * 255
              })`,
            });
            break;
          case "left":
            snake.current.unshift({
              x: snake.current[0].x + vars.wormsize,
              y: snake.current[0].y,
              nextdir: "left",
              color: `rgb(${Math.random() * 255},${Math.random() * 255},${
                Math.random() * 255
              })`,
            });
            break;
          case "right":
            snake.current.unshift({
              x: snake.current[0].x - vars.wormsize,
              y: snake.current[0].y,
              nextdir: "right",
              color: `rgb(${Math.random() * 255},${Math.random() * 255},${
                Math.random() * 255
              })`,
            });
            break;
        }
        foodlocation.current = getrandomsnakefood(
          snake.current.map((part) => ({ x: part.x, y: part.y })),
          vars
        );
      }
      for (let i = snake.current.length - 1; i > -1; i--) {
        const part = snake.current[i];
        ctx.fillStyle = part.color;
        if (!stop)
          switch (part.nextdir) {
            case "up":
              if (part.y - vars.wormsize < 0) {
                setVars({ ...vars, gamestatus: "gameover" });
                stop = true;
              } else part.y -= vars.wormsize;
              break;
            case "down":
              if (part.y + vars.wormsize > vars.canvasheight - vars.wormsize) {
                setVars({ ...vars, gamestatus: "gameover" });
                stop = true;
              } else part.y += vars.wormsize;

              break;
            case "left":
              if (part.x - vars.wormsize < 0) {
                setVars({ ...vars, gamestatus: "gameover" });
                stop = true;
              } else part.x -= vars.wormsize;

              break;
            case "right":
              if (part.x + vars.wormsize > vars.canvaswidth - vars.wormsize) {
                setVars({ ...vars, gamestatus: "gameover" });
                stop = true;
              } else part.x += vars.wormsize;

              break;
          }
        ctx.fillRect(part.x, part.y, vars.wormsize, vars.wormsize);
      }

      if (!stop)
        snake.current.forEach((part2, idx2, arr2) => {
          if (idx2 != 0) {
            arr2[idx2 - 1].nextdir = part2.nextdir;
          }
        });
    }
    playinterval.current = setInterval(() => {
      if (ctx && canva && snake && vars.gamestatus !== "gameover")
        animate(ctx!, canva!);
    }, vars.speed);
    return () => {
      if (playinterval.current) clearInterval(playinterval.current);
    };
  }, [canva, snake, ctx, vars]);

  useEffect(() => {
    const keyevent = (e: KeyboardEvent) => {
      if (vars.gamestatus == "gameover") return;
      const key = e.key;
      switch (key) {
        case "ArrowUp":
          if (snake.current[snake.current.length - 1].nextdir == "down") return;

          snake.current[snake.current.length - 1].nextdir = "up";
          break;
        case "ArrowDown":
          if (snake.current[snake.current.length - 1].nextdir == "up") return;
          snake.current[snake.current.length - 1].nextdir = "down";
          break;
        case "ArrowLeft":
          if (snake.current[snake.current.length - 1].nextdir == "right")
            return;
          snake.current[snake.current.length - 1].nextdir = "left";
          break;
        case "ArrowRight":
          if (snake.current[snake.current.length - 1].nextdir == "left") return;
          snake.current[snake.current.length - 1].nextdir = "right";
          break;
      }
    };
    document.addEventListener("keydown", keyevent);
    return () => {
      document.removeEventListener("keydown", keyevent);
    };
  }, [snake, vars.gamestatus]);

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
      <div
        className="flex flex-col gap-8 items-center w-full 
      "
      >
        <div
          className="grid  gap-8 w-full
        "
          style={{ gridTemplateColumns: "3fr 2fr" }}
        >
          <div className="flex flex-col items-center gap-4 justify-self-end ">
            <div className="text-pink-50 text-7xl "> Snake Game</div>
            <div ref={box} className=" border-2 rounded-md border-gray-50  ">
              {!canva && (
                <div
                  className="flex items-center justify-center skeltoneffect"
                  style={{
                    width: "500px",
                    height: "500px",
                  }}
                ></div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="text-pink-50 text-2xl bg-indigo-900 p-2 rounded-md cursor-pointer hover:bg-indigo-800 p-4 mx-auto">
              Variables
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
