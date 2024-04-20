"use client";
import React, { useEffect, useState } from "react";
import { chevronBack, letters } from "../helpers/svgs";
import Link from "next/link";
import Svg from "../assets/Svg";
import { motion } from "framer-motion";
export default function Factspage() {
  const [canva, setcanva] = useState<HTMLCanvasElement | null>(null);
  const [ctx, setctx] = useState<CanvasRenderingContext2D | null>(null);
  const [loading, setLoading] = useState(true);
  const box = React.useRef<HTMLDivElement>(null);

  const [vars, setVars] = useState({
    canvaswidth: 1000,
    canvasheight: 600,
    iterate: 3,
    depth: 15,
  });
  const drawTree = (
    x: number,
    y: number,
    length: number,
    angle: number,
    depth: number,
    ctx: CanvasRenderingContext2D
  ) => {
    if (depth === 0) return;
    const x1 = x + length * Math.cos(angle);
    const y1 = y + length * Math.sin(angle);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    drawTree(x1, y1, length * 0.75, angle - Math.PI / 6, depth - 1, ctx);
    drawTree(x1, y1, length * 0.75, angle + Math.PI / 6, depth - 1, ctx);
  };
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
        box.current.appendChild(canva);
        if (!ctx) {
          const ctxv = canva.getContext("2d");
          if (ctxv) {
            setctx(ctxv);
          }
        } else {
          ctx.fillStyle = "black";
          ctx.fillRect(0, 0, canva.width, canva.height);
          ctx.fillStyle = "white";
          ctx.strokeStyle = "red";
          let x = vars.canvaswidth / 2;
          let y = vars.canvasheight - 10;
          let length = 50;
          let thickness = 4;
          ctx.lineWidth = thickness;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, y - length);
          ctx.stroke();
          drawTree(
            x,
            y - length,
            length * vars.iterate,
            -Math.PI / 2,
            vars.depth,
            ctx
          );

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
            <div className="text-pink-50 text-7xl ">Fractal Trees</div>
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
                size : {vars.iterate}
              </div>
              <div className="text-pink-50 text-2xl bg-indigo-900 p-2 rounded-md cursor-pointer hover:bg-indigo-800">
                1
              </div>
              <input
                type="range"
                value={vars.iterate}
                className="slider"
                step={1}
                min={1}
                max={3}
                onChange={(e) => {
                  setVars((prev) => {
                    return {
                      ...prev,
                      iterate: parseInt(e.target.value),
                    };
                  });
                  // loose focus
                  e.target.blur();
                }}
              />
              <div className="text-pink-50 text-2xl bg-indigo-900 p-2 rounded-md cursor-pointer hover:bg-indigo-800">
                3
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-pink-50 text-2xl bg-indigo-900 p-2 rounded-md cursor-pointer hover:bg-indigo-800">
                depth : {vars.depth}
              </div>
              <div className="text-pink-50 text-2xl bg-indigo-900 p-2 rounded-md cursor-pointer hover:bg-indigo-800">
                5
              </div>
              <input
                type="range"
                value={vars.depth}
                className="slider"
                step={5}
                min={5}
                max={20}
                onChange={(e) => {
                  setVars((prev) => {
                    return {
                      ...prev,
                      depth: parseInt(e.target.value),
                    };
                  });
                  // loose focus
                  e.target.blur();
                }}
              />
              <div className="text-pink-50 text-2xl bg-indigo-900 p-2 rounded-md cursor-pointer hover:bg-indigo-800">
                20
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
