"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

type MotionWrapperProps = {
  children: ReactNode;
  variants: Variants;
  delay?: number;
};

export function MotionWrapper({
  children,
  variants,
  delay = 0,
}: MotionWrapperProps) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
