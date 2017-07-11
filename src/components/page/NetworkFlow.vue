<template>
    <div id='network-flow'>
        <el-button :plain="true" type="success" @click="toggleData" v-text="showFlag ? '接收速度' : '发送速度'"></el-button>
        <ECharts :options="myData" class="echarts"></ECharts>
    </div>
</template>

<script type="text/ecmascript-6">
    import 'echarts'
    import ECharts from 'vue-echarts/components/ECharts.vue'
    export default {
        data () {
            return {
                showFlag:true,
                myData : {
                    title: {
                        text: '网络流量'
                    },
                    tooltip: {},
                    legend: {
                        data:['CPU0','CPU1','CPU2','CPU3']
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
                        name: 'CPU0',
                        type: 'line',
                        data: [
                            5,20,36,10,10,
                            20,21,30,32,34,
                            40,20,30,50,40,
                            30,32,42,13,22
                        ]
                    },{
                        name: 'CPU1',
                        type: 'line',
                        data: [
                            30,10,5,14,13,
                            23,24,45,35,32,
                            14,52,34,56,23,
                            33,24,53,23,44
                        ]
                    },{
                        name: 'CPU2',
                        type: 'line',
                        data: [
                            10,20,5,18,21,
                            27,34,23,44,23,
                            32,42,32,24,23,
                            54,32,23,45,54
                        ]
                    },{
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
                this.$http.get('misc_stat/iface_speed').then(res => {
                    if (res.body.code === 0) {

                    }
                }, res => {})
            },
            toggleData () {
                this.toggleText()
                this.showFlag ? this.getRecieveData() : this.getSendData()
            },
            toggleText () {
                this.showFlag = !this.showFlag
            },
            getSendData () {
                this.myData.series = [{
                    name: 'CPU3',
                    type: 'line',
                    data: [
                        15,27,31,13,23,
                        34,55,32,45,24,
                        33,24,53,23,44,
                        56,34,32,56,34
                    ]
                },{
                    name: 'CPU1',
                    type: 'line',
                    data: [
                        30,10,5,14,13,
                        40,20,30,50,40,
                        14,52,34,56,23,
                        11,34,23,56,46,
                    ]
                },{
                    name: 'CPU2',
                    type: 'line',
                    data: [
                        10,20,5,18,21,
                        27,34,23,44,23,
                        5,20,36,10,10,
                        54,32,23,45,54
                    ]
                },{
                    name: 'CPU0',
                    type: 'line',
                    data: [
                        32,42,32,24,23,
                        20,21,30,32,34,
                        23,24,45,35,32,
                        30,32,42,13,22
                    ]
                }]
            },
            getRecieveData () {
                this.myData.series = [{
                    name: 'CPU0',
                    type: 'line',
                    data: [
                        5,20,36,10,10,
                        20,21,30,32,34,
                        40,20,30,50,40,
                        30,32,42,13,22
                    ]
                },{
                    name: 'CPU1',
                    type: 'line',
                    data: [
                        30,10,5,14,13,
                        23,24,45,35,32,
                        14,52,34,56,23,
                        33,24,53,23,44
                    ]
                },{
                    name: 'CPU2',
                    type: 'line',
                    data: [
                        10,20,5,18,21,
                        27,34,23,44,23,
                        32,42,32,24,23,
                        54,32,23,45,54
                    ]
                },{
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
        },
        created () {},
        components: {
            ECharts
        }
    };
</script>

<style>
    .echarts {
        width:100%;
        height: 600px;
    }
</style>
