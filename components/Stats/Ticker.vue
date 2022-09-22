<template>
  <card>
    <div class="card-body">
      <div class="row d-flex justify-content-between">
        <div class="d-flex">
          <div class="d-flex flex-column justify-content-center mr-2">
            <img class="ticker-icon" src="/_nuxt/assets/images/qao-white.png" />
          </div>
          <div class="d-flex flex-column justify-content-center">
            <h3 class="mb-1">Aqifi</h3>
            <p class="card-subtitle">Aqifi/USD</p>
          </div>
        </div>
        <div class="d-flex flex-column align-items-end">
          <!-- remove hardcoded values -->
          <p class="m-0"><small>24h</small></p>
          <h4 class="m-0">$0.00001143</h4>
          <p :class="{ [-1.08 < 0 ? 'text-danger' : 'text-success']: true }">
            -1.08%
          </p>
        </div>
      </div>
      <div class="row">
        <div class="w-100 mb-2">
          <line-chart
            style="height: 100px"
            :chart-data="purpleLineChart.chartData"
            :gradient-color="purpleLineChart.gradientColors"
            :gradient-stops="purpleLineChart.gradientStops"
            :extra-options="purpleLineChart.extraOptions"
          >
          </line-chart>
        </div>
      </div>
      <div class="row">
        <div class="col-3">
          <ticker-metric
            label="Week"
            :value="-6.23"
            format="percentage"
            is-colored
          />
        </div>
        <div class="col-3">
          <ticker-metric
            label="Month"
            :value="49.32"
            format="percentage"
            is-colored
          />
        </div>
        <div class="col-3">
          <ticker-metric
            label="Year"
            :value="25318.97"
            format="percentage"
            is-colored
          />
        </div>
        <div class="col-3">
          <ticker-metric label="Rank" :value="737" format="rank" />
        </div>
      </div>
      <div class="row">
        <div class="col-3">
          <ticker-metric label="Transp. Vol." :value="13600" format="money" />
        </div>
        <div class="col-3">
          <ticker-metric label="Volume" :value="13600" format="money" />
        </div>
        <div class="col-3">
          <ticker-metric label="ATH" :value="70" format="percentage" />
        </div>
        <div class="col-3">
          <ticker-metric label="Mkt Cap" :value="11000000" format="money" />
        </div>
      </div>
    </div>
  </card>
</template>
<script>
import TickerMetric from "@/components/Stats/TickerMetric";
import LineChart from "@/components/Charts/LineChart";
import { DateTime } from "luxon";
import * as _ from "lodash";

const createFakeSeries = () => {
  return _.map(_.range(-24, 0), (offset) => {
    return {
      //x: DateTime.now().minus({hours: offset}),
      x: offset,
      y: _.random(0.00001, 0.00002),
    };
  });
};

export default {
  components: {
    TickerMetric,
    LineChart,
  },
  data() {
    return {
      purpleLineChart: {
        extraOptions: {
          layout: {
            padding: 5,
          },
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
                barPercentage: 1.6,
                gridLines: {
                  drawBorder: false,
                  color: "rgba(29,140,248,0.0)",
                  zeroLineColor: "transparent",
                },
                ticks: {
                  display: false,
                },
              },
            ],

            xAxes: [
              {
                //labels: ['24 hours ago', '-18h', '-12h', '-6h', 'now'],
                labels: [..._.map(_.range(-24, -1), (v, i) => v + "h"), "now"],
                barPercentage: 1.6,
                position: "top",
                font: {
                  size: 12,
                },
                gridLines: {
                  drawBorder: false,
                  color: "rgba(220,53,69,0.1)",
                  zeroLineColor: "transparent",
                },
                ticks: {
                  padding: 10,
                  fontColor: "rgba(255, 255, 255, 0.6)",
                  precision: 0,
                  maxTicksLimit: 5,
                  ticks: ["-24h"],
                  beginAtZero: true,
                  bounds: "ticks",
                },
              },
            ],
          },
        },
        chartData: {
          padding: "10px",
          datasets: [
            {
              label: "Price",
              fill: true,
              borderColor: "#d048b6",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#d048b6",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#d048b6",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: createFakeSeries(),
            },
          ],
        },
      },
    };
  },
};
</script>
<style>
.ticker-icon {
  width: 36px;
  height: 36px;
}
</style>
