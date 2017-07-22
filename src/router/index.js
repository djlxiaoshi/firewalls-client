import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/common/Home.vue';
import DHCP from '../components/page/DHCP.vue';
import DNS from '../components/page/DNS.vue';
import Firewalls from '../components/page/Firewalls.vue';
import RulesConfig from '../components/page/RulesConfig.vue';
import VPN from '../components/page/VPN.vue';
import User from '../components/page/User.vue';

// 状态显示
import CPU from '../components/page/CPU.vue';
import CPUTmpt from '../components/page/CPUTmpt.vue';
import NetworkFlow from '../components/page/NetworkFlow.vue';
import AccessList from '../components/page/AccessList.vue';
import IpSource from '../components/page/IpSource.vue';

// echarts 测试
import EchartTest from '../components/page/EchartTest.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: Home,
            children: [{
                path: '/dhcp',
                component: DHCP
            },{
                path: '/dns',
                component: DNS
            },{
                path: '/firewalls',
                component: Firewalls
            },{
                path: '/rules',
                component: RulesConfig
            },{
                path: '/vpn',
                component: VPN
            },{
                path: '/user',
                component: User
            },{
                path: '/cpu',
                component: CPU
            },{
                path: '/temperature',
                component: CPUTmpt
            },{
                path: '/flow',
                component: NetworkFlow
            },{
                path: '/access-list',
                component: AccessList
            },{
                path: '/ip-source',
                component: IpSource
            },{
                path: '/echarts-test',
                component: EchartTest
            }]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
