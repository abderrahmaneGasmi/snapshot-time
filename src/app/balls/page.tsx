"use client";
import Link from "next/link";
import React, { useLayoutEffect, useState } from "react";
import Svg from "../assets/Svg";
import { chevronBack } from "../helpers/svgs";
const shapes = [
  {
    name: "circle",
    draw: (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      ctx.arc(x, y, 50, 0, 2 * Math.PI);
    },
  },
  {
    name: "square",
    draw: (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      ctx.rect(x, y, 100, 100);
    },
  },
  {
    name: "triangle",
    draw: (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      ctx.moveTo(x, y);
      ctx.lineTo(x + 100, y);
      ctx.lineTo(x + 50, y + 100);
    },
  },
  {
    name: "rectangle",
    draw: (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      ctx.rect(x, y, 100, 50);
    },
  },
  {
    name: "pentagon",
    draw: (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(
          x + 50 * Math.cos((i * 2 * Math.PI) / 5),
          y + 50 * Math.sin((i * 2 * Math.PI) / 5)
        );
      }
    },
  },
  {
    name: "hexagon",
    draw: (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        ctx.lineTo(
          x + 50 * Math.cos((i * 2 * Math.PI) / 6),
          y + 50 * Math.sin((i * 2 * Math.PI) / 6)
        );
      }
    },
  },
];
export default function Ballspage() {
  const box = React.useRef<HTMLDivElement>(null);
  const [canva, setcanva] = useState<HTMLCanvasElement | null>(null);
  const [variables, setVariables] = useState({
    radius: 10,
    coefficientOfRestitution: 0.8,
    coefficientOfRestitutionCollision: 0.65,
    maxSpeed: 3,
    balls: 50,
    startcollinding: false,
    objects: [] as { x: number; y: number; shape: string }[],
    maxobjects: 1,
  });
  React.useEffect(() => {
    if (box.current) {
      // check if the box is already has a canvas

      if (box.current.querySelector("canvas")) {
        box.current.removeChild(box.current.querySelector("canvas")!);
      }
      let canvas = null;
      if (!canva) {
        canvas = document.createElement("canvas");
        canvas.width = 500;
        canvas.height = 500;
        setcanva(canvas);
      } else canvas = canva;
      box.current.appendChild(canvas);
      const ctx = canvas.getContext("2d");
      if (ctx) {
        if (variables.startcollinding) {
          const balls: {
            x: number;
            y: number;
            dx: number;
            dy: number;
            radius: number;
            color: string;
          }[] = [];
          for (let i = 0; i < variables.balls; i++) {
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
                  dx: Math.random() * 5 - 2.5,
                  dy: Math.random() * 5 - 2.5,
                  radius: variables.radius,
                  color: `rgb(${Math.random() * 255},${Math.random() * 255},${
                    Math.random() * 255
                  })`,
                });
                break;
              }
            }
          }

          animate(ctx, canvas, balls);
        }
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

        // Check for collision with walls
        if (ball.x + ball.radius > canvas.width) {
          ball.x = canvas.width - ball.radius; // Adjust position to keep the ball within the canvas
          ball.dx *= -variables.coefficientOfRestitution; // Lower horizontal velocity
        } else if (ball.x - ball.radius < 0) {
          ball.x = ball.radius; // Adjust position to keep the ball within the canvas
          ball.dx *= -variables.coefficientOfRestitution; // Lower horizontal velocity
        }

        // Check for collision with vertical boundaries
        if (ball.y + ball.radius > canvas.height) {
          ball.y = canvas.height - ball.radius; // Adjust position to keep the ball within the canvas
          ball.dy *= -variables.coefficientOfRestitution; // Lower vertical velocity
        } else if (ball.y - ball.radius < 0) {
          ball.y = ball.radius; // Adjust position to keep the ball within the canvas
          ball.dy *= -variables.coefficientOfRestitution; // Lower vertical velocity
        }

        balls.forEach((otherBall) => {
          if (ball === otherBall) return;
          const dx = otherBall.x - ball.x;
          const dy = otherBall.y - ball.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Collision detection
          if (distance < ball.radius + otherBall.radius) {
            // Collision response
            const overlap = ball.radius + otherBall.radius - distance;
            const separationVector = {
              x: (dx / distance) * overlap,
              y: (dy / distance) * overlap,
            };
            ball.x -= separationVector.x * 0.5;
            ball.y -= separationVector.y * 0.5;
            otherBall.x += separationVector.x * 0.5;
            otherBall.y += separationVector.y * 0.5;

            // Calculate new velocities after collision
            const newVelocities = resolveCollision({
              vel1: { x: ball.dx, y: ball.dy },
              vel2: { x: otherBall.dx, y: otherBall.dy },
              normal: { x: dx / distance, y: dy / distance },
              coefficientOfRestitution:
                variables.coefficientOfRestitutionCollision,
            });

            // Update velocities of the balls
            ball.dx = Math.min(newVelocities.vel1.x, variables.maxSpeed);
            ball.dy = Math.min(newVelocities.vel1.y, variables.maxSpeed);
            otherBall.dx = Math.min(newVelocities.vel2.x, variables.maxSpeed);
            otherBall.dy = Math.min(newVelocities.vel2.y, variables.maxSpeed);
          }
        });

        // Draw the ball
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, variables.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
      });

      function resolveCollision({
        vel1,
        vel2,
        normal,
        coefficientOfRestitution,
      }: {
        vel1: { x: number; y: number };
        vel2: { x: number; y: number };
        normal: { x: number; y: number };
        coefficientOfRestitution: number;
      }) {
        // Calculate relative velocity
        const relativeVelocity = { x: vel2.x - vel1.x, y: vel2.y - vel1.y };

        // Calculate impulse along normal direction
        const impulse =
          2 * (relativeVelocity.x * normal.x + relativeVelocity.y * normal.y);

        // Apply coefficient of restitution
        const newImpulse = impulse * coefficientOfRestitution;

        // Calculate new velocities after collision
        const newVel1 = {
          x: vel1.x + newImpulse * normal.x,
          y: vel1.y + newImpulse * normal.y,
        };
        const newVel2 = {
          x: vel2.x - newImpulse * normal.x,
          y: vel2.y - newImpulse * normal.y,
        };

        return { vel1: newVel1, vel2: newVel2 };
      }

      requestAnimationFrame(() => animate(ctx, canvas, balls));
    }
  }, [variables]);

  const drawobject = () => {
    if (variables.objects.length > variables.maxobjects) return;
    if (canva) {
      const ctx = canva.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        // draw a random shape with max width and height of 100

        const shape = shapes[Math.floor(Math.random() * shapes.length)];

        // x and y are random values between 150 and canvas.width - 150
        const x = Math.random() * (canva.width - 140) + 20;
        const y = Math.random() * (canva.height - 140) + 20;

        console.log(x, y, canva.width, canva.height);
        ctx.moveTo(x, y);
        ctx.beginPath();
        shape.draw(ctx, x, y);

        ctx.closePath();

        ctx.fillStyle = "cadetblue";
        ctx.fill();
      }
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
            <div className="flex align-center gap-4">
              <div
                className="text-pink-50 text-2xl bg-indigo-900 p-2 rounded-md cursor-pointer hover:bg-indigo-800"
                onClick={() => {
                  drawobject();
                }}
              >
                Add an Object
              </div>
              <div
                className="text-pink-50 text-2xl bg-indigo-900 p-2 rounded-md cursor-pointer hover:bg-indigo-800"
                onClick={() => {
                  setVariables((prev) => {
                    return { ...prev, startcollinding: !prev.startcollinding };
                  });
                }}
              >
                start collinding
              </div>
            </div>
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