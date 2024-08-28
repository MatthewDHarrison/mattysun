import { Stat } from "../general";

export const abbreviateStat = (stat: Stat) => {
  switch (stat) {
    case "strength":
      return "STR";
    case "agility":
      return "AGI";
    case "presence":
      return "PRS";
    case "toughness":
      return "TGH";
  }
};
