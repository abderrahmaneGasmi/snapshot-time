"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Svg from "../assets/Svg";
import { chevronBack } from "../helpers/svgs";
import { alphabet, choosedirection, getrandomword } from "../helpers/utilities";
import { motion } from "framer-motion";
interface Word {
  word: string;
  direction: string;
  idxs: number[];
  found: boolean;
  hovered: boolean;
}
interface Letter {
  letter: string;
  idx: number;
}
export default function Wordpage() {
  const [letters, Setletters] = useState([] as Array<string>);
  const [randomwords, setRandomwords] = useState([] as Array<Word>);
  const [selectedletters, setSelectedletters] = useState([] as Array<Letter>);
  const [userselecting, setUserselecting] = useState({
    selecting: false,
    selctingdirection: "" as
      | "up"
      | "down"
      | "left"
      | "right"
      | "upleft"
      | "upright"
      | "downleft"
      | "downright"
      | "",
  });
  const [loading, setLoading] = useState(true);
  const maxwords = 12;
  useEffect(() => {
    // fill 144 random letters using alphabet array

    const t = [] as string[];
    const randomwords = [] as Array<Word>;
    Array.from({ length: 144 }).map((i, o) =>
      t.push(alphabet[Math.floor(Math.random() * alphabet.length)])
    );

    // make 8 words
    for (let i = 0; i < maxwords; i++) {
      let drection = "";
      let randomidx = 0;
      let randomword = "";
      while (true) {
        randomword = getrandomword(
          randomwords.map((i) => i.word)
        ).toUpperCase();
        randomidx = Math.floor(Math.random() * 144);
        drection = choosedirection(
          randomidx,
          randomword.length,
          randomwords.map((i) => i.idxs).flat()
        );
        if (drection) {
          break;
        }
      }
      const word = randomword.split("");
      const wordidx = [] as number[];
      word.map((i, o) => wordidx.push(o));
      const randomworditem = {
        word: randomword,
        direction: drection,
        idxs: [] as number[],
        found: false,
        hovered: false,
      };

      wordidx.map((i, o) => {
        if (drection === "up") {
          randomworditem.idxs.push(randomidx - o * 12);
          return (t[randomidx - o * 12] = word[i]);
        }
        if (drection === "down") {
          randomworditem.idxs.push(randomidx + o * 12);
          return (t[randomidx + o * 12] = word[i]);
        }
        if (drection === "left") {
          randomworditem.idxs.push(randomidx - o);
          return (t[randomidx - o] = word[i]);
        }
        if (drection === "right") {
          randomworditem.idxs.push(randomidx + o);
          return (t[randomidx + o] = word[i]);
        }
        if (drection === "upleft") {
          randomworditem.idxs.push(randomidx - o * 12 - o);
          return (t[randomidx - o * 12 - o] = word[i]);
        }
        if (drection === "upright") {
          randomworditem.idxs.push(randomidx - o * 12 + o);
          return (t[randomidx - o * 12 + o] = word[i]);
        }
        if (drection === "downleft") {
          randomworditem.idxs.push(randomidx + o * 12 - o);
          return (t[randomidx + o * 12 - o] = word[i]);
        }
        if (drection === "downright") {
          randomworditem.idxs.push(randomidx + o * 12 + o);
          return (t[randomidx + o * 12 + o] = word[i]);
        }
      });
      randomwords.push(randomworditem);
    }
    Setletters(t);
    setRandomwords(randomwords);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  const checkifidxexist = (idx: number) => {
    // check if the index is in the random words indexes and the word is found
    const found = randomwords.find((i) => i.idxs.includes(idx) && i.found);
    if (found) {
      return "rgb(5, 150, 105)";
    }
    if (selectedletters.find((i) => i.idx === idx)) {
      return "rgba(236, 72, 153, 0.3)";
    }
    if (randomwords.find((i) => i.idxs.includes(idx))) {
      return "rgb(59, 130, 246)";
    }

    if (letters[idx]) return "rgba(49, 46, 129, 0.3)";
  };
  const checkselectedword = () => {
    // check if the selected word is in the random words
    const selectedword = selectedletters.map((i) => i.letter).join("");
    const found = randomwords.find((i) => i.word === selectedword);
    if (found) {
      const updatedwords = randomwords.map((i) => {
        if (i.word === selectedword) {
          return { ...i, found: true };
        }
        return i;
      });
      setRandomwords(updatedwords);
      setSelectedletters([]);
    }
  };
  const startselecting = (idx: number) => {
    setUserselecting({
      selecting: true,
      selctingdirection: "",
    });
    setSelectedletters([{ letter: letters[idx], idx }]);
  };
  const endselecting = () => {
    checkselectedword();
    setUserselecting({
      selecting: false,
      selctingdirection: "",
    });
    setSelectedletters([]);
  };
  const selecting = (idx: number) => {
    if (userselecting.selecting) {
      const lastidx = selectedletters[selectedletters.length - 1].idx;
      const direction = userselecting.selctingdirection;
      switch (direction) {
        case "up":
          if (lastidx - 12 === idx) {
            setSelectedletters([
              ...selectedletters,
              { letter: letters[idx], idx },
            ]);
          }

          break;
        case "down":
          if (lastidx + 12 === idx) {
            setSelectedletters([
              ...selectedletters,
              { letter: letters[idx], idx },
            ]);
          }
          break;
        case "left":
          if (lastidx - 1 === idx) {
            setSelectedletters([
              ...selectedletters,
              { letter: letters[idx], idx },
            ]);
          }
          break;
        case "right":
          if (lastidx + 1 === idx) {
            setSelectedletters([
              ...selectedletters,
              { letter: letters[idx], idx },
            ]);
          }
          break;
        case "upleft":
          if (lastidx - 13 === idx) {
            setSelectedletters([
              ...selectedletters,
              { letter: letters[idx], idx },
            ]);
          }
          break;
        case "upright":
          if (lastidx - 11 === idx) {
            setSelectedletters([
              ...selectedletters,
              { letter: letters[idx], idx },
            ]);
          }
          break;
        case "downleft":
          if (lastidx + 11 === idx) {
            setSelectedletters([
              ...selectedletters,
              { letter: letters[idx], idx },
            ]);
          }
          break;
        case "downright":
          if (lastidx + 13 === idx) {
            setSelectedletters([
              ...selectedletters,
              { letter: letters[idx], idx },
            ]);
          }
          break;
        case "":
          if (lastidx - 12 === idx) {
            setUserselecting({
              selecting: true,
              selctingdirection: "up",
            });
          }
          if (lastidx + 12 === idx) {
            setUserselecting({
              selecting: true,
              selctingdirection: "down",
            });
          }
          if (lastidx - 1 === idx) {
            setUserselecting({
              selecting: true,
              selctingdirection: "left",
            });
          }
          if (lastidx + 1 === idx) {
            setUserselecting({
              selecting: true,
              selctingdirection: "right",
            });
          }
          if (lastidx - 13 === idx) {
            setUserselecting({
              selecting: true,
              selctingdirection: "upleft",
            });
          }
          if (lastidx - 11 === idx) {
            setUserselecting({
              selecting: true,
              selctingdirection: "upright",
            });
          }
          if (lastidx + 11 === idx) {
            setUserselecting({
              selecting: true,
              selctingdirection: "downleft",
            });
          }
          if (lastidx + 13 === idx) {
            setUserselecting({
              selecting: true,
              selctingdirection: "downright",
            });
          }
          setSelectedletters([
            ...selectedletters,
            { letter: letters[idx], idx },
          ]);
          break;

        default:
          break;
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
        {loading ? (
          <div
            className="grid  w-full  justify-center gap-8 
        "
            style={{
              gridTemplateColumns: "2fr 1fr",
            }}
          >
            <div className="flex flex-col items-center justify-self-end gap-4">
              <div className="text-pink-50 text-7xl ">Word finder Game</div>
              <div
                className="grid grid-cols-12 grid-rows-12 gap-2 border-2 rounded-md border-gray-50 p-3 w-max
         skeltoneffect"
              >
                {Array.from({ length: 144 }).map((i, o) => (
                  <div
                    className="text-3xl text-gray-100 font-bold px-6 py-4 cursor-pointer  rounded-md select-none  min-w-20 min-h-16
                  border-2 border-indigo-900
                  
                  "
                    key={o}
                  ></div>
                ))}
              </div>
            </div>
            <div
              className="flex flex-col min-w-80 justify-self-center gap-8
          
          "
            >
              <div className=" text-7xl text-gray-100 font-bold mx-auto">
                Words to find
              </div>
              <div className="flex flex-wrap gap-4 ">
                {Array.from({ length: 8 }).map((i, o) => (
                  <div
                    className="text-2xl text-gray-100 font-bold px-6 py-4 cursor-pointer  rounded-md select-none skeltoneffect min-w-40 min-h-16
                   "
                    key={o}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div
            className="grid  w-full  justify-center gap-8
        "
            style={{
              gridTemplateColumns: "2fr 1fr",
            }}
          >
            <div className="flex flex-col items-center gap-4 justify-self-end ">
              <div className="text-pink-50 text-7xl ">Word finder Game</div>
              <div
                className="grid grid-cols-12 grid-rows-12 gap-2 border-2 rounded-md border-gray-50 p-3 w-max
       "
              >
                {letters.map((i, o) => (
                  <motion.div
                    className="text-3xl text-center text-gray-100 font-bold px-6 py-4 cursor-pointer  rounded-md select-none 
                   "
                    style={{
                      backgroundColor: checkifidxexist(o),
                    }}
                    onMouseDown={() => {
                      startselecting(o);
                    }}
                    onMouseUp={() => {
                      endselecting();
                    }}
                    key={o}
                  >
                    <span
                      onMouseEnter={() => {
                        selecting(o);
                      }}
                    >
                      {i}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div
              className="flex flex-col min-w-80 justify-self-center gap-8
          
          "
            >
              <div className=" text-7xl text-gray-100 font-bold mx-auto">
                Words to find
              </div>
              <div className="flex flex-wrap gap-4">
                {randomwords.map((i, o) => (
                  <div
                    className="text-2xl text-gray-100 font-bold px-6 py-4 cursor-pointer  rounded-md select-none bg-indigo-900 min-w-40 min-h-16 
                   "
                    key={o}
                  >
                    {i.word}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
