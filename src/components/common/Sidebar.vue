<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: '1',
                        title: '管理配置',
                        subs: [
                            {
                                index: '/dhcp',
                                title: 'DHCP配置'
                            },
                            {
                                index: '/dns',
                                title: 'DNS配置'
                            },
                            {
                                index: '/firewalls',
                                title: '防火墙配置'
                            },
                            {
                                index: '/rules',
                                title: '规则配置'
                            },
                            {
                                index: '/vpn',
                                title: 'VPN配置'
                            },
                            {
                                index: '/user',
                                title: '用户配置'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '2',
                        title: '状态显示',
                        subs: [
                            {
                                index: '/cpu',
                                title: 'CPU状态'
                            },
                            {
                                index: '/flow',
                                title: '网络流量情况'
                            },
                            {
                                index: '/time',
                                title: '认证访问实时列表'
                            },
                            {
                                index: '/visit',
                                title: '端口访问量统计'
                            },
                            {
                                index: '/source',
                                title: '访问IP来源地统计'
                            }
                        ]
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
