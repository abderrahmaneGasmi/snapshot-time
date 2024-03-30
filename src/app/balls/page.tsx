"use client";
import Link from "next/link";
import React, { useLayoutEffect, useRef, useState } from "react";
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
];
export default function Ballspage() {
  const box = React.useRef<HTMLDivElement>(null);
  const animateRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(
    null
  );
  const [canva, setcanva] = useState<HTMLCanvasElement | null>(null);
  const oldvariables = useRef({
    radius: 10,
    coefficientOfRestitution: 0.7,
    coefficientOfRestitutionCollision: 0.65,
    maxSpeed: 2.2,
    ballsnum: 50,
    startcollinding: false,
    objects: [] as { x: number; y: number; shape: string; color: string }[],
    maxobjects: 3,
    balls: [] as {
      x: number;
      y: number;
      dx: number;
      dy: number;
      radius: number;
      color: string;
      id: string;
    }[],
  });
  const [variables, setVariables] = useState({
    radius: 10,
    coefficientOfRestitution: 0.7,
    coefficientOfRestitutionCollision: 0.65,
    maxSpeed: 2.2,
    ballsnum: 50,
    startcollinding: false,
    objects: [] as { x: number; y: number; shape: string; color: string }[],
    maxobjects: 3,
    balls: [] as {
      x: number;
      y: number;
      dx: number;
      dy: number;
      radius: number;
      color: string;
      id: string;
    }[],
  });
  React.useEffect(() => {
    if (animateRef.current) cancelAnimationFrame(animateRef.current);
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
          if (
            variables.balls.length !== 0 &&
            variables.balls.length === oldvariables.current.balls.length &&
            variables.ballsnum === oldvariables.current.ballsnum &&
            variables.objects.length === oldvariables.current.objects.length &&
            variables.maxobjects === oldvariables.current.maxobjects &&
            variables.maxSpeed === oldvariables.current.maxSpeed &&
            variables.coefficientOfRestitution ===
              oldvariables.current.coefficientOfRestitution &&
            variables.coefficientOfRestitutionCollision ===
              oldvariables.current.coefficientOfRestitutionCollision
          ) {
          } else {
            if (variables.balls.length < variables.ballsnum) {
              const balls: {
                x: number;
                y: number;
                dx: number;
                dy: number;
                radius: number;
                color: string;
                id: string;
              }[] = [...variables.balls];
              for (
                let i = variables.balls.length;
                i < variables.ballsnum;
                i++
              ) {
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

                  variables.objects.forEach((object) => {
                    switch (object.shape) {
                      case "circle": {
                        const dx = object.x - position.x;
                        const dy = object.y - position.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        if (distance < variables.radius + 50) {
                          isColliding = true;
                        }
                        break;
                      }
                      case "square": {
                        if (
                          position.x + variables.radius > object.x &&
                          position.x - variables.radius < object.x + 100 &&
                          position.y + variables.radius > object.y &&
                          position.y - variables.radius < object.y + 100
                        ) {
                          isColliding = true;
                        }
                        break;
                      }
                    }
                  });

                  if (!isColliding) {
                    balls.push({
                      x: position.x,
                      y: position.y,
                      dx: Math.random() * 5 - 2.5,
                      dy: Math.random() * 5 - 2.5,
                      radius: variables.radius,
                      color: `rgb(${Math.random() * 255},${
                        Math.random() * 255
                      },${Math.random() * 255})`,
                      id: i.toString(),
                    });
                    break;
                  }
                }
              }
              setVariables((prev) => {
                return { ...prev, balls };
              });
            } else {
              if (variables.balls.length > variables.ballsnum) {
                let balls = [] as {
                  x: number;
                  y: number;
                  dx: number;
                  dy: number;
                  radius: number;
                  color: string;
                  id: string;
                }[];
                for (let i = 0; i < variables.ballsnum; i++) {
                  balls.push({
                    x: variables.balls[i].x,
                    y: variables.balls[i].y,
                    dx: Math.random() * 5 - 2.5,
                    dy: Math.random() * 5 - 2.5,
                    radius: variables.radius,
                    color: variables.balls[i].color,
                    id: i.toString(),
                  });
                }

                setVariables((prev) => {
                  return { ...prev, balls };
                });
              } else {
                let ballsidsexistinsideotherobjects: string[] = [];
                variables.balls.forEach((ball) => {
                  variables.objects.forEach((object) => {
                    switch (object.shape) {
                      case "circle": {
                        const dx = object.x - ball.x;
                        const dy = object.y - ball.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        if (distance < ball.radius + 50) {
                          ballsidsexistinsideotherobjects.push(ball.id);
                        }
                        break;
                      }
                      case "square": {
                        if (
                          ball.x + ball.radius > object.x &&
                          ball.x - ball.radius < object.x + 100 &&
                          ball.y + ball.radius > object.y &&
                          ball.y - ball.radius < object.y + 100
                        ) {
                          ballsidsexistinsideotherobjects.push(ball.id);
                        }
                        break;
                      }
                    }
                  });
                });
                if (ballsidsexistinsideotherobjects.length > 0)
                  setVariables((prev) => {
                    return {
                      ...prev,
                      balls: prev.balls.filter(
                        (ball) =>
                          !ballsidsexistinsideotherobjects.includes(ball.id)
                      ),
                    };
                  });
              }
            }
            oldvariables.current = { ...variables };
          }
          animate(ctx, canvas, variables.balls);
        } else {
          if (animateRef.current) cancelAnimationFrame(animateRef.current);
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
      console.log(variables.maxSpeed);
      variables.objects.forEach((object) => {
        const shape = shapes.find((shape) => shape.name === object.shape);
        if (shape) {
          ctx.beginPath();
          shape.draw(ctx, object.x, object.y);
          ctx.fillStyle = object.color;
          ctx.fill();
        }
      });
      balls.forEach((ball) => {
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Check for collision with walls
        if (ball.x + ball.radius > canvas.width) {
          ball.x = canvas.width - ball.radius; // Adjust position to keep the ball within the canvas
          ball.dx = Math.max(
            -variables.coefficientOfRestitution * ball.dx,
            -variables.maxSpeed
          ); // Lower horizontal velocity
        } else if (ball.x - ball.radius < 0) {
          ball.x = ball.radius; // Adjust position to keep the ball within the canvas
          ball.dx = Math.min(
            -variables.coefficientOfRestitution * ball.dx,
            variables.maxSpeed
          ); // Lower horizontal velocity
        }

        // Check for collision with vertical boundaries
        if (ball.y + ball.radius > canvas.height) {
          ball.y = canvas.height - ball.radius; // Adjust position to keep the ball within the canvas
          ball.dy = Math.max(
            -variables.coefficientOfRestitution * ball.dy,
            -variables.maxSpeed
          ); // Lower vertical velocity
        } else if (ball.y - ball.radius < 0) {
          ball.y = ball.radius; // Adjust position to keep the ball within the canvas
          ball.dy = Math.min(
            -variables.coefficientOfRestitution * ball.dy,
            variables.maxSpeed
          ); // Lower vertical velocity
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
            // ball.dx = Math.min(newVelocities.vel1.x, variables.maxSpeed);
            ball.dx =
              newVelocities.vel1.x > 0
                ? Math.min(newVelocities.vel1.x, variables.maxSpeed)
                : Math.max(newVelocities.vel1.x, -variables.maxSpeed);
            ball.dy =
              newVelocities.vel1.y > 0
                ? Math.min(newVelocities.vel1.y, variables.maxSpeed)
                : Math.max(newVelocities.vel1.y, -variables.maxSpeed);
            otherBall.dx =
              newVelocities.vel2.x > 0
                ? Math.min(newVelocities.vel2.x, variables.maxSpeed)
                : Math.max(newVelocities.vel2.x, -variables.maxSpeed);
            otherBall.dy =
              newVelocities.vel2.y > 0
                ? Math.min(newVelocities.vel2.y, variables.maxSpeed)
                : Math.max(newVelocities.vel2.y, -variables.maxSpeed);
          }
        });
        variables.objects.forEach((object) => {
          switch (object.shape) {
            case "circle": {
              const dx = object.x - ball.x;
              const dy = object.y - ball.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              if (distance < ball.radius + 50) {
                const overlap = ball.radius + 50 - distance;
                const separationVector = {
                  x: (dx / distance) * overlap,
                  y: (dy / distance) * overlap,
                };
                ball.x -= separationVector.x * 0.5;
                ball.y -= separationVector.y * 0.5;
                const newVelocities = resolveCollision({
                  vel1: { x: ball.dx, y: ball.dy },
                  vel2: { x: 0, y: 0 },
                  normal: { x: dx / distance, y: dy / distance },
                  coefficientOfRestitution: variables.coefficientOfRestitution,
                });
                ball.dx = Math.min(newVelocities.vel1.x, variables.maxSpeed);
                ball.dy = Math.min(newVelocities.vel1.y, variables.maxSpeed);
              }
              break;
            }
            case "square": {
              if (
                ball.x + ball.radius > object.x &&
                ball.x - ball.radius < object.x + 100 &&
                ball.y + ball.radius > object.y &&
                ball.y - ball.radius < object.y + 100
              ) {
                // Collision detected
                if (
                  ball.x + ball.radius > object.x &&
                  ball.x - ball.radius < object.x + 100
                ) {
                  // Ball collided with the vertical sides of the square
                  ball.dx *= -variables.coefficientOfRestitution;
                }
                if (
                  ball.y + ball.radius > object.y &&
                  ball.y - ball.radius < object.y + 100
                ) {
                  // Ball collided with the horizontal sides of the square
                  ball.dy *= -variables.coefficientOfRestitution;
                }

                // Adjust ball position to prevent overlap
                if (ball.x + ball.radius > object.x && ball.x < object.x) {
                  ball.x = object.x - ball.radius;
                } else if (
                  ball.x - ball.radius < object.x + 100 &&
                  ball.x > object.x + 100
                ) {
                  ball.x = object.x + 100 + ball.radius;
                }
                if (ball.y + ball.radius > object.y && ball.y < object.y) {
                  ball.y = object.y - ball.radius;
                } else if (
                  ball.y - ball.radius < object.y + 100 &&
                  ball.y > object.y + 100
                ) {
                  ball.y = object.y + 100 + ball.radius;
                }
              }
              break;
            }
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

      animateRef.current = requestAnimationFrame(() =>
        animate(ctx, canvas, balls)
      );
    }
    return () => {
      if (animateRef.current) cancelAnimationFrame(animateRef.current);
    };
  }, [variables, canva]);

  const drawobject = () => {
    if (variables.objects.length > variables.maxobjects) return;
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const x = Math.random() * canva!.width;
    const y = Math.random() * canva!.height;
    const color = `rgb(${Math.random() * 255},${Math.random() * 255},${
      Math.random() * 255
    })`;
    setVariables((prev) => {
      return {
        ...prev,
        objects: [...prev.objects, { x, y, shape: shape.name, color }],
      };
    });
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
          className="grid  gap-8 w-full
        "
          style={{ gridTemplateColumns: "3fr 2fr" }}
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
                {variables.startcollinding ? "Stop " : "Start "}
                collinding
              </div>
            </div>
            <div
              ref={box}
              className=" border-2 rounded-md border-gray-50 
       "
            >
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
            <div className="flex items-center gap-4">
              <div className="text-pink-50 text-2xl bg-indigo-900 p-2 rounded-md cursor-pointer hover:bg-indigo-800">
                Balls Number : {variables.ballsnum}
              </div>
              <div className="text-pink-50 text-2xl bg-indigo-900 p-2 rounded-md cursor-pointer hover:bg-indigo-800">
                10
              </div>
              <input
                type="range"
                value={variables.ballsnum}
                className="slider"
                step={10}
                min={10}
                max={80}
                onChange={(e) => {
                  setVariables((prev) => {
                    return { ...prev, ballsnum: parseInt(e.target.value) };
                  });
                  // loose focus
                  e.target.blur();
                }}
              />
              <div className="text-pink-50 text-2xl bg-indigo-900 p-2 rounded-md cursor-pointer hover:bg-indigo-800">
                80
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-pink-50 text-2xl bg-indigo-900 p-2 rounded-md cursor-pointer hover:bg-indigo-800">
                Max Objects : {variables.maxobjects}
              </div>
              <div className="text-pink-50 text-2xl bg-indigo-900 p-2 rounded-md cursor-pointer hover:bg-indigo-800">
                1
              </div>
              <input
                type="range"
                value={variables.maxobjects}
                className="slider"
                step={1}
                min={1}
                max={8}
                onChange={(e) => {
                  setVariables((prev) => {
                    return { ...prev, maxobjects: parseInt(e.target.value) };
                  });
                  // loose focus
                  e.target.blur();
                }}
              />
              <div className="text-pink-50 text-2xl bg-indigo-900 p-2 rounded-md cursor-pointer hover:bg-indigo-800">
                8
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-pink-50 text-2xl bg-indigo-900 p-2 rounded-md cursor-pointer hover:bg-indigo-800">
                Max speed : {variables.maxSpeed}
              </div>
              <div className="text-pink-50 text-2xl bg-indigo-900 p-2 rounded-md cursor-pointer hover:bg-indigo-800">
                0.1
              </div>
              <input
                type="range"
                value={variables.maxSpeed}
                className="slider"
                step={0.3}
                min={0.1}
                max={6}
                onChange={(e) => {
                  setVariables((prev) => {
                    return { ...prev, maxSpeed: parseFloat(e.target.value) };
                  });
                  // loose focus
                  e.target.blur();
                }}
              />
              <div className="text-pink-50 text-2xl bg-indigo-900 p-2 rounded-md cursor-pointer hover:bg-indigo-800">
                6
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-pink-50 text-2xl bg-indigo-900 p-2 rounded-md cursor-pointer hover:bg-indigo-800">
                Coefficient of Restitution :{" "}
                {variables.coefficientOfRestitution}
              </div>
              <div className="text-pink-50 text-2xl bg-indigo-900 p-2 rounded-md cursor-pointer hover:bg-indigo-800">
                0.1
              </div>
              <input
                type="range"
                value={variables.coefficientOfRestitution}
                className="slider"
                step={0.1}
                min={0.1}
                max={1}
                onChange={(e) => {
                  setVariables((prev) => {
                    return {
                      ...prev,
                      coefficientOfRestitution: parseFloat(e.target.value),
                    };
                  });
                  // loose focus
                  e.target.blur();
                }}
              />
              <div className="text-pink-50 text-2xl bg-indigo-900 p-2 rounded-md cursor-pointer hover:bg-indigo-800">
                1
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div
                className="text-pink-50 text-2xl bg-green-700 p-4 rounded-md cursor-pointer hover:bg-green-800 mx-auto"
                onClick={() => {
                  setVariables((prev) => {
                    let obj = {
                      balls: [],
                      objects: [],
                      maxSpeed: 2.2,
                      coefficientOfRestitution: 0.7,
                      ballsnum: 50,
                      coefficientOfRestitutionCollision: 0.65,
                      maxobjects: 3,
                      radius: 10,
                      startcollinding: false,
                    };

                    oldvariables.current = { ...obj };
                    return {
                      ...prev,
                      ...obj,
                    };
                  });
                }}
              >
                Restart the simulation
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
