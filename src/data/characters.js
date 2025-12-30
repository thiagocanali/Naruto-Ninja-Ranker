import naruto from "../assets/characters/naruto.png";
import sasuke from "../assets/characters/sasuke.png";
import sakura from "../assets/characters/sakura.png";

export const characters = [
  {
    id: 1,
    name: "Naruto Uzumaki",
    clan: "Uzumaki",
    image: naruto,
    elements: ["Vento"],
    stats: {
      ninjutsu: 9,
      taijutsu: 8,
      genjutsu: 5,
      intelligence: 7,
      chakra: 10
    }
  },
  {
    id: 2,
    name: "Sasuke Uchiha",
    clan: "Uchiha",
    image: sasuke,
    elements: ["Fogo", "Relâmpago"],
    stats: {
      ninjutsu: 9,
      taijutsu: 8,
      genjutsu: 7,
      intelligence: 8,
      chakra: 8
    }
  },
  {
    id: 3,
    name: "Sakura Haruno",
    clan: "Haruno",
    image: sakura,
    elements: ["Terra"],
    stats: {
      ninjutsu: 7,
      taijutsu: 6,
      genjutsu: 6,
      intelligence: 9,
      chakra: 7
    }
  }
];
