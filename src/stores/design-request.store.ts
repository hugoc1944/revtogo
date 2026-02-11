import { create } from "zustand";

export type DesignRequestStep =
  | "business"
  | "contact"
  | "design"
  | "delivery"
  | "notes"
  | "summary"
  | "success";

type DesignRequestData = {
  businessName?: string;
  businessLabel?: string;
  googlePlaceId?: string;
  businessCity?: string;

  businessSource?: "google" | "manual";

  contactFirstName?: string;
  contactLastName?: string;
  contactEmail?: string;
  contactPhone?: string;

  designStyle?: "solid" | "art";
  deliveryMethod?: "email" | "whatsapp";

  notes?: string;

  source?: string;
  stopId?: string;
};

type DesignRequestStore = {
  isOpen: boolean;
  step: DesignRequestStep;
  data: DesignRequestData;

  open: () => void;
  close: () => void;

  next: () => void;
  back: () => void;

  update: (values: Partial<DesignRequestData>) => void;
  reset: () => void;
};

const steps: DesignRequestStep[] = [
  "business",
  "contact",
  "design",
  "delivery",
  "notes",
  "summary",
  "success",
];

export const useDesignRequestStore = create<DesignRequestStore>((set, get) => ({
  isOpen: false,
  step: "business",
  data: {},

 open: () =>
  set((state) => ({
    isOpen: true,
    step: state.data.googlePlaceId ? "contact" : "business",
  })),

  close: () =>
    set(() => ({
      isOpen: false,
    })),

  next: () => {
    const current = get().step;
    const index = steps.indexOf(current);
    const nextStep = steps[index + 1];

    if (nextStep) {
      set({ step: nextStep });
    }
  },

  back: () => {
    const current = get().step;
    const index = steps.indexOf(current);
    const prevStep = steps[index - 1];

    if (prevStep) {
      set({ step: prevStep });
    }
  },

  update: (values) =>
    set((state) => ({
      data: {
        ...state.data,
        ...values,
      },
    })),

  reset: () =>
    set(() => ({
      isOpen: false,
      step: "business",
      data: {},
    })),
}));
