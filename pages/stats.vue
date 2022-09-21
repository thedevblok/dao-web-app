<template>
    <div>
        <div class="row mx-auto" style="max-width: 750px">
            <div class="col-12 px-4 py-2 mb-4">
                <div
                    class="nomics-ticker-widget mb-4"
                    data-name="QAO"
                    data-base="QAO"
                    data-quote="USD"
                ></div>
                <script src="https://widget.nomics.com/embed.js"></script>
                <!-- Component to be used when we have the api call
        <br/><br/>
        <ticker/>-->
            </div>
            <div class="col-12 px-4 py-2">
                <base-alert v-if="atLeastOneConnectedAccount" type="default">
                    <div class="d-flex align-items-center mb-2">
                        <i
                            class="tim-icons icon-alert-circle-exc mr-2"
                            style="font-size: 1.5rem"
                        ></i>
                        <h3 class="m-0">No wallet connected</h3>
                    </div>
                    <p>
                        You must connect your wallet in order to see statistics
                        related to you wallet. The connect button is on the top
                        bar of the page.
                    </p>
                </base-alert>
                <account v-else />
            </div>
        </div>
    </div>
</template>

<script>
import Account from '@/components/Qao/Account';
import BaseAlert from '@/components/BaseAlert';
import { mapGetters } from 'vuex';
import Web3Wallet from '@/components/Qao/web3/Web3Wallet';
import Ticker from '@/components/Stats/Ticker';
import LineChart from '~/components/Charts/BarChart';
import axios from 'axios';

export default {
    components: {
        Web3Wallet,
        Account,
        BaseAlert,
        Ticker,
    },
    mounted() {
        console.log('mounted');
        console.log(this.blueBarChart.chartData);
        // this.blueBarChart.chartData.datasets[0].data = ;
    },
    computed: {
        ...mapGetters({
            atLeastOneConnectedAccount: 'atLeastOneConnectedAccount',
            providerName: 'getProviderName',
        }),
    },
};
</script>

<style>
.nomics-ticker-widget-embedded::after {
    content: '';
    background-size: 37px 37px;
    background-image: url('@/assets/images/qao-white.png');
    filter: invert(1);
    z-index: 1;
    width: 37px;
    height: 37px;
    background-color: #000;
    position: absolute;
    top: 29px;
    left: 18px;
}
</style>
