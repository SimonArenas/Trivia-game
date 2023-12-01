import { MutableRefObject } from "react";
import confetti from "canvas-confetti";

// FUNCTIONS
export function getRandomNumber(offset: number): number {
  return Math.floor(Math.random() * offset);
}

export const speakText = (text: string) => {
  if (!window.speechSynthesis) {
    alert("Sorry, your browser doesn't support text to speech!");
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.6; // Set the speech rate to slower than normal
  speechSynthesis.speak(utterance);
};

export const createConfetti = (
  ref: MutableRefObject<HTMLDivElement | null>
) => {
  const confettiExplosion = (origin: { x: number; y: number }) => {
    const fire = (particleRatio: number, opts: {}) => {
      confetti({
        ...{
          disableForReducedMotion: true,
          particleCount: Math.floor(200 * particleRatio),
        },
        ...opts,
      });
    };

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      origin,
    });
  };

  const handleClick = () => {
    const rect = ref?.current?.getBoundingClientRect();

    if (rect) {
      const center = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      const origin = {
        x: center.x / window.innerWidth,
        y: center.y / window.innerHeight,
      };

      confettiExplosion(origin);
    }
  };

  return { handleClick };
};

// -----------------------------

// ANIMATIONS
export const bounceVariants = {
  initial: { scale: 0.6 }, // Start with a scale of 0.6
  animate: {
    scale: 1, // End with a scale of 1
    transition: {
      type: "spring", // Use a spring animation for a natural bounce effect
      stiffness: 260,
      damping: 20,
    },
  },
};

export const fadeInOut = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};
