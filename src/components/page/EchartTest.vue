<template>
    <div id=''>
        <CommonChart :options="options"></CommonChart>
    </div>
</template>

<script type="text/ecmascript-6">
    import echarts from 'echarts';
    import CommonChart from './CommonChart.vue'
    export default {
        data() {
            return {
                options:{
                    title: { text: 'ECharts 入门示例' },
                    tooltip: {},
                    xAxis: {
                        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                }
            }
        },
        components: {
            CommonChart
        }
    };
</script>

<style>
    #main{
        height:600px;
    }
</style>
