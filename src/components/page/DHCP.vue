<template>
    <div id="dhcp">
        <el-form  :model="formInline" class="demo-form-inline" label-position="left">
            <el-form-item label="子网络号">
                <el-input
                    class="num-input"
                    v-for="(item, index) in subnet"
                    v-model="subnet[index]"
                    icon="edit"
                    type="number"
                    :min="0" :max="255"
                    :disabled="netDisabled"
                    @change="saveChange({net: subnet.join('.')})"
                    @click="netDisabled = false"
                    @blur="netDisabled = true"
                    >
                </el-input>
            </el-form-item>
            <el-form-item label="IP起始地址">
                    <el-input
                        icon="edit"
                        type="number"
                        v-for="(item, index) in rangeStart"
                        v-model="rangeStart[index]"
                        :min="0" :max="255"
                        :controls="false"
                        class="num-input"
                        :disabled="rangeDisabled"
                        size="small"
                        @click="rangeDisabled = false"
                        @change="saveChange({range: [rangeStart.join('.'), rangeEnd.join('.')]})"
                        @blur="rangeDisabled = true"
                    ></el-input>
            </el-form-item>
            <el-form-item label="IP结束地址">
                    <el-input
                        icon="edit"
                        type="number"
                        v-for="(item, index) in rangeEnd"
                        v-model="rangeEnd[index]"
                        :min="0" :max="255"
                        :controls="false"
                        class="num-input"
                        :disabled="rangeDisabled"
                        size="small"
                        @click="rangeDisabled = false"
                        @change="saveChange({range: [rangeStart.join('.'), rangeEnd.join('.')]})"
                        @blur="rangeDisabled = true"
                    ></el-input>
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
            <el-form :model="addForm" label-position="left"  label-width="50px" :rules="rules" ref="addForm">
                <el-form-item label="mac" style="width: 340px;" prop="mac">
                    <el-input v-model="addForm.mac"></el-input>
                </el-form-item>
                <el-form-item label="ip">
                    <el-input
                        style="width: 50px;margin-right: 27px;"
                        type="number"
                        v-for="(item, index) in addForm['ip']"
                        v-model="addForm.ip[index]"
                        :min="0" :max="255"
                        size="small"
                    ></el-input>
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
                netDisabled:true,
                rangeDisabled:true,
                ipDisabled:true,
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
                },
                rules: {
                    mac: [
                        {required: true, message: '请填写mac地址', trigger: 'blur' }
                    ]
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
            saveEdit (index, row) {
                if (!row.isEdit) {
                    // 修改
                    // todo
                } else {
                    // 保存
                    this.sendReq({mac: row.mac,ip: row.ip})
                }
                this.$set(row, 'isEdit', !row.isEdit)
            },
            del (index, row) {
                if (!row.isEdit) {
                    // 删除
                    // todo
                    this.$alert('确定删除这条配置吗？', '警告', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }).then(() => {
                        // 这里要进行一些请求操作

                        this.tableData.splice(index, 1)
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }).catch(() => {

                    });
                } else {
                    // 放弃修改
                    this.$set(row, 'isEdit', false)
                }
            },
            addRelat () {
                this.$refs['addForm'].validate((valid) => {
                    if (valid) {
                        let _relat = {}
                        _relat.mac = this.addForm.mac
                        _relat.ip = `${this.addForm.ip[0]}.${this.addForm.ip[1]}.${this.addForm.ip[2]}.${this.addForm.ip[3]}`
                        this.tableData.push(_relat)
                        // 发送ajax请求
                        // this.$http.post().then()
                        this.dialogFormVisible = false
                    } else {
                        return false;
                    }
                });

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
        width:160px;
        margin: 9px;
    }
   .dot {
       display: inline-block;
       width: 8px;height: 8px;
       vertical-align: middle;
       border-radius: 100%;
       background: black
   }

</style>
