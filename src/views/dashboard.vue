<template>
    <h2>Amount of toys per each labels</h2>
    <DoughnutChart :chartData="toys" />
    <h2>Average price of toy in each labels</h2>
    <DoughnutChart :chartData="toys" />
    <router-link to="/toy/">Back</router-link>
</template>

<script>
import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
    name: 'awsome-chart',
    props:{
        data:Object,
    },
    components: { DoughnutChart },
    created() { this.lala = this.$store.getters.getLabelAcc },
    data(){
    return {
        lala:'',
            testData:{
            labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
            datasets: [
                {
                    data: [30, 40, 60, 70, 5],
                    backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
                },
            ],
    },
        toys: {
            labels : [
                'On wheels',
                'Box game',
                'Art',
                'Baby',
                'Doll',
                'Puzzle',
                'Outdoor',
            ],
            datasets: [
                {
                    data: this.$store.getters.getLabelAcc,

                    backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
                },
            ],
        },
        labelPrice: {
            labels : [
                'On wheels',
                'Box game',
                'Art',
                'Baby',
                'Doll',
                'Puzzle',
                'Outdoor',
            ],
            datasets: [
                {
                    data: this.$store.getters.getPriceTitle,

                    backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
                },
            ],
        },
}
}
,computed:{
    getToys() {
        return this.$store.getters.getLabelAcc
    },
}}
</script>