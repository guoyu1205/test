<script setup>
import {
  Management,
  Promotion,
  User,
  Document,
  ChatSquare,
  List,
  Star
} from "@element-plus/icons-vue";
//import avatar from '@/assets/default.png'

import { ref } from "vue";
const name = ref('');
const role = ref('');

import {userInfoService} from '@/api/user.js'
//import useUserInfoStore from '@/stores/userInfo.js'
import {useTokenStore} from '@/stores/token.js'
const tokenStore = useTokenStore();
//const userInfoStore = useUserInfoStore();
//调用函数,获取用户详细信息
const getUserInfo = async()=>{
    //调用接口
    let result = await userInfoService();
    //数据存储到pinia中
    //userInfoStore.setInfo(result.data);
    console.log(result.data)
    name.value = result.data.name;
    role.value = result.data.role;
}

getUserInfo();
//条目被点击后,调用的函数
 import {useRouter} from 'vue-router'
 const router = useRouter();
 import {ElMessage,ElMessageBox} from 'element-plus'
const delLogin = ()=>{
    
        //退出登录
        ElMessageBox.confirm(
        '您确认要退出吗?',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            //退出登录
            //1.清空pinia中存储的token以及个人信息
            tokenStore.removeToken()
             //userInfoStore.removeInfo()

            //2.跳转到登录页面
            router.push('/login')
            ElMessage({
                type: 'success',
                message: '退出登录成功',
            })

        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '用户取消了退出登录',
            })
        })
   
}



</script>

<template>
  <!-- element-plus中的容器 -->
  <el-container class="layout-container">
    <!-- 左侧菜单 -->
    <el-aside width="200px">
      <div class="el-aside__logo"></div>
      <!-- element-plus的菜单标签 -->
      <el-menu active-text-color="#ffd04b" background-color="#232323" text-color="#fff" router>
        <el-menu-item index="/manage">
          <el-icon>
            <Management />
          </el-icon>
          <span>实验管理</span>
        </el-menu-item>
        
          <el-menu-item index="/human">
            <el-icon>
              <Star />
            </el-icon>
            <span>学生实验能力</span>
          </el-menu-item>
         
        
        <el-menu-item index="/personal">
          <el-icon>
            <User />
          </el-icon>
          <span>我的信息</span>
        </el-menu-item>
        
        
      </el-menu>
    </el-aside>
    <!-- 右侧主区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <div>
          欢迎您：
          <strong>{{name}}({{role}})</strong>
        </div>
        <div class="mb-4">
          <el-button type="primary" @click="delLogin">退出登录</el-button>
        </div>
      </el-header>
      <!-- 中间区域 -->
      <el-main>
        <!-- <div style="width: 1290px; height: 570px;border: 1px solid red;">
                    内容展示区
        </div>-->
        <router-view></router-view>
      </el-main>
      <!-- 底部区域 -->
      <el-footer>开放自助实验管理系统</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .el-aside {
    background-color: #232323;

    &__logo {
      height: 120px;
      background: url("@/assets/login.png") no-repeat center / 200px auto;
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>