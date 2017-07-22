<template>
    <div>
        <div class="echarts"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import echarts from 'echarts'
    export default {
        props: ['options'],
        mounted () {
            let chart = echarts.init(this.$el.querySelector('.echarts'))
            chart.setOption(this.options)
        }
    };
</script>

<style>
    .echarts{
        width:100%;
        height:100%;
    }
</style>
