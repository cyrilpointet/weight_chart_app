import Vue from "vue";
import Vuex from "vuex";
import moment from "moment/src/moment";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user:
      null !== localStorage.getItem("myWeights")
        ? JSON.parse(localStorage.getItem("myWeights")).user
        : null,
    weights:
      null !== localStorage.getItem("myWeights")
        ? JSON.parse(localStorage.getItem("myWeights")).weights
        : [],
  },
  mutations: {
    setUser(state, value) {
      state.user = {
        name: value.name,
        height: value.height,
      };
      localStorage.setItem(
        "myWeights",
        JSON.stringify({
          weights: state.weights,
          user: state.user,
        })
      );
    },
    addWeight(state, value) {
      const weights = state.weights;
      weights.push({
        x: value.date,
        y: value.weight,
      });
      weights.sort((a, b) => moment(a.x) - moment(b.x));
      state.weights = weights;
      localStorage.setItem(
        "myWeights",
        JSON.stringify({
          weights: state.weights,
          user: state.user,
        })
      );
      document.dispatchEvent(new CustomEvent("weightUpdated"));
    },
    removeWeight(state, index) {
      state.weights.splice(index, 1);
      localStorage.setItem(
        "myWeights",
        JSON.stringify({
          weights: state.weights,
          user: state.user,
        })
      );
      document.dispatchEvent(new CustomEvent("weightUpdated"));
    },
    clearAll(state) {
      state.user = null;
      state.weights = [];
      localStorage.clear();
    },
  },
  actions: {},
  modules: {},
});
