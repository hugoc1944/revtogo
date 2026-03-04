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

  isManual: boolean;

  open: () => void;
  openManual: () => void;
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

  isManual: false,

  open: () =>
    set((state) => ({
      isOpen: true,
      step: state.data.googlePlaceId ? "contact" : "business",
    })),

  openManual: () =>
    set(() => ({
      isOpen: true,
      isManual: true,
      step: "business",
      data: {
        businessSource: "manual",

        contactFirstName: "Manual",
        contactLastName: "Pedido",
        contactEmail: "pedidomanual@revtogo.pt",
        contactPhone: "",

        designStyle: "solid",
        deliveryMethod: "email",

        source: "manual_admin",
      },
    })),

  close: () =>
    set(() => ({
      isOpen: false,
    })),

  next: () => {
    const { step, isManual } = get();

    // Manual mode: business -> summary
    if (isManual && step === "business") {
      set({ step: "summary" });
      return;
    }

    const index = steps.indexOf(step);
    const nextStep = steps[index + 1];

    if (nextStep) {
      set({ step: nextStep });
    }
  },

  back: () => {
    const { step, isManual } = get();

    if (isManual && step === "summary") {
      set({ step: "business" });
      return;
    }

    const index = steps.indexOf(step);
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
      isManual: false,
    })),
}));