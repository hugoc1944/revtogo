// src/lib/motion.ts
import { Variants, Transition } from "framer-motion";

const easeOutExpo: Transition["ease"] = [0.22, 1, 0.36, 1];

const baseTransition: Transition = {
  duration: 1,
  ease: easeOutExpo,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: baseTransition,
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: baseTransition,
  },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: baseTransition,
  },
};
