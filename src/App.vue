<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Mon poids</v-toolbar-title>
      <v-spacer />
      <transition name="rotate" mode="out-in">
        <v-btn
          icon
          outlined
          v-if="user && !showAccount"
          @click="showAccount = true"
          key="account-btn"
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-btn
          icon
          outlined
          v-if="user && showAccount"
          @click="showAccount = false"
          key="chart-btn"
        >
          <v-icon>mdi-chart-line</v-icon>
        </v-btn>
      </transition>
    </v-app-bar>

    <v-main>
      <div class="main">
        <transition name="fade" mode="out-in">
          <div v-if="user && !showAccount" key="graph">
            <Graph />
            <WeightForm />
          </div>
          <div v-if="!user || showAccount" key="account">
            <UserForm />
          </div>
        </transition>
      </div>
    </v-main>
    <WeightModal />
  </v-app>
</template>

<script>
import Graph from "./components/Graph";
import WeightForm from "./components/WeightForm";
import WeightModal from "./components/WeightModal";
import UserForm from "./components/UserForm";
import { mapState } from "vuex";

export default {
  name: "App",

  components: {
    Graph,
    WeightForm,
    WeightModal,
    UserForm,
  },
  data: () => ({
    showAccount: false,
  }),
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
};
</script>

<style>
.main {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.2s;
}
.rotate-enter,
.rotate-leave-to {
  transform: scaleX(0);
}
</style>
