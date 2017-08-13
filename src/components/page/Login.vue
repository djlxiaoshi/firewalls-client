<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="form.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            let checkName = (rule, value, callback) => {
                let regexp = /[^A-Za-z0-9\-\_\@\.]/i
                if (!value) {
                    return callback(new Error('不能为空'));
                } else if (regexp.test(value)) {
                    return callback(new Error('用户名只能包含A-Z a-z 0-9 - _ @.等字符'));
                }  else {
                    callback();
                }
            };
            return {
                form: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { trigger: 'blur' ,validator: checkName}
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post('admin/login', {username: this.form.username, password: this.form.password}).then(res => {
                            if (res.body.code === 0) {
                                localStorage.setItem('ms_username', this.form.username);
                                this.$message.success('登录成功');
                                self.$router.push('/dhcp');
                            } else {
                                this.$message.error('客户端错误');
                            }
                        }, res => {
                            this.$message.error('服务器异常');
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
