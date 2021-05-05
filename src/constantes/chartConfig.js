export const CHART_CONFIG = {
  type: "line",
  data: {
    datasets: [
      {
        label: "Kg",
        borderColor: "#326642",
      },
    ],
  },
  options: {
    events: [],
    aspectRatio: 1.25,
    locale: "fr-FR",
    plugins: {
      zoom: {
        zoom: {
          enabled: true,
          mode: "x",
        },
        pan: {
          enabled: true,
          mode: "x",
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "month",
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  },
};
