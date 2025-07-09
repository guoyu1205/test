<script setup>
  import { reactive, ref } from 'vue'
  import { Edit } from '@element-plus/icons-vue'
  import { ElMessage } from 'element-plus'
  
  
  const centerDialogVisible = ref(false)
  const formRef = ref()
  const user = ref({
    username:"",
    name:"",
    phoneNumber:"",
    institution:"",
  })

import {userInfoService} from '@/api/user.js'
const getUserInfo = async()=>{
    //调用接口
    let result = await userInfoService();
    user.value = result.data;
}
getUserInfo();
  
  // 表单数据
  const form = reactive({
    userName: '',
    password: '',
    company: '',
    name: '',
    phoneNumber: '',
  })
  
  // 显示的信息
  const displayInfo = reactive({
    userName: '',
    company: '',
    name: '',
    phoneNumber: '',
  })
  
  // 表单验证规则
  const rules = reactive({
    userName: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
    ],
    company: [
      { required: true, message: '请输入所属机构', trigger: 'blur' }
    ],
    name: [
      { required: true, message: '请输入姓名', trigger: 'blur' }
    ],
    phoneNumber: [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
    ]
  })
  
  // 提交表单
  const submitForm = async (formEl) => {
    if (!formEl) return
    
    await formEl.validate((valid) => {
      if (valid) {
        // 更新显示的信息
        Object.assign(displayInfo, form)
        ElMessage.success('修改成功')
        centerDialogVisible.value = false
      }
    })
  }
  
  // 取消编辑
  const cancelEdit = () => {
    formRef.value?.resetFields()
    centerDialogVisible.value = false
  }
</script>
  

<template>
    <div class="personal-container">
      <div class="info-card">
        <div class="avatar-section">
          <el-avatar :size="100" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
          <h2 class="welcome-text">个人信息</h2>
        </div>
         
        <el-form :model="form" label-width="120px" class="info-form" style="margin-left: 160px;">
          <el-form-item label="用户名:">
            <span class="info-text">{{ user.username || '*********' }}</span>
          </el-form-item>
          
          <el-form-item label="所属学院:">
            <span class="info-text">{{ user.institution || '*********' }}</span>
          </el-form-item>
  
          <el-form-item label="姓名:">
            <span class="info-text">{{user.name || '*********' }}</span>
          </el-form-item>
  
          <el-form-item label="手机号:">
            <span class="info-text">{{ user.phoneNumber || '*********' }}</span>
          </el-form-item>
  

            <el-button type="primary" @click="centerDialogVisible = true" class="edit-button" >
              <el-icon><Edit /></el-icon>修改信息
            </el-button>
         
        </el-form>
      </div>
  
      <!-- 修改信息对话框 -->
      <el-dialog
        v-model="centerDialogVisible"
        title="修改个人信息"
        width="500px"
        align-center
        draggable
      >
        <el-form 
          ref="formRef"
          :model="form" 
          :rules="rules"
          label-width="100px" 
          class="dialog-form"
        >
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="form.userName" clearable placeholder="请输入用户名" />
          </el-form-item>
  
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" show-password placeholder="请输入密码" />
          </el-form-item>
  
          <el-form-item label="所属学院" prop="company">
            <el-input v-model="form.company" clearable placeholder="请输入所属学院" />
          </el-form-item>
  
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" clearable placeholder="请输入姓名" />
          </el-form-item>
  
          <el-form-item label="手机号" prop="phoneNumber">
            <el-input v-model="form.phoneNumber" clearable placeholder="请输入手机号" />
          </el-form-item>
        </el-form>
  
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="cancelEdit">取消</el-button>
            <el-button type="primary" @click="submitForm(formRef)">
              确认修改
            </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </template>
  

  <style scoped>
  .personal-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 700px;
    background-color: #f5f7fa;
    padding: 20px;
  }
  
  .info-card {
    background: white;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
  }
  
  .avatar-section {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .welcome-text {
    margin-top: 20px;
    color: #303133;
    font-weight: 500;
  }
  
  .info-form {
    margin-top: 30px;
  }
  
  .info-text {
    font-size: 16px;
    color: #606266;
  }
  
  .edit-button {
    margin-left: 80px;
    width: 120px;
  }
  
  .dialog-form {
    padding: 20px 0;
  }
  
  .dialog-form :deep(.el-input) {
    width: 100%;
  }
  
  :deep(.el-form-item__label) {
    font-weight: 500;
    color: #303133;
  }
  
  .dialog-footer {
    text-align: right;
    margin-top: 20px;
  }
  
  /* 响应式调整 */
  @media (max-width: 768px) {
    .info-card {
      padding: 20px;
    }
  
    :deep(.el-form-item__label) {
      float: none;
      display: block;
      text-align: left;
      margin-bottom: 8px;
    }
  
    .el-form-item {
      margin-bottom: 25px;
    }
  }
  </style> 
