<template>
    <div id="rules">
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="open-lists-wrap">
                    <el-switch
                        v-model="msg.enable_open_ports"
                        on-text=""
                        off-text=""
                        on-value="1"
                        off-value="0"
                        @change="toggleOpenList"
                    >
                    </el-switch>
                    <span>{{msg.enable_open_ports === '1' ?  '激活' : '禁用'}}</span>
                    <el-table :data="msg.open_ports"  style="width: 100%" border stripe class="open-list-table">
                        <el-table-column label="开放端口名列表">
                            <template scope="scope">
                                <span style="margin-left: 10px">{{ scope.row }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">

                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="black-lists-wrap">
                    <el-switch
                        v-model="msg.enable_blacklist"
                        on-text=""
                        off-text=""
                        on-value="1"
                        off-value="0"
                        @change="toggleBlackList"
                    >
                    </el-switch>
                    <span>{{msg.enable_blacklist === '1' ?  '激活' : '禁用'}}</span>
                    <el-table :data="msg.blacklist"  style="width: 100%" border stripe class="black-list-table">
                        <el-table-column prop="port" label="IP黑名单">
                            <template scope="scope">
                                {{ scope.row}}
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">

                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {
                msg: {
                    enable_open_ports: 0,
                    blacklist: [
                         "192.168.99.99"
                    ],
                    open_ports: [
                        "tcp/22"
                    ],
                    enable_blacklist: 0
                }
            }
        },
        created () {
            this.$http.get('rules/get').then(res => {
                if (res.body.code === 0) {
                    this.msg = res.body.msg
                }
            }, res => {
                this.$message.error('服务器异常')
            })
        },
        methods: {
            toggleOpenList (value) {
                this.$http.post('rules/modify',{enable_open_ports: value}).then(res => {
                    if (res.body.code === 0) {
                        if (value === '1') {
                            this.$message.success('激活开放列表')
                        } else {
                            this.$message.warning('禁用开放列表')
                        }
                    }
                }, res => {
                    this.$message.error('服务器异常')
                })
            },
            toggleBlackList (value) {
                this.$http.post('rules/modify',{enable_blacklist: value}).then(res => {
                    if (res.body.code === 0) {
                        if (value === '1') {
                            this.$message.success('激活黑名单')
                        } else {
                            this.$message.warning('禁用黑名单')
                        }

                    }
                }, res => {
                    this.$message.error('服务器异常')
                })
            }
        }
    }
</script>

<style scoped>
    #rules {
    }
    .open-list-table, .black-list-table {
        margin-top:30px;
    }
</style>
