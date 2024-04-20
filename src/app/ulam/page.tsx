"use client";
import React, { useEffect, useState } from "react";
import { chevronBack } from "../helpers/svgs";
import Link from "next/link";
import Svg from "../assets/Svg";
import { motion } from "framer-motion";
import { getnextdirection, isPrime } from "../helpers/functions";
export default function Ulamspage() {
  const [canva, setcanva] = useState<HTMLCanvasElement | null>(null);
  const [ctx, setctx] = useState<CanvasRenderingContext2D | null>(null);
  const [loading, setLoading] = useState(true);
  const [vars, setVars] = useState({
    canvaswidth: 1000,
    canvasheight: 600,
    square: 1,
    iterate: 1000 * 1000,
  });
  const box = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
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
        // if (
        //   canva.width !== vars.canvaswidth ||
        //   canva.height !== vars.canvasheight
        // ) {
        //   canva.width = vars.canvaswidth;
        //   canva.height = vars.canvasheight;
        // }
        box.current.appendChild(canva);
        if (!ctx) {
          const ctxv = canva.getContext("2d");
          if (ctxv) {
            setctx(ctxv);
          }
        } else {
          ctx.fillStyle = "black";
          ctx.fillRect(0, 0, canva.width, canva.height);
          let lap = 1;
          let x = vars.canvaswidth / 2;
          let y = vars.canvasheight / 2;
          let direction = "right" as "right" | "up" | "left" | "down";
          ctx.fillStyle = "white";
          ctx.strokeStyle = "red";

          for (let i = 1; i < vars.iterate; i++) {
            ctx.fillStyle = "white";
            ctx.strokeStyle = "red";

            // check if i is prime
            if (isPrime(i)) {
              ctx.fillRect(x, y, vars.square, vars.square);
              // ctx.fillStyle = "green";
              // ctx.font = "8px Arial";
              // ctx.fillText(i.toString(), x + 2, y + 9);
              // ctx.strokeRect(x, y, vars.square, vars.square);
            } else {
              ctx.fillStyle = "black";
              ctx.fillRect(x, y, vars.square, vars.square);
              // ctx.fillStyle = "green";
              // ctx.font = "8px Arial";
              // ctx.fillText("", x + 2, y + 9);
              // ctx.strokeRect(x, y, vars.square, vars.square);
            }
            // console.log(i);

            switch (direction) {
              case "right":
                x += vars.square;
                break;
              case "up":
                y -= vars.square;
                break;
              case "left":
                x -= vars.square;
                break;
              case "down":
                y += vars.square;
                break;
            }

            if (lap * lap + 1 === i + 1) {
              direction = "up";
            }
            if (lap * lap + (lap + 1) === i + 1) {
              direction = "left";
            }
            if (lap * lap + 2 * (lap + 1) === i + 1) {
              direction = "down";
            }
            if (lap * lap + 3 * (lap + 1) === i + 1) {
              direction = "right";
            }
            if (i + 1 === lap * lap + 4 * (lap + 1)) {
              lap += 2;
            }
          }
          setLoading(false);
        }
      }
    }
  }, [canva, ctx, vars]);

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
      <div
        className="flex flex-col gap-8 items-center w-full 
      "
      >
        <div
          className="grid  gap-8 w-full
        "
          style={{ gridTemplateColumns: "5fr 2fr" }}
        >
          <div className="flex flex-col items-center gap-4 justify-self-end ">
            <div className="text-pink-50 text-7xl ">Ulam spiral</div>

            <div
              className={`rounded-md relative
            ${"border-2 border-gray-50 "}
            `}
              style={{
                display: loading || !canva ? "block" : "none",
              }}
            >
              {" "}
              {(!canva || loading) && (
                <div
                  className="flex items-center justify-center skeltoneffect"
                  style={{
                    width: vars.canvaswidth + "px",
                    height: vars.canvasheight + "px",
                  }}
                ></div>
              )}
            </div>

            <div
              ref={box}
              className={`rounded-md relative
            ${"border-2 border-gray-50 "}
            `}
              style={{
                display: loading || !canva ? "none" : "block",
              }}
            ></div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="text-pink-50 text-2xl bg-indigo-900 p-2 rounded-md cursor-pointer hover:bg-indigo-800 p-4 mx-auto">
              Variables
            </div>
            <div className="flex items-center gap-4">
              <div className="text-pink-50 text-2xl bg-indigo-900 p-2 rounded-md cursor-pointer hover:bg-indigo-800">
                size : {vars.square}
              </div>
              <div className="text-pink-50 text-2xl bg-indigo-900 p-2 rounded-md cursor-pointer hover:bg-indigo-800">
                1
              </div>
              <input
                type="range"
                value={vars.square}
                className="slider"
                step={1}
                min={1}
                max={10}
                onChange={(e) => {
                  setVars((prev) => {
                    return {
                      ...prev,
                      square: parseInt(e.target.value),
                      iterate:
                        (vars.canvaswidth * vars.canvaswidth) /
                        parseInt(e.target.value),
                    };
                  });
                  // loose focus
                  e.target.blur();
                }}
              />
              <div className="text-pink-50 text-2xl bg-indigo-900 p-2 rounded-md cursor-pointer hover:bg-indigo-800">
                10
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
