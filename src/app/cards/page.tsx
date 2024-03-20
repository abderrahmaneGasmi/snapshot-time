"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
interface Card {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function Memorypage() {
  const [cards, setCards] = useState<Array<Card>>([]);
  const [selected, setSelected] = useState([] as Array<Card>);
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
    if (selected.length === 2) {
      return;
    }
    if (selected.length === 1) {
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
        setSelected([]);
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
  return (
    <main className="h-screen flex flex-col items-center justify-around ">
      <div className="flex flex-col gap-8 items-center">
        <div className="text-pink-50 text-7xl ">Memory Card Game</div>
        <div className="grid grid-cols-4 gap-4 w-max ">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className="w-20 h-20 rounded-xl bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden"
              onClick={() => {
                selectCard(card);
              }}
              whileHover={{ scale: 1.1 }}
            >
              <Image
                src={
                  card.isMatched || selected.find((c) => c.id === card.id)
                    ? card.image
                    : "/card (0).png"
                }
                alt="icon"
                width="80"
                height="80"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
