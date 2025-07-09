<style scoped>
.info-container {
  display: flex;
  align-items: center;
  gap: 40px; /* 项目之间的间距 */
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.info-item {
  display: flex;
  align-items: center;
}

.label {
  font-size: 16px;
  color: #606266; /* 标签颜色：灰色 */
  font-weight: 500;
}

.value {
  font-size: 16px;
  color: #409EFF; /* 值的颜色：蓝色 */
  margin-left: 4px;
  font-weight: 400;
}
</style>




<script setup>
import { useUserInfoStore } from "@/stores/userInfo.js";
import { ElMessage, ElMessageBox } from "element-plus";
const infoStore = useUserInfoStore();

import { reactive, ref } from "vue";
const pageNum = ref(1);
const total = ref(20);

const dialogFormAddProjectVisible = ref(false);
const dialogFormEditProjectVisible = ref(false);
const formLabelWidth = "140px";

const formAddProject = reactive({
  projectName: "",
  detailNumber: ""
});
const formEditProject = reactive({
  projectId: "",
  projectName: "",
  detailNumber: ""
});

import { Search } from "@element-plus/icons-vue";
const input1 = ref("");
const input2 = ref("");

const projects = ref([
 
]);

import { projectListService, projectAddService,projectEditService ,projectDeleteService} from "@/api/project.js";
const projectList = async () => {
  let params = {
    pageNum: pageNum.value,
    standardId: infoStore.info.standardId,
    projectName: input1.value ? input1.value : null,
    detailNumber: input2.value ? input2.value : null
  };
  let result = await projectListService(params);
  total.value = result.data.total;
  projects.value = result.data.items;
};
projectList();

const onCurrentChange = num => {
  pageNum.value = num;
  projectList();
};

const isEmptyproject = async () => {
  if (formAddProject.projectName != "" && formAddProject.detailNumber != "") {
    let params = {
      projectName: formAddProject.projectName,
      standardId: infoStore.info.standardId,
      detailNumber: formAddProject.detailNumber
    };
    let result = await projectAddService(params);
    projectList();

    ElMessage({
      type: "success",
      message: "添加成功"
    });
    formAddProject.projectName = "";
    formAddProject.detailNumber = "";
    dialogFormAddProjectVisible.value = false;
  } else {
    ElMessage({
      type: "warning",
      message: "请输入全部数据，不能为空"
    });
  }
};

const cancel =()=>{
     formAddProject.projectName = "";
    formAddProject.detailNumber = "";
    dialogFormAddProjectVisible.value = false
}
//项目编辑
const handleEditProject = row => {
  formEditProject.projectId = row.projectId;
  formEditProject.projectName = row.projectName;
  formEditProject.detailNumber = row.detailNumber;
};

const isEmptyEditProject = async () => {
  if (formEditProject.projectName != "" && formEditProject.detailNumber != "") {
    let params = {
      projectId: formEditProject.projectId,
      projectName: formEditProject.projectName,
      detailNumber: formEditProject.detailNumber
    };
    let result = await projectEditService(params);
    projectList();
    ElMessage({
      type: "success",
      message: "修改成功"
    });
    dialogFormEditProjectVisible.value = false;
  } else {
    ElMessage({
      type: "warning",
      message: "请输入全部数据，不能为空"
    });
  }
};

const handleDelete = id => {
  ElMessageBox.confirm("您确认要删除吗?", "温馨提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  }).then(async () => {
    let params = { projectId: id };
    let result = await projectDeleteService(params);
    projectList();
    ElMessage({
      type: "success",
      message: "删除成功"
    });
  });
};

import {useRouter} from 'vue-router'
 const router = useRouter();
const reback = () =>{
    router.push('/admin')
}

const handleJi = (project) => {

  infoStore.setPro(project)
 router.push('/machine')
}
const handleFa = (project) => {

  infoStore.setPro(project)
 router.push('/way')
}

const handlePerson = (project) => {

  infoStore.setPro(project)
 router.push('/person')
}
</script>

<template>
  <div>
    <el-divider />
    <h1>实验管理</h1>
    <!-- <div>
      <el-text class="mx-1" type="success">所属学院：{{infoStore.info.basicClass}}</el-text>
      <el-text class="mx-1" style="margin-left:100px" type="success">学科：{{infoStore.info.category}}</el-text>
      <el-text
        class="mx-1"
        style="margin-left:100px"
        type="success"
      >负责教师：{{infoStore.info.standardName}}</el-text>
      <el-text
        class="mx-1"
        style="margin-left:100px"
        type="success"
      >电话号码：{{infoStore.info.standardNumber}}</el-text>
    </div> -->

 <div class="info-container">
    <div class="info-item">
      <span class="label">所属学院：</span>
      <span class="value">{{ infoStore.info.category }}</span>
    </div>
    <div class="info-item">
      <span class="label">学科：</span>
      <span class="value">{{ infoStore.info.basicClass }}</span>
    </div>
    <div class="info-item">
      <span class="label">负责教师：</span>
      <span class="value">{{ infoStore.info.standardName }}</span>
    </div>
    <div class="info-item">
      <span class="label">电话号码：</span>
      <span class="value">{{ infoStore.info.standardNumber }}</span>
    </div>
  </div>


    <el-divider />
    <div>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content ep-bg-purple" />
          <el-button type="primary" @click="reback">返回</el-button>
          <el-button plain @click="dialogFormAddProjectVisible = true" type="primary">+ 新增实验</el-button>
        </el-col>

        <el-col :span="16">
          <div class="grid-content ep-bg-purple" />
          <el-input v-model="input1" style="width: 120px;margin-left:500px" placeholder="实验名称" />
          <el-input
            v-model="input2"
            style="width: 120px;margin-left:20px"
            placeholder="实验室"
          />
          <el-button :icon="Search" circle style="margin-left:20px" @click="projectList" />
        </el-col>
      </el-row>
    </div>
    <el-table :data="projects" border style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column label="实验名称">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.projectName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="实验室">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.detailNumber }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="选项">
        <template #default="scope">
          <el-button size="small" @click="handlePerson(scope.row)">准入考核</el-button>
          <el-button size="small" @click="handleJi(scope.row)">实验器材</el-button>
          <el-button size="small" @click="handleFa(scope.row)">预习实验</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px" fixed="right">
        <template #default="scope">
          <el-button
            plain
            @click="dialogFormEditProjectVisible = true;handleEditProject(scope.row)"
            type="warning"
            size="small"
          >编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.projectId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="margin-left:500px;position:absolute;top: 820px"
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="8"
      v-model:current-page="pageNum"
      @current-change="onCurrentChange"
    />
  </div>

  <!-- 弹出新增项目表单 -->
  <el-dialog v-model="dialogFormAddProjectVisible" title="新增实验" width="500" style="text-align:center" >
    <el-form :model="formAddProject">
      <el-form-item label="实验名称：" :label-width="formLabelWidth" :required="true">
        <el-input v-model="formAddProject.projectName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="实验室：" :label-width="formLabelWidth" :required="true">
        <el-input v-model="formAddProject.detailNumber" required autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="isEmptyproject">提交</el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 弹出修改项目表单 -->
  <el-dialog v-model="dialogFormEditProjectVisible" title="修改实验" width="500">
    <el-form :model="formEditProject">
      <el-form-item label="实验名称" :label-width="formLabelWidth" :required="true">
        <el-input v-model="formEditProject.projectName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="实验室" :label-width="formLabelWidth" :required="true">
        <el-input v-model="formEditProject.detailNumber" required autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormEditProjectVisible = false">取消</el-button>
        <el-button type="primary" @click="isEmptyEditProject">提交</el-button>
      </div>
    </template>
  </el-dialog>
  
</template>

<style>
.el-row {
  margin-bottom: 10px;
}
.el-row:last-child {
  margin-bottom: 10px;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
}
</style>