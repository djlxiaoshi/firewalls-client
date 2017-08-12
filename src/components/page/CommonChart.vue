<template>
    <div >
        <div class="echarts"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import echarts from 'echarts'
    import worldMapData from "../../assets/json/world.json"
    export default {
        data () {
            return {
                chart:{}
            }
        },
        props: {
            options: {required: true},
            isMap:{type: Boolean},
            chartWidth: {default: '100%'},
            chartHeight: {default: '350px'}
        },
        mounted () {
            if (this.isMap) {
                echarts.registerMap('china', worldMapData);
            }
            let _el = this.$el.querySelector('.echarts')
            _el.style.width = this.chartWidth
            _el.style.height = this.chartHeight
            this.chart = echarts.init(_el)
            this.chart.setOption(this.options)
        },
        watch: {
            options: {
                handler () {
                    this.chart.setOption(this.options)
                },
                deep: true
            },
        }
    };
</script>

<style>
    .echarts{

    }
</style>
