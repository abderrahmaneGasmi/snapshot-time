"use client";
import Link from "next/link";
import React, { useState } from "react";
import Svg from "../assets/Svg";
import { chevronBack } from "../helpers/svgs";

export default function Ballspage() {
  const box = React.useRef<HTMLDivElement>(null);
  const [variables, setVariables] = useState({
    radius: 10,
  });
  React.useEffect(() => {
    if (box.current) {
      // check if the box is already has a canvas

      if (box.current.querySelector("canvas")) {
        box.current.removeChild(box.current.querySelector("canvas")!);
      }

      const canvas = document.createElement("canvas");
      canvas.width = 500;
      canvas.height = 500;
      box.current.appendChild(canvas);
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const balls: {
          x: number;
          y: number;
          dx: number;
          dy: number;
          radius: number;
          color: string;
        }[] = [];
        for (let i = 0; i < 10; i++) {
          let position = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
          };
          while (true) {
            position = {
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
            };
            if (
              position.x + variables.radius > canvas.width ||
              position.x - variables.radius < 0
            )
              continue;
            else if (
              position.y + variables.radius > canvas.height ||
              position.y - variables.radius < 0
            )
              continue;
            // else {
            //   // console.log(position.x, position.y);
            //   break;
            // }
            let isColliding = false;
            for (let j = 0; j < balls.length; j++) {
              const dx = balls[j].x - position.x;
              const dy = balls[j].y - position.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              if (distance < balls[j].radius + variables.radius) {
                isColliding = true;
                break;
              }
            }
            if (!isColliding) {
              balls.push({
                x: position.x,
                y: position.y,
                dx: 0,
                dy: 0,
                radius: 10,
                color: `rgb(${Math.random() * 255},${Math.random() * 255},${
                  Math.random() * 255
                })`,
              });
              break;
            }
          }
          balls.push({
            x: position.x,
            y: position.y,
            dx: Math.random() * 5 - 2.5,
            dy: Math.random() * 5 - 2.5,
            radius: variables.radius,
            color: `rgb(${Math.random() * 255},${Math.random() * 255},${
              Math.random() * 255
            })`,
          });
        }

        animate(ctx, canvas, balls);
      }
    }
    function animate(
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      balls: {
        x: number;
        y: number;
        dx: number;
        dy: number;
        radius: number;
        color: string;
      }[]
    ) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      balls.forEach((ball) => {
        ball.x += ball.dx;
        ball.y += ball.dy;
        if (
          ball.x + variables.radius > canvas.width ||
          ball.x - variables.radius < 0
        ) {
          ball.dx = -ball.dx;
        }
        if (
          ball.y + variables.radius > canvas.height ||
          ball.y - variables.radius < 0
        ) {
          ball.dy = -ball.dy;
        }
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, variables.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
      });
      requestAnimationFrame(() => animate(ctx, canvas, balls));
    }
  }, []);
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
          className="  justify-center gap-8
        "
        >
          <div className="flex flex-col items-center gap-4 justify-self-end ">
            <div className="text-pink-50 text-7xl "> Ball Simulator</div>
            <div
              ref={box}
              className=" border-2 rounded-md border-gray-50 
       "
            ></div>
          </div>
        </div>
      </div>
    </main>
  );
}
