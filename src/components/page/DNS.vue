<template>
    <div id="dns">
        <el-form  class="demo-form-inline" label-position="left" label-width="120px">
            <el-form-item label="默认DNS服务器">
                <el-input v-model="msg.forwarders[0]" :disabled="fwd_0_dis">
                    <template slot="append">
                        <a href="javascript:void(0)" @click="editFwd_0">{{fwd_0_dis ? '修改' : '保存'}}</a>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item >
                <el-input v-model="msg.forwarders[1]" :disabled="fwd_1_dis">
                    <template slot="append">
                        <a href="javascript:void(0)" @click="editFwd_1">{{fwd_1_dis ? '修改' : '保存'}}</a>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="本地域名">
                <el-input v-model="msg.domain_maps.domain" placeholder="本地域名" :disabled="domian_dis">
                    <template slot="append">
                        <a href="javascript:void(0)" @click="editDomain">{{domian_dis ? '修改' : '保存'}}</a>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="IP">
                <el-input v-model="msg.domain_maps.ip" placeholder="IP地址" :disabled="ip_dis">
                    <template slot="append">
                        <a href="javascript:void(0)" @click="editIp">{{ip_dis ? '修改' : '保存'}}</a>
                    </template>
                </el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {
                fwd_0_dis: true,
                fwd_1_dis: true,
                domian_dis: true,
                ip_dis: true,
                msg:{
                    forwarders: ['114.114.114.114', '8.8.8.8'],
                    domain_maps: {
                        domain: 'server.test.com',
                        ip: '192.168.90.1'
                    }
                }

            }
        },
        created () {
            this.$http.get('dns/get').then(res => {
                if (res.body.code === 0) {
                    this.msg = res.body.msg
                }
            }, res => {
                this.$message.error('服务器异常')
            })
        },
        methods: {
            editFwd_0 () {
                if (!this.fwd_0_dis) {
                    let _forwarders = this.msg.forwarders
                    this.sendReq({forwarders: _forwarders})
                }
                this.fwd_0_dis = !this.fwd_0_dis
            },
            editFwd_1 () {
                if (!this.fwd_1_dis) {
                    let _forwarders = this.msg.forwarders
                    this.sendReq({forwarders: _forwarders})
                }
                this.fwd_1_dis = !this.fwd_1_dis
            },
            sendReq (params) {
                // 保存
                this.$http.post('dns/modify', params).then(res => {
                    if (res.body.code === 0) {
                        this.$message.success('修改成功')
                    } else {
                        this.$message.error('其他错误')
                    }
                }, res => {
                    this.$message.error('服务器异常')
                })
            },
            editDomain () {
                if (!this.domian_dis) {
                     let _domain_maps = {}
                     _domain_maps.domain = this.msg.domain_maps.domain
                     _domain_maps.ip = this.msg.domain_maps.ip

                     this.sendReq({domain_maps: _domain_maps})
                }
                this.domian_dis = !this.domian_dis
            },
            editIp () {
                if (!this.ip_dis) {
                    let _domain_maps = {}
                    _domain_maps.domain = this.msg.domain_maps.domain
                    _domain_maps.ip = this.msg.domain_maps.ip

                    this.sendReq({domain_maps: _domain_maps})
                }
                this.ip_dis = !this.ip_dis
            }
        }
    }
</script>

<style scoped>
    #dns{
        width:800px;
        margin:0 auto;
        margin-top: 50px;
    }
</style>
