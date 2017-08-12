<template>
    <div id='ip-source'>
        <CommonChart :options="options" :isMap="true" chartHeight="600px"></CommonChart>
    </div>
</template>


<script type="text/ecmascript-6">
import CommonChart from './CommonChart.vue'
import nameMap from "../../assets/json/names.json";
export default {
        data() {
            return {
                options: {
                    title: {
                        text: '访问IP来源地统计',
                        subtext: '',
                        left: 'center',
                        top: 'top'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function (params) {
                            var value = (params.value + '').split('.');
                            value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')
                                + '.' + value[1];
                            return params.seriesName + '<br/>' + nameMap[params.name] + ' : ' + value;
                        }
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',
                        feature: {
                            dataView: {readOnly: false},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    visualMap: {
                        min: 0,
                        max: 100000,
                        text:['High','Low'],
                        realtime: false,
                        calculable: true,
                        inRange: {
                            color: ['lightskyblue','yellow', 'orangered']
                        }
                    },
                    series: {
                        type: 'map',
                        map: 'china',
                        name: 'IP来源数据',
                        data: []
                    }
                }
            }
        },
        methods: {
            getData () {
                return this.$http.get('access/statistic').then(res => {
                    if (res.body.code === 0) {
                        let _showData = res.body.msg.map(item => {
                            return {name: item.country, value: item.num}
                        })
                        this.options.series.data = _showData
                    }
                }, res => {})
            }
        },
        mounted(){
            this.getData()
        },
        components: {
            CommonChart
        }
    };
</script>

<style>
    #ip-source{
        width:100%;
        height: 100%;
    }
</style>
