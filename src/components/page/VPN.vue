<template>
    <div id="vpn">
        <el-form :inline="false" :model="msg" class="demo-form-inline" label-position="top">
            <el-form-item >
                <el-row :gutter="50">
                    <el-col :span="12">
                        <el-form-item label="省份">
                            <el-input v-model="msg.province" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="城市">
                            <el-input v-model="msg.city" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item >
                <el-row :gutter="50">
                    <el-col :span="12">
                        <el-form-item label="公司">
                            <el-input v-model="msg.org" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="邮箱">
                            <el-input v-model="msg.email" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item >
                <el-row :gutter="50">
                    <el-col :span="12">
                        <el-form-item label="部门">
                            <el-input v-model="msg.department" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="打开VPN">
                            <el-switch
                                v-model="msg.enable"
                                on-text=""
                                off-text=""
                                on-value="1"
                                off-value="0"
                            >
                            </el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item >
                <el-button type="info" @click="save">保存设置</el-button>
                <el-button type="info" @click="download">下载证书</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {
                msg: {
                    'province': '',
                    'city': '',
                    'org': '',
                    'email': '',
                    'department': '',
                    'enable': ''
                }
            }
        },
        created () {
            this.$http.get('vpn/get').then(res => {
                if (res.body.code === 0) {
                    this.msg = res.body.msg
                } else {
                    this.$message.error('其他错误')
                }
            }, res => {
                this.$message.error('服务器异常')
            })
        },
        methods: {
            save () {
                this.$http.post('vpn/modify', this.msg).then(res => {
                    if (res.body.code === 0 ){
                        this.$message.success('修改成功')
                    } else {
                        this.$message.error('参数错误')
                    }
                }, res => {
                    this.$message.error('服务器异常')
                })
            },
            download () {
                this.$http.get(`vpn/generate_client_certs`).then(res => {

                }, res => {
                    this.$message.error('服务器异常')
                })
            }
        }
    }
</script>

<style scoped>
    #vpn {
        width: 800px;
        margin:50px auto;
    }
</style>
