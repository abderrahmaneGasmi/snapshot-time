"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ConfettiScreen from "../assets/ConfettiScreen";
import Svg from "../assets/Svg";
import { chevronBack } from "../helpers/svgs";
import Link from "next/link";
interface Card {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function Memorypage() {
  const [cards, setCards] = useState<Array<Card>>([]);
  const [selected, setSelected] = useState([] as Array<Card>);
  const [showstars, setShowstars] = useState([] as Array<number>);
  const [youwon, setyouwon] = useState(false);
  useEffect(() => {
    let indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    let cardsimages = [
      { url: "/card (1).png", selected: 0 },
      { url: "/card (2).png", selected: 0 },
      { url: "/card (3).png", selected: 0 },
      { url: "/card (4).png", selected: 0 },
      { url: "/card (5).png", selected: 0 },
      { url: "/card (6).png", selected: 0 },
      { url: "/card (7).png", selected: 0 },
      { url: "/card (8).png", selected: 0 },
    ];
    const newCards = indexes.map((index) => {
      const randomimage = Math.floor(Math.random() * cardsimages.length);
      cardsimages[randomimage].selected += 1;
      const url = cardsimages[randomimage].url;
      if (cardsimages[randomimage].selected === 2) {
        cardsimages.splice(randomimage, 1);
      }

      return {
        id: index,
        image: url || "/card (0).png",
        isFlipped: false,
        isMatched: false,
      };
    });
    setCards(newCards);
  }, []);
  const selectCard = (card: Card) => {
    if (card.isFlipped || card.isMatched) {
      return;
    }
    setShowstars([]);
    if (selected.length >= 2) {
      return;
    }
    if (selected.length === 1) {
      if (selected[0].id === card.id) return;

      if (selected[0].image === card.image) {
        card.isMatched = true;
        selected[0].isMatched = true;
        setCards((old) => {
          return old.map((c) => {
            if (c.id === card.id) {
              return card;
            }
            if (c.id === selected[0].id) {
              return selected[0];
            }
            return c;
          });
        });
        setShowstars([...showstars, card.id, selected[0].id]);
        setSelected([]);
        checkwin();
        return;
      } else {
        setTimeout(() => {
          setSelected([]);
        }, 1000);
      }
    }
    // card.isFlipped = true;
    setSelected([...selected, card]);
  };
  const checkwin = () => {
    const allcards = cards.filter((c) => c.isMatched);
    if (allcards.length === 16) {
      setyouwon(true);
    }
  };
  return (
    <main className="h-screen flex flex-col items-center justify-around relative">
      <Link
        className="absolute top-4 left-4 flex  items-center justify-center text-pink-50 font-bold text-4xl cursor-pointer gap-2 bg-indigo-900 rounded p-2
      
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
        <div className="text-pink-50 text-7xl ">Memory Card Game</div>
        <div className="grid grid-cols-4 gap-4 w-max ">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className={`${
                showstars.includes(card.id) ? "glowstar " : ""
              } w-20 h-20   flex items-center justify-center cursor-pointer  relative`}
              onClick={() => {
                selectCard(card);
              }}
              // whileHover={{ scale: 1.1 }}
            >
              <div className="bg-gray-200 z-10 rounded-xl absolute inset-0"></div>
              {(card.isMatched || selected.find((c) => c.id === card.id)) && (
                <Image
                  src={card.image}
                  alt="icon"
                  width="80"
                  height="80"
                  className="relative z-20"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
      {youwon && <ConfettiScreen />}
    </main>
  );
}
