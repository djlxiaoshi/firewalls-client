<template>
    <div id="dhcp">
        <el-form  :model="formInline" class="demo-form-inline" label-position="top">
            <el-form-item label="子网络号">
                <el-input
                    v-for="(item, index) in subnet"
                    v-model="subnet[index]"
                    icon="edit"
                    type="number"
                    :min="0" :max="255"
                    :controls="false"
                    class="num-input"
                    :disabled="netDisbled"
                    :on-icon-click="netEdit"
                    @change="saveChange({net: subnet.join('.')})"
                    @blur="netDisbled = !netDisbled"
                    >
                </el-input>
            </el-form-item>
            <el-form-item label="IP地址分配范围">
                <div>
                    <el-input
                        icon="edit"
                        type="number"
                        v-for="(item, index) in rangeStart"
                        v-model="rangeStart[index]"
                        :min="0" :max="255"
                        :controls="false"
                        class="num-input"
                        :disabled="rangeDisbled"
                        size="small"
                        :on-icon-click="rangeEdit"
                        @change="saveChange({range: [rangeStart.join('.'), rangeEnd.join('.')]})"
                        @blur="rangeDisbled = !rangeDisbled"
                    ></el-input>
                </div>
                <div>
                    <el-input
                        icon="edit"
                        type="number"
                        v-for="(item, index) in rangeEnd"
                        v-model="rangeEnd[index]"
                        :min="0" :max="255"
                        :controls="false"
                        class="num-input"
                        :disabled="rangeDisbled"
                        size="small"
                        :on-icon-click="rangeEdit"
                        @change="saveChange(rangeStart, rangeEnd)"
                        @blur="rangeDisbled = !rangeDisbled"
                    ></el-input>
                </div>
            </el-form-item>
            <el-form-item label="IP地址绑定">
                    <el-table :data="tableData" style="width: 100%" border>
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


        <el-dialog title="添加" :visible.sync="dialogFormVisible" size="tiny">
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
                subnet: [10,0,0,1],
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
            test(){
                console.log(21345)
            },
            sendReq(data) {
                this.$http.post('dhcp/modify', data).then(res => {
                    if (res.body.code === 0) {
                        this.$message.success('修改成功')
                    } else {
                        this.$message.error('客户端错误')
                    }
                }, res => {
                    this.$message.error('服务器异常')
                })
            },
            saveChange (data) {
                setTimeout( ()=> {
                    // 发送ajax请求
                    this.sendReq(data)
                }, 500)
            },
            netEdit () {
                this.netDisbled = !this.netDisbled
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
        width:100px;
        margin: 10px;
    }
   .dot {
       display: inline-block;
       width: 8px;height: 8px;
       vertical-align: middle;
       border-radius: 100%;
       background: black
   }

</style>
