export const MISSIONS = [
  {
    id: "bandits",
    name: "Eliminar Bandidos",
    description: "Ninjas renegados estão atacando a vila.",
    enemy: {
      name: "Ninja Bandido",
      hp: 120,
      chakra: 60,
      stats: {
        ninjutsu: 30,
        taijutsu: 25,
      },
    },
    reward: {
      xp: 40,
      gold: 30,
    },
  },
  {
    id: "boss-zabuza",
    name: "Zabuza Momochi",
    description: "Um inimigo extremamente perigoso.",
    boss: true,
    enemy: {
      name: "Zabuza",
      hp: 220,
      chakra: 120,
      stats: {
        ninjutsu: 55,
        taijutsu: 50,
      },
    },
    reward: {
      xp: 120,
      gold: 100,
    },
  },
];
