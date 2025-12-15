"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import confetti from "canvas-confetti";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Great_Vibes } from "next/font/google";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
});

export default function InvitationPage() {
  const params = useParams();
  const [name, setName] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    setMounted(true);
    if (params.name) {
      setName(decodeURIComponent(params.name as string));
    }

    if (!audioRef.current) {
      audioRef.current = new Audio("/christmas-music.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    const attemptPlay = () => {
      if (audioRef.current) {
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              document.removeEventListener("click", attemptPlay);
              document.removeEventListener("touchstart", attemptPlay);
              document.removeEventListener("scroll", attemptPlay);
            })
            .catch((error) => {
              console.log("Autoplay blocked. Waiting for user interaction.");
              setIsPlaying(false);
            });
        }
      }
    };

    attemptPlay();

    document.addEventListener("click", attemptPlay, { once: true });
    document.addEventListener("touchstart", attemptPlay, { once: true });
    document.addEventListener("scroll", attemptPlay, { once: true });

    const duration = 4000;
    const animationEnd = Date.now() + duration;
    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    (function frame() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return;
      const particleCount = 2;

      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#ffd700", "#ffffff", "#d4af37"],
        ticks: 200,
        gravity: 0.8,
        scalar: 0.9,
      });
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#ffd700", "#ffffff", "#d4af37"],
        ticks: 200,
        gravity: 0.8,
        scalar: 0.9,
      });

      requestAnimationFrame(frame);
    })();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      document.removeEventListener("click", attemptPlay);
      document.removeEventListener("touchstart", attemptPlay);
      document.removeEventListener("scroll", attemptPlay);
    };
  }, [params.name]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="fixed inset-0 bg-mesh-gradient opacity-30 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-grid-white/[0.02] pointer-events-none" />

      <div className="fixed top-10 left-5 w-40 h-40 bg-red-600/20 rounded-full filter blur-3xl animate-blob pointer-events-none" />
      <div className="fixed top-20 right-5 w-40 h-40 bg-amber-600/20 rounded-full filter blur-3xl animate-blob animation-delay-2000 pointer-events-none" />

      <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
        {[...Array(35)].map((_, i) => {
          const randomLeft = Math.random() * 100;
          const size = Math.random() * 10 + 10;
          const duration = Math.random() * 15 + 15;
          const delay = Math.random() * 20;

          return (
            <motion.div
              key={`snow-${i}`}
              className="absolute text-white/70"
              initial={{
                left: `${randomLeft}%`,
                top: -50,
                rotate: 0,
                opacity: 0,
              }}
              animate={{ top: "110vh", rotate: 360, opacity: [0, 0.7, 0.7, 0] }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "linear",
              }}
              style={{ fontSize: `${size}px`, filter: "blur(0.3px)" }}
            >
              ❄
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="absolute top-8 left-8 text-3xl z-5"
        animate={{ y: [0, -15, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        🎄
      </motion.div>
      <motion.div
        className="absolute top-12 right-8 text-2xl z-5"
        animate={{ y: [0, -12, 0], rotate: [5, -5, 5] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        🎁
      </motion.div>
      <motion.div
        className="absolute bottom-20 left-10 text-2xl z-5"
        animate={{ y: [0, -10, 0], rotate: [-8, 8, -8] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        ⭐
      </motion.div>
      <motion.div
        className="absolute bottom-32 right-12 text-xl z-5"
        animate={{ y: [0, -8, 0], rotate: [8, -8, 8] }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      >
        🔔
      </motion.div>
      <motion.div
        className="absolute top-16 right-20 text-3xl z-30"
        animate={{ y: [0, -20, 0], x: [-5, 5, -5], rotate: [-3, 3, -3] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
        style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}
      >
        🎅
      </motion.div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-4"
        >
          <div className="flex flex-col items-end">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
              Now Playing
            </p>
            <motion.p
              className="text-sm font-bold text-white text-right max-w-[200px]"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
              animate={isPlaying ? { opacity: [1, 0.8, 1] } : {}}
              transition={{
                duration: 2,
                repeat: isPlaying ? Infinity : 0,
                ease: "easeInOut",
              }}
            >
              Army Of God Worship
            </motion.p>
            <p
              className="text-xs text-slate-300"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
            >
              Christmas Is Jesus
            </p>
          </div>

          <motion.button
            onClick={toggleMusic}
            className="relative w-16 h-16 flex-shrink-0 rounded-full group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))" }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle, #3d2817 0%, #1a1410 100%)",
              }}
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={{
                duration: 2,
                repeat: isPlaying ? Infinity : 0,
                ease: "linear",
              }}
            >
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full border border-amber-900/30"
                  style={{ margin: `${i * 2.5}px` }}
                />
              ))}
              <div
                className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-amber-600 origin-left -translate-y-1/2"
                style={{ boxShadow: "0 0 8px rgba(217, 119, 6, 0.6)" }}
              />
            </motion.div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 flex items-center justify-center border-2 border-amber-600/50 shadow-lg">
                <div className="w-2 h-2 rounded-full bg-slate-900" />
              </div>
            </div>

            {!isPlaying && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm rounded-full"
              >
                <div
                  className="w-0 h-0 border-l-[12px] border-l-amber-500 border-y-[8px] border-y-transparent ml-1"
                  style={{
                    filter: "drop-shadow(0 0 4px rgba(245, 158, 11, 0.8))",
                  }}
                />
              </motion.div>
            )}
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          <div className="relative group w-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-40 transition duration-1000" />

            <div className="relative bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-red-900 to-amber-900 opacity-90" />
                <div className="absolute inset-0 bg-mesh-pattern opacity-20" />
                <div className="absolute inset-0">
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-amber-400/60"
                      initial={{
                        x: Math.random() * 100 + "%",
                        y: -10,
                        opacity: 0,
                        scale: 0,
                      }}
                      animate={{
                        y: "120%",
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "linear",
                      }}
                      style={{ fontSize: `${Math.random() * 6 + 6}px` }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </div>

                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 py-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-2"
                  >
                    <span className="text-xs font-bold text-amber-200/80 tracking-[0.2em] uppercase shadow-black/30 drop-shadow-sm">
                      GMS Frankfurt
                    </span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className={`${greatVibes.className} text-5xl font-bold text-white leading-tight relative`}
                    style={{ textShadow: "0 0 60px rgba(255, 215, 0, 0.4)" }}
                  >
                    Christmas
                    <br />
                    Celebration
                    <motion.span
                      className="absolute -top-2 -right-6 text-2xl"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      ⭐
                    </motion.span>
                  </motion.h1>
                </div>

                <div className="absolute bottom-0 left-0 right-0">
                  <svg
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className="w-full h-10"
                  >
                    <path
                      d="M0,0 C300,80 600,80 900,0 L900,120 L0,120 Z"
                      className="fill-slate-900/90"
                    />
                  </svg>
                </div>
              </div>

              <div className="px-6 pt-3 pb-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center mb-6"
                >
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.2em] mb-3 flex items-center justify-center gap-2">
                    <span className="w-8 h-px bg-gradient-to-r from-transparent to-slate-600" />
                    Reserved For
                    <span className="w-8 h-px bg-gradient-to-l from-transparent to-slate-600" />
                  </p>
                  <motion.h2
                    className="text-3xl font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent mb-2.5 animate-gradient-x"
                    style={{ fontFamily: "var(--font-heading)" }}
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(251, 191, 36, 0.3)",
                        "0 0 30px rgba(251, 191, 36, 0.5)",
                        "0 0 20px rgba(251, 191, 36, 0.3)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {name}
                  </motion.h2>

                  <div className="flex items-center justify-center gap-1">
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-amber-500/50"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <div className="w-12 h-px bg-gradient-to-r from-amber-500/50 to-transparent" />
                    <motion.div
                      className="w-2 h-2 rounded-full bg-amber-500"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: 0.5,
                      }}
                    />
                    <div className="w-12 h-px bg-gradient-to-l from-amber-500/50 to-transparent" />
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-amber-500/50"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-0 overflow-hidden rounded-2xl border border-slate-800/50"
                >
                  <motion.div
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-slate-800/40 to-slate-800/20 hover:from-slate-800/60 hover:to-slate-800/40 transition-all duration-300 border-b border-slate-800/50"
                    whileHover={{ x: 3 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/30 to-red-600/20 backdrop-blur-sm border border-red-500/30 flex items-center justify-center shadow-lg shadow-red-500/10">
                      <Calendar className="w-6 h-6 text-red-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] font-bold text-red-400/80 uppercase tracking-[0.15em] mb-1">
                        Date
                      </p>
                      <p className="text-xl font-bold text-white">
                        December 21, 2025
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-slate-800/40 to-slate-800/20 hover:from-slate-800/60 hover:to-slate-800/40 transition-all duration-300 border-b border-slate-800/50"
                    whileHover={{ x: 3 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/30 to-amber-600/20 backdrop-blur-sm border border-amber-500/30 flex items-center justify-center shadow-lg shadow-amber-500/10">
                      <Clock className="w-6 h-6 text-amber-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] font-bold text-amber-400/80 uppercase tracking-[0.15em] mb-1">
                        Time
                      </p>
                      <p className="text-xl font-bold text-white">12:00 PM</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4 p-4 bg-gradient-to-r from-slate-800/40 to-slate-800/20 hover:from-slate-800/60 hover:to-slate-800/40 transition-all duration-300"
                    whileHover={{ x: 3 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/30 to-green-600/20 backdrop-blur-sm border border-green-500/30 flex items-center justify-center shadow-lg shadow-green-500/10">
                      <MapPin className="w-6 h-6 text-green-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] font-bold text-green-400/80 uppercase tracking-[0.15em] mb-1">
                        Location
                      </p>
                      <p className="text-xl font-bold text-white mb-1.5">
                        Hafenkirche
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Ludwigstraße 29, 60327
                        <br />
                        Frankfurt am Main, Germany
                      </p>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-center text-xs text-slate-500 mt-5 pt-4 border-t border-slate-800 flex items-center justify-center gap-1"
                >
                  We look forward to celebrating with you!
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    🎄
                  </motion.span>
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
