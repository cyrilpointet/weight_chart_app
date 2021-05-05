<template>
  <div class="px-8 mt-4 d-flex justify-end">
    <v-btn fab @click="isOpen = true" color="primary">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="isOpen" width="500" v-if="user">
      <v-card>
        <v-toolbar color="primary" dark>Nouvelle pesée</v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              label="poids"
              prepend-icon="mdi-weight-kilogram"
              v-model="weight"
              type="number"
            />
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker v-model="date" scrollable locale="fr">
                <v-spacer />
                <v-btn text color="primary" @click="modal = false">
                  Annuler
                </v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-form>
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn @click="isOpen = false" text>Annuler</v-btn>
          <v-btn
            text
            color="accent"
            :disabled="null === weight || null === date"
            @click="addWeight"
          >
            Ajouter
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment/src/moment";
import { mapState } from "vuex";

export default {
  name: "WeightForm",
  data: () => {
    return {
      isOpen: false,
      weight: null,
      date: null,
      modal: false,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  methods: {
    addWeight() {
      this.$store.commit("addWeight", {
        date: moment(this.date).format("YYYY-MM-DD"),
        weight: parseFloat(this.weight),
      });
      this.isOpen = false;
    },
  },
};
</script>
