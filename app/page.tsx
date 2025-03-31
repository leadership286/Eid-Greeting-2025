'use client'
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const emojis = ["🌙", "✨", "🕌", "🎉", "💖", "🥮", "🕋", "🎊", "💝", "🌟"];

const greetings = [
  "🌙 May this Eid bring endless joy and prosperity into your life! ✨",
  "🕌 Wishing you peace, love, and happiness on this blessed occasion! 🎉",
  "💖 Eid Mubarak! May your heart be filled with warmth and kindness! 🥮",
  "🎊 Celebrate this Eid with gratitude, laughter, and cherished moments! 💝",
  "🌟 May Allah’s blessings shine upon you and your family today and always! ✨",
  "💫 Sending you heartfelt prayers and love this Eid! Stay blessed! 🌙",
  "🕋 May this Eid be a new beginning of success, happiness, and peace for you! 🌟"
];

type EmojiType = {
  id: number;
  emoji: string;
  left: string;
  size: string;
};

const EidEmojiRain = () => {
  const [emojiList, setEmojiList] = useState<EmojiType[]>([]);
  const [greeting, setGreeting] = useState(greetings[0]);
  const [fireworks, setFireworks] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (emojiList.length < 30) { // Limit the number of falling emojis
        setEmojiList((prev) => [
          ...prev,
          {
            id: Math.random(),
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
            left: Math.random() * 85 + "%",
            size: Math.random() * (2.5 - 1.5) + 1.5 + "rem",
          },
        ]);
      }
    }, 500);

    const greetingInterval = setInterval(() => {
      setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
    }, 4000);

    const fireworksInterval = setInterval(() => {
      setFireworks(true);
      setTimeout(() => setFireworks(false), 1500);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(greetingInterval);
      clearInterval(fireworksInterval);
    };
  }, [emojiList]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-purple-900 via-fuchsia-600 to-cyan-400 flex flex-col items-center justify-center overflow-hidden text-center p-4">
      <h1 className="text-4xl md:text-5xl text-yellow-500 font-bold mb-5 drop-shadow-lg tracking-wide ">
        Eid Mubarak! 🌙✨
      </h1>
      <div className="flex flex-col items-center justify-center space-y-4">
        <p className="text-lg md:text-xl text-white bg-white/20 px-6 py-3 rounded-xl shadow-lg font-semibold italic max-w-md border-2 border-yellow-300">
          {greeting}
        </p>
        <motion.div
          className="w-16 h-16 bg-emerald-400 rounded-full flex items-center justify-center text-3xl shadow-lg border-4 border-purple-600 animate-bounce"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          ❤️
        </motion.div>
        <p className="text-white text-sm md:text-base  bg-gradient-to-r from-yellow-400 via-cyan-500 to-pink-500 px-6 py-3 rounded-lg shadow-lg border-2 border-white font-bold">
          Developed by Rimsha Ansari, Daughter of Ayaz Ansari
        </p>
      </div>
      {emojiList.map((item) => (
        <motion.div
          key={item.id}
          className="absolute drop-shadow-lg opacity-90"
          initial={{ y: -50, opacity: 1 }}
          animate={{ y: "100vh", opacity: 1 }}
          transition={{ duration: 6, repeat: Infinity }}
          style={{ left: item.left, fontSize: item.size }}
        >
          {item.emoji}
        </motion.div>
      ))}
      {fireworks && (
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping text-6xl">
          🎆🎇✨
        </div>
      )}
    </div>
  );
};

export default EidEmojiRain;
