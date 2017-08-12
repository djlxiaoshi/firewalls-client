<template>
    <div id='access-list'>
        <template>
            <el-table
                border
                :data="showPages"
                style="width: 100%">
                <el-table-column
                    prop="time"
                    label="访问时间"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="src"
                    label="源IP"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="country"
                    label="国家代码"
                    width="100"
                >
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="用户名"
                    >
                </el-table-column>
                <el-table-column
                    prop="packet_len"
                    label="认证包长度"
                    >
                </el-table-column>
                <el-table-column
                    prop="elapsed"
                    label="处理时常单位ms">
                </el-table-column>
                <el-table-column
                    prop="code"
                    label="处理结果代码">
                </el-table-column>
                <el-table-column
                    prop="result"
                    label="结果">
                </el-table-column>
            </el-table>
        </template>
        <div class="pagination-wrap">
            <el-pagination
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="totalCount"
                @current-change="changePage"
            ></el-pagination>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {
                totalCount: 0,
                currentPage: 1,
                pageSize: 1,
                tableData: []
            }
        },
        methods: {
            getData () {
                return this.$http.get('access/get_list').then(res => {
                    if (res.body.code === 0) {
                        this.tableData = res.body.msg.list
                        this.totalCount = this.tableData.length
                    } else {
                        this.$message.error('客户端错误')
                    }
                }, res => {
                    this.$message.error('服务器异常')
                })
            },
            changePage(currentPage) {
                this.currentPage = currentPage
            }
        },
        computed: {
            showPages() {
                console.log(this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize))
                return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
            }
        },
        mounted(){
            this.getData()
        }
    };
</script>

<style>
    .pagination-wrap{
        margin-top: 50px;
    }
</style>
