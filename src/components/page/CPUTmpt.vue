<template>
    <div id="cpu-temperature">
        <el-row :gutter="0">
            <el-col :xs="24" :sm="24" :md="24" :lg="12">
                <CommonChart :options="Object.assign(CPU0Config, commonConfig)"></CommonChart>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12">
                <CommonChart :options="Object.assign(CPU1Config, commonConfig)"></CommonChart>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12">
                <CommonChart :options="Object.assign(CPU2Config, commonConfig)"></CommonChart>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12">
                <CommonChart :options="Object.assign(CPU3Config, commonConfig)"></CommonChart>
            </el-col>
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
    import CommonChart from './CommonChart.vue'

    const CONFIG = {
        cpu0: 'CPU0Config',
        cpu1: 'CPU1Config',
        cpu2: 'CPU2Config',
        cpu3: 'CPU3Config'
    }

    export default {
        data () {
            return {
                commonConfig: {
                    xAxis: {
                        data: ['1', '2','3','4','5','6','7','8','9','10']
                    },
                    yAxis: {
                    },
                    tooltip: {
                        formatter: '{a}:{c}',
                    },
                    legend: {
                        data: ['当前温度', '最高温度', '极限温度']
                    },
                },
                CPU0Config: {
                    title: {
                        text: 'CPU0'
                    },
                    series:[{
                        name: '当前温度',
                        type: 'line',
                        data: [],
                    },{
                        name: '最高温度',
                        type: 'line',
                        data: [],
                    },{
                        name: '极限温度',
                        type: 'line',
                        data: [],
                    }]
                },
                CPU1Config: {
                    title: {
                        text: 'CPU1'
                    },
                    tooltip: {
                        formatter: '{a}:{c}'
                    },
                    series:[{
                        name: '当前温度',
                        type: 'line',
                        data: [],
                    },{
                        name: '最高温度',
                        type: 'line',
                        data: [],
                    },{
                        name: '极限温度',
                        type: 'line',
                        data: [],
                    }]
                },
                CPU2Config: {
                    title: {
                        text: 'CPU2'
                    },
                    tooltip: {
                        formatter: '{a}:{c}'
                    },
                    series:[{
                        name: '当前温度',
                        type: 'line',
                        data: [],
                    },{
                        name: '最高温度',
                        type: 'line',
                        data: [],
                    },{
                        name: '极限温度',
                        type: 'line',
                        data: [],
                    }]
                },
                CPU3Config: {
                    title: {
                        text: 'CPU3'
                    },
                    tooltip: {
                        formatter: '{a}:{c}'
                    },
                    series:[{
                        name: '当前温度',
                        type: 'line',
                        data: [],
                    },{
                        name: '最高温度',
                        type: 'line',
                        data: [],
                    },{
                        name: '极限温度',
                        type: 'line',
                        data: [],
                    }]
                },
                timerCount: 0
            }

        },
        components: {
            CommonChart
        },
        methods: {
            getData () {
                this.$http.get('misc_stat/cpu_temperature').then(res => {
                    if (res.body.code === 0) {

                    }
                }, res => {})
            },
            refreshDate(){
                let _now = new Date();
                let _formatNow = [_now.getHours(), _now.getMinutes(), _now.getSeconds()].join(':');
                this.commonConfig.xAxis.data.push(_formatNow)
                if (this.commonConfig.xAxis.data.length >= 10) {
                    this.commonConfig.xAxis.data.shift()
                }
            },
            refreshData(cpuName) {
                this.$http.get('misc_stat/cpu_temperature').then(res => {
                    if (res.body.code === 0) {
                        if(this[CONFIG[cpuName]].series && this[CONFIG[cpuName]].series.length){
                            this[CONFIG[cpuName]].series.forEach((item, index)=> {
                                item.data.push(res.body.msg[cpuName][index])
                                if (item.data.length >= 10) {
                                    item.data.shift()
                                }
                            })
                        }
                    } else {
                        this.$message.error('客户端错误')
                    }
                }, res => {
                    this.$message.error('服务器异常')
                })
            },
            refresh () {
                this.refreshDate()

                this.refreshData('cpu0')
                this.refreshData('cpu1')
                this.refreshData('cpu2')
                this.refreshData('cpu3')
            }
        },
        mounted() {
            this.timerCount = setInterval(() => {
                this.refresh()
            }, 1000)
        },
        destroyed() {
            clearInterval(this.timerCount)
        }
    }
</script>

<style scoped>
    #cpu-temp-chart{
        width:100%;
        height:600px;
    }
</style>
