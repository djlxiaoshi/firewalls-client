<template>
    <div>
        <div class="echarts"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import echarts from 'echarts'
    export default {
        data () {
            return {
                chart:{}
            }
        },
        props: ['options'],
        mounted () {
            this.chart = echarts.init(this.$el.querySelector('.echarts'))
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
        width:100%;
        height:100%;
    }
</style>
