<template>
    <div id="cpu-temperature">
        <div id="cpu-temp-chart"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import echarts from 'echarts'

    export default {
        data () {
            return {
                option : {
                    title: [
                        { text: 'CPU0', left: '0%', top: 0 },
                        { text: 'CPU1', left: '50%', top: 0 },
                        { text: 'CPU2', left: '0%', top: '50%' },
                        { text: 'CPU3', left:'50%', top:'50%' }
                        ],
                    legend:[
                        { data: ['当前温度', '最高温度', '极限温度'], left: '20%' },
                        { data: ['当前温度', '最高温度', '极限温度'], right: '20%' },
                        { data: ['当前温度', '最高温度', '极限温度'], left: '20%',top:'50%' },
                        { data: ['当前温度', '最高温度', '极限温度'], right: '20%',top:'50%' }
                    ],
                    grid: [
                        {x: '2%', y: '7%', width: '45%', height: '38%'},
                        {x2: '2%', y: '7%', width: '45%', height: '38%'},
                        {x: '2%', y2: '7%', width: '45%', height: '38%'},
                        {x2: '2%', y2: '7%', width: '45%', height: '38%'}
                    ],
                    xAxis: [
                        { data: ["00:00","01:00","02:00","03:00","04:00"],gridIndex: 0},
                        { data: ["00:00","01:00","02:00","03:00","04:00"],gridIndex: 1},
                        { data: ["00:00","01:00","02:00","03:00","04:00"],gridIndex: 2},
                        { data: ["00:00","01:00","02:00","03:00","04:00"],gridIndex: 3},
                    ],
                    yAxis: [
                        { gridIndex: 0},
                        { gridIndex: 1},
                        { gridIndex: 2},
                        { gridIndex: 3},
                    ],
                    tooltip: {
                        formatter: '{a}:{c}'
                    },
                    series: [
                        {
                            name: '当前温度',
                            type: 'line',
                            xAxisIndex: 0,
                            yAxisIndex: 0,
                            data: [
                                {value: 7, name: '当前温度', tooltip: {show:true}},
                                {value: 13, name: '当前温度'},
                                {value: 5, name: '当前温度'},
                                {value: 20, name: '当前温度'},
                            ]
                        },
                        {
                            name: '最高温度',
                            type: 'line',
                            xAxisIndex: 0,
                            yAxisIndex: 0,
                            data: [
                                15,15,15,15,15,
                                15,15,15,15,15,
                                15,15,15,15,15,
                                15,15,15,15,15
                            ]
                        },
                        {
                            name: '极限温度',
                            type: 'line',
                            xAxisIndex: 0,
                            yAxisIndex: 0,
                            data: [
                                25,25,25,25,25,
                                25,25,25,25,25,
                                25,25,25,25,25,
                                25,25,25,25,25
                            ]
                        },
                        {
                            name: 'CPU1',
                            type: 'line',
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            data: [0,1,5,3,6]
                        },
                        {
                            name: 'CPU2',
                            type: 'line',
                            xAxisIndex: 2,
                            yAxisIndex: 2,
                            data: [0,1,5,3,6]
                        },
                        {
                            name: 'CPU3',
                            type: 'line',
                            xAxisIndex: 3,
                            yAxisIndex: 3,
                            data: [0,1,5,3,6]
                        }
                    ]
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
        mounted() {
            let chart = echarts.init(document.getElementById('cpu-temp-chart'));
            chart.setOption(this.option)


            var date = [];
            var data = [];
            function addData(shift) {
                var now = new Date();
                now = [now.getHours(), now.getMinutes(), now.getSeconds()].join(':');
                date.push(now);
                data.push((Math.random()) * 50);  // 后台服务器获得

                if (shift) {
                    date.shift();
                    data.shift();
                }
            }

            for (var i = 1; i < 21; i++) {
                addData();
            }

            setInterval( () => {
                addData(true);
                chart.setOption({
                    xAxis: [{
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        data:date
                    }],
                    series: [{
                        name: '当前温度',
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        data: data
                    }]
                })
            }, 10000);
        }
    }
</script>

<style scoped>
    #cpu0-load-chart,#cpu1-load-chart,#cpu2-load-chart,#cpu3-load-chart {
        width:90%;
        height: 400px;
    }
    .chart-wrap{
        overflow: auto;
    }

    #cpu-temp-chart{
        width:100%;
        height:600px;
    }
</style>
