import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/common/Home.vue';
import DHCP from '../components/page/DHCP.vue';
import DNS from '../components/page/DNS.vue';
import Firewalls from '../components/page/Firewalls.vue';
import RulesConfig from '../components/page/RulesConfig.vue';
import VPN from '../components/page/VPN.vue';
import User from '../components/page/User.vue';
import CPU from '../components/page/CPU.vue';

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
            }]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
