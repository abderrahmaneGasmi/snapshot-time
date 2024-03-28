"use client";

import Svg from "./assets/Svg";
import {
  ball,
  boxes,
  card,
  mine,
  search,
  snake,
  tictactoe,
} from "./helpers/svgs";
import { useState } from "react";
import Link from "next/link";
export default function Home() {
  const [game, setGame] = useState("");
  return (
    <main className="h-screen flex flex-col items-center justify-around">
      <div className="flex flex-col">
        <div className="text-pink-50 text-7xl ">Snapshot-Time</div>
        <div className="text-yellow-400 text-2xl mx-auto min-h-8">
          {game || " "}{" "}
        </div>
      </div>

      <div className="flex gap-4 flex-wrap w-96 min-h-96 content-start justify-evenly ">
        <div
          onMouseEnter={() => setGame("Card Game")}
          onMouseLeave={() => setGame("")}
        >
          <Icon path={card.path} view={card.viewBox} url="/cards" />
        </div>
        <div
          onMouseEnter={() => setGame("Word finder Game")}
          onMouseLeave={() => setGame("")}
        >
          <Icon path={search.path} view={search.viewBox} url="/wordfinder" />
        </div>
        <div
          onMouseEnter={() => setGame("Wordle Game")}
          onMouseLeave={() => setGame("")}
        >
          <Icon path={boxes.path} view={boxes.viewBox} url="/wordle" />
        </div>
        <div
          onMouseEnter={() => setGame("Tic Tac Toe Game")}
          onMouseLeave={() => setGame("")}
        >
          <Icon
            path={tictactoe.path}
            view={tictactoe.viewBox}
            url="/tictactoe"
            pathtags={{
              fill: "white",
              stroke: "white",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
            }}
          />
        </div>
        <div
          onMouseEnter={() => setGame("Minesweeper Game")}
          onMouseLeave={() => setGame("")}
        >
          <Icon path={mine.path} view={mine.viewBox} url="/minesweeper" />
        </div>
        <div
          onMouseEnter={() => setGame("Balls Simulator Game")}
          onMouseLeave={() => setGame("")}
        >
          <Icon path={ball.path} view={ball.viewBox} url="/balls" />
        </div>
        <div
          onMouseEnter={() => setGame("Snake Game")}
          onMouseLeave={() => setGame("")}
        >
          <Icon path={snake.path} view={snake.viewBox} />
        </div>
      </div>
    </main>
  );
}
function Icon({
  path,
  view,
  classlist,
  pathtags,
  url,
}: {
  path: string;
  view: string;
  classlist?: string;
  pathtags?: { [key: string]: any };
  url?: string;
}) {
  return (
    <Link href={url || "/"}>
      <div className="p-4 border-4 rounded-3xl border-gray-300 cursor-pointer">
        <Svg
          classlist={classlist || "h-12 w-12"}
          path={path}
          view={view}
          style={{ fill: "white" }}
          pathtags={pathtags}
        />
      </div>
    </Link>
  );
}
