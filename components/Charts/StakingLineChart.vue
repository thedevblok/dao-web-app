<template>
  <line-chart
    style="height: 100%"
    :chart-data="blueBarChart.chartData"
    :extra-options="blueBarChart.extraOptions"
  >
  </line-chart>
</template>

<script>
export default {
  data() {
    return {
      blueBarChart: {
        extraOptions: {
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          responsive: true,
          tooltips: {
            backgroundColor: "#f5f5f5",
            titleFontColor: "#333",
            bodyFontColor: "#666",
            bodySpacing: 4,
            xPadding: 12,
            mode: "nearest",
            intersect: 0,
            position: "nearest",
          },
          scales: {
            yAxes: [
              {
                gridLines: {
                  drawBorder: false,
                  color: "rgba(29,140,248,0.1)",
                  zeroLineColor: "transparent",
                },
                ticks: {
                  suggestedMin: 0,
                  suggestedMax: 1,
                  padding: 20,
                  fontColor: "#9e9e9e",
                  callback: function (value) {
                    return value.toLocaleString("en-US", { style: "percent" });
                  },
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  drawBorder: false,
                  color: "rgba(29,140,248,0.1)",
                  zeroLineColor: "transparent",
                },
                ticks: {
                  //padding: 20,
                  fontColor: "#9e9e9e",
                  stepSize: 15,
                },
              },
            ],
          },
        },
        chartData: {
          labels: [..._.map(_.range(1, 521), (x) => x + "w")],
          datasets: [
            {
              label: "Locked AQAs",
              fill: true,
              backgroundColor: "#1f8ef1",
              //borderColor: '#1f8ef1',
              borderWidth: 0,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [],
            },
          ],
        },
      },
    };
  },
};
</script>
