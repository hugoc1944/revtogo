export type FounderEntry = {
  name: string;
  logo: string;      // file inside /public/found_logos
  color: string;     // hex background
};

export const founderSlots: FounderEntry[] = [
  {
    name: "Alicarius",
    logo: "alicarius_logo.png",
    color: "#222222",
  },

  // Future entries:
  // {
  //   name: "Business X",
  //   logo: "businessx_logo.png",
  //   color: "#111111",
  // },
];
