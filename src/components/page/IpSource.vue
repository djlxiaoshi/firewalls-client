<template>
    <div id='ip-source'>
        访问IP来源地统计
    </div>
</template>

<script type="text/ecmascript-6">
    import 'echarts'
    import ECharts from 'vue-echarts/components/ECharts.vue'
    import dataJson from '../../common/json/world.json'
    export default {
        data() {
            return {
                myData : {
                    title: {
                        text: '网络流量'
                    },
                    tooltip: {},
                    series: [{

                    }]
                }
            }
        },
        components: {
            ECharts
        }
    };
</script>

<style>
</style>
