<template>
  <div class="px-2 mt-4">
    <h4>Mes infos</h4>
    <v-form>
      <v-text-field label="Nom" prepend-icon="mdi-account" v-model="name" />
      <v-text-field
        label="Taille en mètre"
        prepend-icon="mdi-human-male-height"
        v-model="height"
        type="number"
      />
    </v-form>
    <div class="d-flex justify-center">
      <v-btn
        color="error"
        :disabled="null === name || null === height"
        @click="isDialogOpen = true"
      >
        tout effacer
      </v-btn>
      <v-spacer />
      <v-btn
        color="accent"
        :disabled="null === name || null === height"
        @click="addUser"
      >
        ok
      </v-btn>
    </div>

    <v-dialog v-model="isDialogOpen" width="500">
      <v-card>
        <v-toolbar color="primary" dark>Supprimer toutes les données</v-toolbar>
        <v-card-text class="pt-4">
          Cela supprimera toutes les données de l'appli, y compris
          l'utilisateur. Cette action est irréversible.
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text color="accent" @click="isDialogOpen = false">Annuler</v-btn>
          <v-btn text color="error" @click="deleteAll">confirmer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "UserForm",
  data: () => ({
    name: null,
    height: null,
    isDialogOpen: false,
  }),
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  created() {
    if (this.user) {
      this.name = this.user.name;
      this.height = this.user.height;
    }
  },
  methods: {
    addUser() {
      this.$store.commit("setUser", {
        name: this.name,
        height: parseFloat(this.height),
      });
    },
    deleteAll() {
      this.name = null;
      this.height = null;
      this.isDialogOpen = false;
      this.$store.commit("clearAll");
    },
  },
};
</script>
