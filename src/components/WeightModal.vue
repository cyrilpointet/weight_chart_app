<template>
  <v-dialog v-model="isOpen" width="500" v-if="user">
    <v-card>
      <v-toolbar color="primary" dark>Mon poids</v-toolbar>
      <v-card-text v-if="entry !== null">
        <p class="mt-4 font-weight-bold">Poids: {{ entry.y }} kg</p>
        <p>Date: {{ getDate }}</p>
        <p>Imc: {{ getImc }} ({{ getImcMeaning }})</p>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="error" small @click="deleteEntry">Supprimer</v-btn>
        <v-spacer />
        <v-btn color="primary" small @click="isOpen = false">Fermer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from "moment/src/moment";
import {mapState} from "vuex";

export default {
  name: "WeightModal",
  data: () => ({
    isOpen: false,
    entry: null,
    index: null,
  }),
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
    getDate() {
      return this.entry !== null
        ? moment(this.entry.x).format("DD-YYYY")
        : null;
    },
    getImc() {
      return this.entry !== null
        ? (this.entry.y / this.$store.state.user.height ** 2).toFixed(2)
        : null;
    },
    getImcMeaning() {
      if (this.getImc < 16.5) return "dénutrition";
      if (this.getImc < 18.5) return "maigreur";
      if (this.getImc < 25) return "normal";
      if (this.getImc < 30) return "surpoids";
      if (this.getImc < 35) return "obésité modérée";
      if (this.getImc < 40) return "sévère";
      if (this.getImc >= 40) return "obésité massive";
      return null;
    },
  },
  created() {
    document.addEventListener("showEntry", (evt) => {
      this.index = evt.detail.index;
      this.entry = this.$store.state.weights[evt.detail.index];
      this.isOpen = true;
    });
  },
  methods: {
    deleteEntry() {
      this.isOpen = false;
      this.$store.commit("removeWeight", this.index);
    },
  },
};
</script>
