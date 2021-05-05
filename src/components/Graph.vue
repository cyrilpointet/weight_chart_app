<template>
  <div>
    <h1 class="text-center">Mon poids</h1>
    <canvas id="myChart" style="height: 45vh"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-moment";
import zoomPlugin from "chartjs-plugin-zoom";
import { CHART_CONFIG } from "../constantes/chartConfig";

Chart.register(...registerables, zoomPlugin);

export default {
  name: "Graph",
  data: () => {
    return {
      myChart: null,
    };
  },
  mounted() {
    this.init(this.$store.state.weights);
    document.addEventListener("weightUpdated", () => {
      this.myChart.data.datasets[0].data = this.$store.state.weights;
      this.myChart.update();
    });
    document.getElementById("myChart").addEventListener("click", (event) => {
      this.clickHandler(event);
    });
  },
  methods: {
    init() {
      if (this.myChart) {
        this.myChart.destroy();
      }
      const config = JSON.parse(JSON.stringify(CHART_CONFIG));
      config.data.datasets[0].data = this.$store.state.weights;
      this.myChart = new Chart(document.getElementById("myChart"), config);
    },
    clickHandler(evt) {
      const points = this.myChart.getElementsAtEventForMode(
        evt,
        "nearest",
        { intersect: true },
        true
      );

      if (points.length) {
        const firstPoint = points[0];
        const event = new CustomEvent("showEntry", {
          detail: {
            index: firstPoint.index
          },
        });
        document.dispatchEvent(event);
      }
    },
  },
};
</script>
