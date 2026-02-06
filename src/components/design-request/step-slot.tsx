"use client";

import { useDesignRequestStore } from "@/stores/design-request.store";
import { StepBusiness } from "./steps/step-business";
import { StepContact } from "./steps/step-contact";
import { StepDesign } from "./steps/step-design";
import { StepNotes } from "./steps/step-notes";
import { StepSummary } from "./steps/step-summary";
import { StepDelivery } from "./steps/step-delivery";
import { StepSuccess } from "./steps/step-success";
import { useEffect } from "react";

import { AnimatePresence, motion } from "framer-motion";

export function StepSlot() {
  const step = useDesignRequestStore((s) => s.step);
  useEffect(() => {
    window.dataLayer?.push({
      event: `design_step_${step}`,
    });
  }, [step]);
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {step === "business" && <StepBusiness />}
        {step === "contact" && <StepContact />}
        {step === "design" && <StepDesign />}
        {step === "delivery" && <StepDelivery />}
        {step === "notes" && <StepNotes />}
        {step === "summary" && <StepSummary />}
        {step === "success" && <StepSuccess />}
      </motion.div>
    </AnimatePresence>
  );
}
