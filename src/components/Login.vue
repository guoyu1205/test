<script setup>
import { User, Lock } from "@element-plus/icons-vue";
import { ref } from "vue";
import { ElMessage } from "element-plus";
//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false);
//定义数据模型
const registerData = ref({
  username: "",
  password: "",
  rePassword: "",
  name: "",
  phoneNumber: "",
  role: "",
  institution: ""
});

//校验密码的函数
const checkRePassword = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请再次确认密码"));
  } else if (value !== registerData.value.password) {
    callback(new Error("请确保两次输入的密码一样"));
  } else {
    callback();
  }
};

//定义表单校验规则
const rules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 5, max: 10, message: "长度为5~10位非空字符", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 5, max: 14, message: "长度为5~14位非空字符", trigger: "blur" }
  ],
  rePassword: [{ validator: checkRePassword, trigger: "blur" }],
  name: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    { min: 1, max: 10, message: "请输入正确的姓名", trigger: "blur" }
  ],
  phoneNumber: [
    { required: true, message: "请输入11位手机号", trigger: "blur" },
    { min: 11, max: 11, message: "请输入11位手机号", trigger: "blur" }
  ],
  role: [{ required: true, message: "请选择角色", trigger: "blur" }]
};




//绑定数据,复用注册表单的数据模型
//表单数据校验
//登录函数
import { userLoginService } from "@/api/user.js";
import {useTokenStore} from '@/stores/token.js'
import {useRouter} from 'vue-router'
const router = useRouter()
const tokenStore = useTokenStore();
const login = async () => {
  //调用接口,完成登录
  let result = await userLoginService(registerData.value);

  if (result.code == 0) ElMessage.error(result.message);
  else ElMessage.success("登录成功");

  //把得到的token存储到pinia中
  tokenStore.setToken(result.data)
  //跳转到首页 路由完成跳转
  if (result.code === 1)
  router.push('/admin')
  else
  router.push('/common')
};
import {userRegisterService} from '@/api/user.js'
const register = async () => {
    //registerData是一个响应式对象,如果要获取值,需要.value
    let result = await userRegisterService(registerData.value)
     if (result.code === 1) {
        //成功了
        ElMessage.success("注册成功");
        isRegister.value = false
        clearRegisterData()
    }else{
        ElMessage.error(result.message);
    }
}

//定义函数,清空数据模型的数据
const clearRegisterData = () => {
  registerData.value = {
    username: "",
    password: "",
    rePassword: ""
  };
};
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册表单 -->
      <el-form
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
        :model="registerData"
        :rules="rules"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            v-model="registerData.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="rePassword">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
            v-model="registerData.rePassword"
          ></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <el-input :prefix-icon="User" placeholder="请输入姓名" v-model="registerData.name"></el-input>
        </el-form-item>
        <el-form-item prop="phoneNumber">
          <el-input :prefix-icon="User" placeholder="请输入手机号" v-model="registerData.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-radio-group v-model="registerData.role">
            <el-radio value="支持人员">老师</el-radio>
            <el-radio value="检测人员">学生</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="学院" prop="role">
          <el-select v-model="registerData.institution" placeholder="请选择您的学院">
            <el-option label="计算机科学与工程学院" value="计算机科学与工程学院" />
            <el-option label="材料科学与工程学院" value="材料科学与工程学院" />
            <el-option label="机械工程学院" value="机械工程学院" />
            <el-option label="化学工程学院" value="化学工程学院" />
            <el-option label="环境科学与工程学院" value="环境科学与工程学院" />
            <el-option label="土木工程学院" value="土木工程学院" />
            <el-option label="建筑学院" value="建筑学院" />
            <el-option label="交通学院" value="交通学院" />
            <el-option label="航空航天学院" value="航空航天学院" />
            <el-option label="能源与动力工程学院" value="能源与动力工程学院" />
            <el-option label="经济管理学院" value="经济管理学院" />
            <el-option label="管理学院" value="管理学院" />
            <el-option label="外国语学院" value="外国语学院" />
            <el-option label="艺术学院" value="艺术学院" />
            <el-option label="法学院" value="法学院" />
            <el-option label="医学院" value="医学院" />
            <el-option label="公共卫生学院" value="公共卫生学院" />
            <el-option label="药学院" value="药学院" />
          </el-select>
        </el-form-item>
        <!-- 注册按钮 -->
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="register">注册</el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link
            type="info"
            :underline="false"
            @click="isRegister = false;clearRegisterData()"
          >← 返回</el-link>
        </el-form-item>
      </el-form>
      <!-- 登录表单 -->
      <el-form
        ref="form"
        size="large"
        autocomplete="off"
        v-else
        :model="registerData"
        :rules="rules"
      >
        <el-form-item>
       
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            :prefix-icon="Lock"
            type="password"
            show-password=""
            placeholder="请输入密码"
            v-model="registerData.password"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <!-- <el-link type="primary" :underline="false">忘记密码？</el-link> -->
          </div>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link
            type="info"
            :underline="false"
            @click="isRegister = true;clearRegisterData()"
          >注册 →</el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
  height: 100vh;
  background-color: #fff;
  background: url("@/assets/login_bg.jpg") no-repeat center / cover;

  .bg {
    background: url("@/assets/login.png") no-repeat 60% center / 550px auto;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>