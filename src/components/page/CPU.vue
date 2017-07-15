<template>
    <div id="cpu-load">
        <el-row>
            <el-col :span="12" class="chart-wrap">
                <div id="cpu0-load-chart"></div>
            </el-col>
            <el-col :span="12" class="chart-wrap">
                <div id="cpu1-load-chart"></div>
            </el-col>

        </el-row>
        <el-row>
            <el-col :span="12" class="chart-wrap">
                <div id="cpu2-load-chart"></div>
            </el-col>
            <el-col :span="12" class="chart-wrap">
                <div id="cpu3-load-chart"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
    import echarts from 'echarts'

    export default {
        data () {
            return {
                cpu0Chart:{},
                cpu1Chart:{},
                cpu2Chart:{},
                cpu3Chart:{},
                cpu0 : {
                    title: {
                        text: 'CPU0负载情况'
                    },
                    tooltip: {},
                    legend: {
                        data:['CPU0']
                    },
                    xAxis: {
                        data: []
                    },
                    yAxis: {
                    },
                    series: [{
                        name: 'CPU0',
                        type: 'line',
                        data: []
                    }]
                },
                cpu1 : {
                    title: {
                        text: 'CPU1负载情况'
                    },
                    tooltip: {},
                    legend: {
                        data:['CPU1']
                    },
                    xAxis: {
                        data: ["00:00","01:00","02:00","03:00","04:00",
                            "05:00","06:00","07:00","08:00","09:00",
                            "10:00","11:00","12:00","13:00","14:00",
                            "15:00","16:00","17:00","18:00","19:00",
                        ]
                    },
                    yAxis: {

                    },
                    series: [{
                        name: 'CPU1',
                        type: 'line',
                        data: [
                            30,10,5,14,13,
                            23,24,45,35,32,
                            14,52,34,56,23,
                            33,24,53,23,44
                        ]
                    }]
                },
                cpu2 : {
                    title: {
                        text: 'CPU2负载情况'
                    },
                    tooltip: {},
                    legend: {
                        data:['CPU2']
                    },
                    xAxis: {
                        data: ["00:00","01:00","02:00","03:00","04:00",
                            "05:00","06:00","07:00","08:00","09:00",
                            "10:00","11:00","12:00","13:00","14:00",
                            "15:00","16:00","17:00","18:00","19:00",
                        ]
                    },
                    yAxis: {

                    },
                    series: [{
                        name: 'CPU2',
                        type: 'line',
                        data: [
                            10,20,5,18,21,
                            27,34,23,44,23,
                            32,42,32,24,23,
                            54,32,23,45,54
                        ]
                    }]
                },
                cpu3 : {
                    title: {
                        text: 'CPU3负载情况'
                    },
                    tooltip: {},
                    legend: {
                        data:['CPU3']
                    },
                    xAxis: {
                        data: ["00:00","01:00","02:00","03:00","04:00",
                            "05:00","06:00","07:00","08:00","09:00",
                            "10:00","11:00","12:00","13:00","14:00",
                            "15:00","16:00","17:00","18:00","19:00",
                        ]
                    },
                    yAxis: {

                    },
                    series: [{
                        name: 'CPU3',
                        type: 'line',
                        data: [
                            15,27,31,13,23,
                            11,34,23,56,46,
                            34,55,32,45,24,
                            56,34,32,56,34
                        ]
                    }]
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
            cpu0Init() {
                this.cpu0Chart = echarts.init(document.getElementById('cpu0-load-chart'));
                this.cpu0Chart.setOption(this.cpu0)
            },
            cpu1Init() {
                this.cpu1Chart = echarts.init(document.getElementById('cpu1-load-chart'));
                this.cpu1Chart.setOption(this.cpu1)
            },
            cpu2Init() {
                this.cpu2Chart = echarts.init(document.getElementById('cpu2-load-chart'));
                this.cpu2Chart.setOption(this.cpu2)
            },
            cpu3Init() {
                this.cpu3Chart = echarts.init(document.getElementById('cpu3-load-chart'));
                this.cpu3Chart.setOption(this.cpu3)
            },
            chartInit () {
                this.cpu0Init();
                this.cpu1Init()
                this.cpu2Init()
                this.cpu3Init()
            }
        },
        mounted() {
            let _this = this;
            this.chartInit();
            var date = [];
            var data = [];
            function addData(shift) {
                var now = new Date();
                now = [now.getHours(), now.getMinutes(), now.getSeconds()].join(':');
                date.push(now);
                _this.$http.get('status/usage').then(res => {
                    if (res.body.code === 0) {
                        console.log(res.body.msg.cpu0)
                        data.push(res.body.msg.cpu0);  // 后台服务器获得

                        if (shift) {
                            date.shift();
                            data.shift();
                        }
                    } else {
                        this.$message.error('未知错误')
                    }
                }, res => {
                    this.$message.error('服务器异常')
                })
            }

            for (var i = 0; i < 20; i++) {
                addData();
            }

            setInterval( () => {
                addData(true);
                this.cpu0Chart.setOption({
                    xAxis: {
                        data:date
                    },
                    series: [{
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
</style>
