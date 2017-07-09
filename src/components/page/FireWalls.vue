<template>
    <div id="firewalls">
        <el-form  :model="msg" class="demo-form-inline" label-position="top">
            <el-form-item >
                <el-row :gutter="50">
                    <el-col :span="12">
                        <el-form-item label="认证监听端口">
                            <el-input v-model="msg.listen_port" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="认证包生存周期(ms)">
                            <el-input v-model="msg.max_packet_time" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item >
                <el-row :gutter="50">
                    <el-col :span="12">
                        <el-form-item label="公网端口">
                            <el-input v-model="msg.port_mapping.port" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="协议">
                            <el-select v-model="msg.port_mapping.protocol" placeholder="请选择">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item >
                <el-row :gutter="50">
                    <el-col :span="12">
                        <el-form-item label="端口服务名称">
                            <el-input v-model="msg.port_mapping.service_name" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="内网服务器地址">
                            <el-input v-model="msg.port_mapping.ip" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item >
                <el-button type="info" @click="save">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {
                options: [{
                    value: 'tcp',
                    label: 'TCP'
                },{
                    value: 'udp',
                    label: 'UDP'
                }],
                msg: {
                    port_mapping: {
                        protocol: 'tcp',
                        port: '22',
                        service_name: 'ssh@firewall',
                        ip: '192.168.99.12:30'
                    },
                    "max_packet_time": 60,
                    "listen_port": 62201
                }
            }
        },
        methods: {
            save () {
                this.$http.post('fw/modify', this.msg).then(res => {
                    if (res.body.code === 0) {
                        this.$message.success('修改成功')
                    }
                }, res => {
                    this.$message.error('服务器异常')
                })
            }
        },
        created () {
            this.$http.get('fw/get').then(res => {
                if (res.body.code === 0) {
                    this.msg = res.body.msg
                }
            }, res => {
                this.$message.error('服务器异常')
            })
        }
    }
</script>

<style scoped>
    #firewalls {
        width: 800px;
        margin:50px auto;
    }
</style>
