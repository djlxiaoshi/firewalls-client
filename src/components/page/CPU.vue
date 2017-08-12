<template>
    <div id="cpu-load">
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

        <el-button type="success" @click="change">成功按钮</el-button>
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
                        data: [],
                    },
                    yAxis: {},
                    tooltip: {
                        formatter: '{a}:{c}',
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 10
                    }
                },
                CPU0Config: {
                    title: {
                        text: 'CPU0'
                    },
                    legend: {
                        data: ['CPU0']
                    },
                    tooltip: {
                        formatter: '{a}:{c}'
                    },
                    series: {
                        name: 'CPU0',
                        type: 'line',
                        data: []
                    }
                },
                CPU1Config: {
                    title: {
                        text: 'CPU1'
                    },
                    legend: {
                        data: ['CPU1']
                    },
                    tooltip: {
                        formatter: '{a}:{c}'
                    },
                    series: {
                        name: 'CPU1',
                        type: 'line',
                        data: []
                    }
                },
                CPU2Config: {
                    title: {
                        text: 'CPU2'
                    },
                    legend: {
                        data: ['CPU2']
                    },
                    tooltip: {
                        formatter: '{a}:{c}'
                    },
                    series: {
                        name: 'CPU2',
                        type: 'line',
                        data: []
                    }
                },
                CPU3Config: {
                    title: {
                        text: 'CPU3'
                    },
                    legend: {
                        data: ['CPU3']
                    },
                    tooltip: {
                        formatter: '{a}:{c}'
                    },
                    series: {
                        name: 'CPU3',
                        type: 'line',
                        data: []
                    }
                },
                timerCount: 0
            }
        },
        components: {
            CommonChart
        },
        methods: {
            getData () {
                return this.$http.get('misc_stat/cpu_usage').then(res => {
                    if (res.body.code === 0) {

                    }
                }, res => {})
            },
            change(){
                this.CPU0Config.title = {
                    text: '测试'
                }
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
                this.$http.get('misc_stat/cpu_usage').then(res => {
                    if (res.body.code === 0) {
                        this[CONFIG[cpuName]].series.data.push(res.body.msg[cpuName])
                        if (this[CONFIG[cpuName]].series.data.length >= 10) {
                            this[CONFIG[cpuName]].series.data.shift()
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
            this.timerCount = setInterval( () => {
                this.refresh()
            }, 1000);
        },
        destroyed() {
            clearInterval(this.timerCount)
        }
    }
</script>

<style scoped>

</style>
