<template>
    <div id="cpu-load">
        <div id="cpu-load-chart"></div>
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
                        { data: ['CPU0'], left: '20%' },
                        { data: ['CPU1'], right: '20%' },
                        { data: ['CPU2'], left: '20%',top:'50%' },
                        { data: ['CPU3'], right: '20%',top:'50%' }
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
                            name: 'CPU0',
                            type: 'line',
                            xAxisIndex: 0,
                            yAxisIndex: 0,
                            data: [0,1,5,3,6]
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
                this.$http.get('misc_stat/cpu_usage').then(res => {
                    if (res.body.code === 0) {

                    }
                }, res => {})
            },

        },
        mounted() {
            let _this = this;
            let chart = echarts.init(document.getElementById('cpu-load-chart'));
            chart.setOption(this.option)

            let date = [];
            let cpu0Data = [];
            let cpu1Data = []
            let cpu2Data = []
            let cpu3Data = []
            function addData(shift) {
                var now = new Date();
                now = [now.getHours(), now.getMinutes(), now.getSeconds()].join(':');
                date.push(now);
                _this.$http.get('misc_stat/cpu_usage').then(res => {
                    if (res.body.code === 0) {
                        cpu0Data.push(res.body.msg.cpu0);  // 后台服务器获得
                        cpu1Data.push(res.body.msg.cpu1);  // 后台服务器获得
                        cpu2Data.push(res.body.msg.cpu2);  // 后台服务器获得
                        cpu3Data.push(res.body.msg.cpu3);  // 后台服务器获得
                        if (shift) {
                            date.shift();
                            cpu0Data.shift();
                            cpu1Data.shift();
                            cpu2Data.shift();
                            cpu3Data.shift();
                        }
                    } else {
                        _this.$message.error('未知错误')
                    }
                }, res => {
                    _this.$message.error('服务器异常')
                })
            }
            for (var i = 0; i < 20; i++) {
                addData();
            }

            setInterval( () => {
                addData(true);
                chart.setOption({
                    xAxis: [{
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        data:date
                    },{
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        data:date
                    },{
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        data:date
                    },{
                        xAxisIndex: 3,
                        yAxisIndex: 3,
                        data:date
                    }],
                    series: [{
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        data: cpu0Data
                    },{
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        data: cpu1Data
                    },{
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        data: cpu2Data
                    },{
                        xAxisIndex: 3,
                        yAxisIndex: 3,
                        data: cpu3Data
                    }]
                })
            }, 500);
        }
    }
</script>

<style scoped>
    #cpu-load-chart{
        width:100%;
        height:600px;
    }
</style>
