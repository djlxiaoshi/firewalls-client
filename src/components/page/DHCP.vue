<template>
    <div id="dhcp">
        <el-form  :model="formInline" class="demo-form-inline" label-position="top">
            <el-form-item label="子网络号">
                <el-input-number v-model="subnet[0]"  :min="0" :max="255" :controls="false"  class="num-input" :disabled="netDisbled"></el-input-number>
                <el-input-number v-model="subnet[1]"  :min="0" :max="255" :controls="false"  class="num-input" :disabled="netDisbled"></el-input-number>
                <el-input-number v-model="subnet[2]"  :min="0" :max="255" :controls="false"  class="num-input" :disabled="netDisbled"></el-input-number>
                <el-input-number v-model="subnet[3]"  :min="0" :max="255" :controls="false"  class="num-input" :disabled="netDisbled"></el-input-number>
                <el-button :plain="true" type="danger" size="small" @click="netEdit">{{netDisbled ? '修改' : '保存'}}</el-button>
            </el-form-item>
            <el-form-item label="IP地址分配范围">
                <div>
                    <el-input-number v-model="rangeStart[0]"  :min="0" :max="255" :controls="false"  class="num-input" :disabled="rangeDisbled"></el-input-number>
                    <el-input-number v-model="rangeStart[1]"  :min="0" :max="255" :controls="false"  class="num-input" :disabled="rangeDisbled"></el-input-number>
                    <el-input-number v-model="rangeStart[2]"  :min="0" :max="255" :controls="false"  class="num-input" :disabled="rangeDisbled"></el-input-number>
                    <el-input-number v-model="rangeStart[3]"  :min="0" :max="255" :controls="false"  class="num-input" :disabled="rangeDisbled"></el-input-number>
                </div>
                <div>
                    <el-input-number v-model="rangeEnd[0]"  :min="0" :max="255" :controls="false"  class="num-input" :disabled="rangeDisbled"></el-input-number>
                    <el-input-number v-model="rangeEnd[1]"  :min="0" :max="255" :controls="false"  class="num-input" :disabled="rangeDisbled"></el-input-number>
                    <el-input-number v-model="rangeEnd[2]"  :min="0" :max="255" :controls="false"  class="num-input" :disabled="rangeDisbled"></el-input-number>
                    <el-input-number v-model="rangeEnd[3]"  :min="0" :max="255" :controls="false"  class="num-input" :disabled="rangeDisbled"></el-input-number>
                    <el-button :plain="true" type="danger" size="small" @click="rangeEdit">{{rangeDisbled ? '修改' : '保存'}}</el-button>
                </div>
            </el-form-item>
            <el-form-item label="IP地址绑定">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column label="mac地址" width="250">
                            <template scope="scope">
                                <el-input v-model="scope.row.mac" placeholder="请输入内容" v-if="scope.row.isEdit"></el-input>
                                <span v-else>{{scope.row.mac}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="ip地址">
                            <template scope="scope">
                                <el-input v-model="scope.row.ip" placeholder="请输入内容" v-if="scope.row.isEdit"></el-input>
                                <span v-else>{{scope.row.ip}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="操作" width="200">
                            <template scope="scope">
                                <el-button
                                    size="small"
                                    @click="saveEdit(scope.$index, scope.row)">{{scope.row.isEdit ? '保存' : '修改'}}</el-button>
                                <el-button
                                    size="small"
                                    type="danger"
                                    @click="del(scope.$index, scope.row)">{{scope.row.isEdit ? '取消' : '删除'}}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="margin-top: 20px">
                        <el-button @click="dialogFormVisible = true">添加</el-button>
                    </div>
            </el-form-item>
        </el-form>


        <el-dialog title="添加" :visible.sync="dialogFormVisible">
            <el-form :model="addForm" label-position="left"  label-width="50px">
                <el-form-item label="mac">
                    <el-input v-model="addForm.mac" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="ip">
                    <div>
                        <el-input-number v-model="addForm.ip[0]"  :min="0" :max="255" :controls="false" size="small" class="num-input"></el-input-number>
                        <el-input-number v-model="addForm.ip[1]"  :min="0" :max="255" :controls="false" size="small" class="num-input"></el-input-number>
                        <el-input-number v-model="addForm.ip[2]"  :min="0" :max="255" :controls="false" size="small" class="num-input"></el-input-number>
                        <el-input-number v-model="addForm.ip[3]"  :min="0" :max="255" :controls="false" size="small" class="num-input"></el-input-number>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addRelat">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {
                dhcpData:{},
                formInline: {},
                netDisbled:true,
                rangeDisbled:true,
                ipDisbled:true,
                subnet: [0,0,0,0],
                rangeStart: [0,0,0,0],
                rangeEnd: [0,0,0,0],
                tableData: [{
                    mac:'00:0c:29:7c:04:5d',
                    ip:'192.168.90.13'
                }, {
                    mac: '00:0c:29:7c:04:5e',
                    ip: '192.168.90.14'
                }, {
                    mac: '00:0c:29:7c:04:5f',
                    ip: '192.168.90.15'
                }],
                dialogFormVisible: false,
                addForm: {
                    mac: '',
                    ip: [0,0,0,0]
                }
            }
        },
        created () {
            this.$http.get('dhcp/get').then(res => {
                let _data = res.body.msg
                this.subnet = _data.net.split('.')
                this.dhcpData.ips = _data.netfixed_ips
                this.rangeStart = _data.range[0].split('.')
                this.rangeEnd = _data.range[1].split('.')
            }, res => {})
        },
        methods: {
            netEdit () {
                if (this.netDisbled) {
                    // 修改
                    this.netDisbled = false
                } else {
                    let _netData = {
                        net: this.subnet.join('.')
                    }
                    // 保存
                    this.netDisbled = true
                    // 发送ajax请求
                    this.$http.post('dhcp/modify', _netData).then(res => {
                        if (res.body.code === 0) {
                            this.$message.success('修改成功')
                        } else {
                            this.$message.error('修改失败')
                        }
                    }, res => {
                        this.$message.error('服务器异常')
                    })
                }

            },
            rangeEdit () {
                if (this.rangeDisbled) {
                    // 修改
                    this.rangeDisbled = false
                } else {
                    let _rangeData = {}
                    let _rangeArr = []
                    _rangeArr.push(this.rangeStart.join('.'))
                    _rangeArr.push(this.rangeEnd.join('.'))
                    _rangeData.range = _rangeArr
                    console.log('range', _rangeData)
                    // 保存
                    this.rangeDisbled = true
                    // 发送ajax请求
                    this.$http.post('dhcp/modify', _rangeData).then(res => {
                        if (res.body.code === 0) {
                            this.$message.success('修改成功')
                        } else {
                            this.$message.error('修改失败')
                        }
                    }, res => {
                        this.$message.error('服务器异常')
                    })
                }
            },
            saveEdit (index, row) {
                if (!row.isEdit) {
                    // 修改
                    // todo
                } else {
                    let _ipMacData = {
                        mac: row.mac,
                        ip: row.ip
                    }
                    // 保存
                    this.$http.post('dhcp/modify', _ipMacData).then(res => {
                        if (res.body.code === 0) {
                            this.$message.success('修改成功')
                        } else {
                            this.$message.error('修改失败')
                        }
                    }, res => {
                        this.$message.error('服务器异常')
                    })
                }
                this.$set(row, 'isEdit', !row.isEdit)
            },
            del (index, row) {
                if (!row.isEdit) {
                    // 删除
                    // todo
                    this.tableData.splice(index, 1)
                } else {
                    // 放弃修改
                    this.$set(row, 'isEdit', false)
                }
            },
            addRelat () {
                let _relat = {}
                _relat.mac = this.addForm.mac
                _relat.ip = `${this.addForm.ip[0]}.${this.addForm.ip[1]}.${this.addForm.ip[2]}.${this.addForm.ip[3]}`
                this.tableData.push(_relat)
                // 发送ajax请求
               // this.$http.post().then()
                this.dialogFormVisible = false
            }
        }
    }
</script>

<style scoped>
    #dhcp {
        width:800px;
        margin: 0 auto;
    }
    .num-input {
        vertical-align: middle;
    }
   .dot {
       display: inline-block;
       width: 8px;height: 8px;
       vertical-align: middle;
       border-radius: 100%;
       background: black
   }

</style>
