<template>
    <div id="">
        <ECharts :options="myData"></ECharts>
    </div>
</template>

<script type="text/ecmascript-6">
    import 'echarts'
    import ECharts from 'vue-echarts/components/ECharts.vue'

    export default {
        data () {
            return {
                myData : {
                    title: {
                        text: 'CPU负载情况'
                    },
                    tooltip: {},
                    legend: {
                        data:['CPU0','CPU1','CPU2','CPU3']
                    },
                    xAxis: {
                        data: ["12:00","01:00","02:00","03:00","04:00","05:00"]
                    },
                    yAxis: {

                    },
                    series: [{
                        name: 'CPU0',
                        type: 'line',
                        data: [5, 20, 36, 10, 10, 20]
                    },{
                        name: 'CPU1',
                        type: 'line',
                        data: [30, 10, 5, 14, 13, 23]
                    },{
                        name: 'CPU2',
                        type: 'line',
                        data: [10, 20, 5, 18, 21, 27]
                    },{
                        name: 'CPU3',
                        type: 'line',
                        data: [15, 27, 31, 13, 23, 11]
                    }]
                }
            }

        },
        methods: {
            getData () {
                this.$http.get('misc_stat/cpu_temperature').then(res => {
                    if (res.body.code === 0) {

                    }
                }, res => {})
            }
        },
        created () {

        },
        components: {
            ECharts
        }
    }
</script>

<style scoped>
    .echarts {
        height: 300px;
    }
</style>
