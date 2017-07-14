<template>
    <div id='access-list'>
        <template>
            <el-table
                :data="tableData"
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
                    label="国家代码">
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="用户名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="packet_len"
                    label="认证包长度"
                    width="180">
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
        <div class="block">
            <el-pagination
                layout="prev, pager, next"
                :total="1000">
            </el-pagination>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {
                tableData: [{
                    "time": "2017-06-06 15:35:16",
                    "src": "19.18.102.10",
                    "country": "CN",
                    "username": "user@11.com",
                    "packet_len": 425,
                    "elapsed": 11,
                    "code": 0,
                    "result": "successfully"
                },{
                    "time": "2017-06-05 15:35:16",
                    "src": "192.168.102.10",
                    "country": "-",
                    "username": "user@11.com",
                    "packet_len": 42500,
                    "elapsed": 11,
                    "code": -123,
                    "result": "the authenication packet is too long"
                }]
            }
        },
        methods: {

        }
    };
</script>

<style>
</style>
