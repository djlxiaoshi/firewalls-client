<template>
    <div id="">
        <el-form :inline="false" :model="msg" class="demo-form-inline">
            <el-form-item label="">
                <el-table :data="msg.user.list" style="width: 100%">
                <el-table-column label="用户编号" width="250">
                    <template scope="scope">
                        <span>{{scope.row.uid}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="用户名" prop="name"></el-table-column>
                <el-table-column label="权限" prop="perms"></el-table-column>
                <el-table-column label="操作" width="300">
                    <template scope="scope">
                        <el-button size="small" @click="editPerms(scope.$index, scope.row)">修改</el-button>
                        <el-button size="small" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
                        <el-button size="small" @click="download(scope.$index, scope.row)">密钥下载</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin-top: 20px">
                <el-button @click="addBtn">添加</el-button>
            </div>
        </el-form-item>
        </el-form>


        <el-dialog :title="title" :visible.sync="dialogFormVisible" size="small">
            <el-form :model="addForm" label-position="top">
                <el-form-item label="用户名">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限">
                    <el-checkbox-group v-model="addForm.perms">
                        <el-checkbox :label="item" v-for=" item in msg.perms_list" :key="item"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">{{ btnName}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {
                msg: {
                    user:{
                        list: [{
                            uid: 'BlB4gSLIT4A4lCrs5FzgGw',
                            name: 'djlxs',
                            perms: 'tcp/22'
                        }],
                        total: '',
                        cur: ''
                    },
                    perms_list: ['tcp/22', 'tcp/23', 'tcp/24']
                },
                flag: true,
                title: '添加',
                btnName: '添加',
                dialogFormVisible: false,
                index: 0,
                addForm: {
                    uid: '',
                    name: '',
                    perms: []
                }
            }
        },
        created () {
            this.$http.get('user/get_list').then(res => {
                if (res.body.code === 0) {
                    this.msg = res.body.msg
                }
                console.log(res.body.msg)
            }, res => {})
        },
        methods: {
            addBtn () {
                this.dialogFormVisible = true
                this.flag = true
            },
            add () {
                // 添加
                if (this.flag) {
                    this.$http.post('user/add', this.addForm).then(res => {
                        if (res.body.code === 0) {
                            this.msg.user.list.push(res.body.msg)
                            this.$message.success('添加成功');
                        } else {
                            this.$message.error('其他错误');
                        }
                        this.dialogFormVisible = false
                    }, res => {
                        this.$message.error('服务器异常');
                    })
                } else { // 修改
                    this.$http.post('user/modify', this.addForm).then(res => {
                        if (res.body.code === 0) {
                            this.msg.user.list.splice(this.index, 1 ,res.body.msg)
                            this.$message.success('修改成功');
                            this.dialogFormVisible = false
                        } else {
                            this.$message.error('修改失败');
                        }
                    }, res => {
                        this.$message.error('服务器异常');
                    })
                }
            },
            editPerms (index ,row) {
                this.flag = false
                this.title = '修改'
                this.btnName = '保存',
                this.index = index
                this.dialogFormVisible = true
                this.$http.get(`user/get_perms?uid=${row.uid}`).then(res => {
                    if (res.body.code === 0) {
                        this.addForm = res.body.msg
                    }
                }, res => {
                    this.$message.error('服务器异常');
                })
            },
            del (index ,row) {
                this.$confirm('确定删除该配置想吗?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post(`user/delete`,{uid:row.uid}).then(res => {
                        if (res.body.code === 0) {
                            this.msg.user.list.splice(index, 1)
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        } else {
                            this.$message.error('其他错误');
                        }
                    }, res => {
                        this.$message.error('服务器异常');
                    })
                }).catch(() => {

                });
            },
            download (index, row) {
                this.$http.get(`user/download_key?uid=${row.uid}`).then(res => {
                    if (res.body.code === 0) {
                        this.$message.success('下载成功');
                    } else {
                        this.$message.error('下载失败');
                    }
                }, res => {
                    this.$message.error('服务器异常');
                })
            }
        }
    }
</script>

<style scoped>
</style>
