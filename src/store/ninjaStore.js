// src/store/ninjaStore.js
import { defineStore } from "pinia";

export const useNinjaStore = defineStore("ninjaStore", {
  state: () => ({
    ninjas: [],
    team: [],
    loading: false,
    error: null,
  }),

  getters: {
    // Calcula o poder total do time
    teamPower(state) {
      return state.team.reduce((sum, ninja) => sum + this.ninjaPower(ninja), 0);
    },
  },

  actions: {
    // Função para calcular o poder do ninja
    ninjaPower(ninja) {
      // Fórmula simples: nível * 10 + bônus de XP
      return ninja.level * 10 + (ninja.xp * 0.5); // Exemplo de cálculo
    },

    // Função para buscar os ninjas da API
    async fetchNinjas(page = 1) {
      this.loading = true;
      this.error = null;
      try {
        const res = await fetch(`https://dattebayo-api.onrender.com/characters?page=${page}`);
        const data = await res.json();

        // Mapeando os dados da API para um formato adequado
        this.ninjas = data.characters.map((ninja) => ({
          id: ninja.id,
          name: ninja.name,
          image: ninja.images?.[0] || "",  // Pegando a primeira imagem
          rank: ninja.rank || "Genin",      // Default "Genin" caso não tenha rank
          level: 1,                         // Atribuindo um level inicial
          xp: 0,                            // XP inicial
        }));
      } catch (err) {
        this.error = "Erro ao carregar ninjas: " + err.message;
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    // Função para adicionar ninja ao time
    addToTeam(ninja) {
      if (this.team.length < 3 && !this.team.some((member) => member.id === ninja.id)) {
        this.team.push(ninja);
      }
    },

    // Função para remover ninja do time
    removeFromTeam(ninja) {
      this.team = this.team.filter((member) => member.id !== ninja.id);
    },
  },
});
