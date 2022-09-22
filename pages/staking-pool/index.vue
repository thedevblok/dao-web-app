<template>
  <div class="row mx-auto" style="max-width: 750px">
    <div class="col-12 px-4 py-2">
      <card type="default">
        <div class="d-flex align-items-center mb-2">
          <i
            class="tim-icons icon-lock-circle mr-2"
            style="font-size: 1.5rem"
          ></i>
          <h3 class="m-0">AQA locked: {{ formattedTotalQaoLocked }}</h3>
        </div>
      </card>
      <card v-if="nextPeriodWeightData.totalNetworkWeight" type="default">
        <div class="d-flex align-items-center mb-2">
          <i
            class="tim-icons icon-chart-bar-32 mr-2"
            style="font-size: 1.5rem"
          ></i>
          <h3 class="m-0">Total Network Weight: {{ formattedTotalWeight }}</h3>
        </div>
        <p>
          Next payout calculation on
          {{ nextPeriodWeightData.nextPaymentDate | formatDate }}
        </p>
      </card>
      <card v-if="nextPeriodWeightData.totalWeightForAddress" type="default">
        <div class="d-flex align-items-center mb-2">
          <i
            class="tim-icons icon-chart-bar-32 mr-2"
            style="font-size: 1.5rem"
          ></i>
          <h3 class="m-0">Your Weight: {{ formattedTotalWeightForAddress }}</h3>
        </div>
        <div class="d-flex align-items-center mb-2">
          <i
            class="tim-icons icon-chart-pie-36 mr-2"
            style="font-size: 1.5rem"
          ></i>
          <h3 class="m-0">Your Ratio: {{ formattedWeightRatio }} %</h3>
        </div>
      </card>
      <card>
        <h4 class="card-title">
          Percentage of locked AQA for the next 520 weeks based on current
          amount
        </h4>
        <line-chart
          style="height: 100%"
          :chart-data="blueBarChart.chartData"
          :gradient-color="blueBarChart.gradientColors"
          :gradient-stops="blueBarChart.gradientStops"
          :extra-options="blueBarChart.extraOptions"
        >
        </line-chart>
      </card>
    </div>
  </div>
</template>

<script>
import Account from "@/components/Qao/Account";
import BaseAlert from "@/components/BaseAlert";
import { mapGetters } from "vuex";
import Web3Wallet from "@/components/Qao/web3/Web3Wallet";
import Ticker from "@/components/Stats/Ticker";
import LineChart from "~/components/Charts/BarChart";
import formatCryptoAmount from "@/util/utils";
import { DateTime } from "luxon";

export default {
  components: {
    LineChart,
    Web3Wallet,
    Account,
    BaseAlert,
    Ticker,
  },
  async mounted() {
    const periods = await this.$axios.$get("/api/locked-amounts-per-week");
    this.totalAmount = periods[0].currentAmountLocked;
    const amounts = _.map(periods, (period) => period.currentAmountLocked);
    const percents = _.map(amounts, (d) => d / this.totalAmount);

    this.blueBarChart.chartData = {
      ...this.blueBarChart.chartData,
      datasets: [
        {
          ...this.blueBarChart.chartData.datasets[0],
          data: percents,
        },
        {
          ...this.blueBarChart.chartData.datasets[1],
          data: amounts,
        },
      ],
    };
    if (this.account) {
      await this.getNextPeriodTotalWeight();
    }
  },
  computed: {
    formattedTotalQaoLocked() {
      return formatCryptoAmount(this.totalAmount);
    },
    formattedWeightRatio() {
      const ratio =
        (this.nextPeriodWeightData.totalWeightForAddress /
          this.nextPeriodWeightData.totalNetworkWeight) *
        100;
      return ratio.toFixed(2);
    },
    formattedTotalWeight() {
      return formatCryptoAmount(this.nextPeriodWeightData.totalNetworkWeight);
    },
    formattedTotalWeightForAddress() {
      return formatCryptoAmount(
        this.nextPeriodWeightData.totalWeightForAddress
      );
    },
    ...mapGetters({
      account: "getAccount",
    }),
  },
  watch: {
    account() {
      this.getNextPeriodTotalWeight();
    },
  },
  data() {
    return {
      nextPeriodWeightData: {
        totalNetworkWeight: null,
        totalWeightForAddress: null,
        nextPaymentDate: null,
      },
      totalAmount: null,
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
            mode: "index",
            intersect: 0,
            position: "nearest",
            callbacks: {
              label: (tooltipItem, { datasets }) => {
                // const diff = DateTime.now()
                //     .plus({
                //         weeks: tooltipItem.index + 1,
                //     })
                //     .diff(DateTime.now(), [
                //         'years',
                //         'weeks',
                //         'hours',
                //     ])
                //     .toObject();
                // console.log(diff);
                // const { years, weeks } = diff;
                // return `${years}y ${weeks}w`;
                return `${datasets[0].label} ${_.floor(
                  +tooltipItem.value * 100
                )}%`;
              },
            },
          },
          hover: {
            mode: "index",
            intersect: false,
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
                    return value.toLocaleString("en-US", {
                      style: "percent",
                    });
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
                  fontColor: "#9e9e9e",
                  stepSize: 15,
                  suggestedMin: 1,
                  suggestedMax: 520,
                },
              },
            ],
          },
        },
        chartData: {
          labels: [..._.map(_.range(1, 520), (x) => `Week ${x}`)],
          datasets: [
            {
              type: "line",
              label: "Percentage of locked AQA",
              fill: true,
              backgroundColor: "#1f8ef1",
              borderWidth: 0,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [],
            },
            {
              hidden: true,
              showLine: false,
              display: false,
              label: "Locked AQA count",
              data: [],
            },
          ],
        },
      },
    };
  },
  methods: {
    async getNextPeriodTotalWeight() {
      const address = this.account;
      this.nextPeriodWeightData = await this.$axios.$get(
        "/api/get-next-period-total-weight",
        { params: { address } }
      );
      console.log(this.nextPeriodWeightData);
    },
  },
};
</script>

<style></style>
