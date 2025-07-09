
<style scoped>
.info-wrapper {
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 40px;
  margin-bottom: 20px;
}

.info-row:last-child {
  margin-bottom: 0;
}

.info-item {
  display: flex;
  align-items: center;
  font-size: 16px;
}

.label {
  color: #909399; /* 标签颜色：浅灰色 */
  font-weight: 500;
}

.value {
  color: #409EFF; /* 值的颜色：绿色 */
  margin-left: 4px;
  font-weight: 400;
}

/* 响应式布局 */
@media screen and (max-width: 768px) {
  .info-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .info-item {
    font-size: 14px;
  }
}
</style>
<script  setup>
//import  { TableColumnCtx } from 'element-plus'
import { useUserInfoStore } from "@/stores/userInfo.js";
import { ElMessage, ElMessageBox } from "element-plus";
const infoStore = useUserInfoStore();

import {useTokenStore} from '@/stores/token.js'
const tokenStore = useTokenStore();

const formAdd = reactive({
  deviceName: "",
  manufacturer: "",
  deviceURL:"",
  detail: ""
});

const formEdit = reactive({
  deviceId:"",
  deviceName: "",
  manufacturer: "",
  deviceURL:"",
  detail: ""
});
const uploadSuccess = (result)=>{
    formAdd.deviceURL = result.data;
}
const EditUploadSuccess = (result)=>{
    formEdit.deviceURL = result.data;
}
import { reactive, ref } from "vue";
const dialogFormAddVisible = ref(false);
const dialogFormEditVisible =ref(false);
import { Plus } from "@element-plus/icons-vue";
let tableData = ref([

])
import {
  machineListService,
   machineAddService,
  machineEditService,
   machineDeleteService
} from "@/api/project.js";
let spanArr = [];
let pos = 0;
//List
const machineList = async () => {
  let params = {
    projectId: infoStore.pro.projectId
  };
  let result = await machineListService(params);
  tableData.value = result.data;

  const getSpanArr = tableData => {
    for (var i = 0; i < tableData.length; i++) {
      if (i === 0) {
        spanArr = [];
        spanArr.push(1);
        pos = 0;
      } else {
        // 判断当前元素与上一个元素是否相同
        if (tableData[i].deviceName === tableData[i - 1].deviceName) {
          spanArr[pos] += 1;
          spanArr.push(0);
        } else {
          spanArr.push(1);
          pos = i;
        }
      }
    }
  };
  getSpanArr(result.data);
  
};
machineList();

const cellMerge = ({ row, column, rowIndex, columnIndex }) => {
    if (columnIndex === 0) {
      const _row = spanArr[rowIndex];
      const _col = _row > 0 ? 1 : 0;
      return {
        rowspan: _row,
        colspan: _col
      };
    }
  };

import { useRouter } from "vue-router";
const router = useRouter();
const reback = () => {
  router.push("/project");
};

//Add
const isEmpty =async () => {
  if (
    formAdd.deviceName != "" &&
    formAdd.manufacturer != "" &&
    formAdd.deviceURL != "" &&
    formAdd.detail != ""
  ) {
    let params = {
      deviceName: formAdd.deviceName,
      manufacturer: formAdd.manufacturer,
      deviceURL:formAdd.deviceURL,
      detail: formAdd.detail,
      projectId: infoStore.pro.projectId
    };
    let result = await machineAddService(params);
    machineList();

    ElMessage({
      type: "success",
      message: "添加成功"
    });
    formAdd.deviceName = "";
    formAdd.manufacturer = "";
    formAdd.deviceURL = "",
    formAdd.detail = "";
    dialogFormAddVisible.value = false;
  } else {
     ElMessage({
      type: "warning",
      message: "请输入全部数据，不能为空"
    });
  }
};

const cancel =()=>{
     formAdd.deviceName = "";
    formAdd.manufacturer = "";
    formAdd.deviceURL = "",
    formAdd.detail = "";
    dialogFormAddVisible.value = false;
}

//Edit
const handleEdit = (row) => {
  formEdit.deviceId = row.deviceId
  formEdit.deviceName = row.deviceName
  formEdit.manufacturer = row.manufacturer
  formEdit.deviceURL = row.deviceURL
  formEdit.detail = row.detail
   dialogFormEditVisible.value = true;
  }

  const EditIsEmpty = async () => {
  if (formEdit.deviceName != "" && formEdit.manufacturer != ""&&formEdit.deviceURL != ""&&formEdit.detail != "") {
    let params = {
      deviceId: formEdit.deviceId,
      deviceName: formEdit.deviceName,
      manufacturer: formEdit.manufacturer,
      deviceURL:formEdit.deviceURL,
      detail:formEdit.detail
    };
    let result = await machineEditService(params);
    machineList();
    ElMessage({
      type: "success",
      message: "修改成功"
    });
    dialogFormEditVisible.value  = false;
  } else {
    ElMessage({
      type: "warning",
      message: "请输入全部数据，不能为空"
    });
  }
};

//Delete
const handleDelete = id => {
  ElMessageBox.confirm("您确认要删除吗?", "温馨提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  }).then(async () => {
    let params = { deviceId: id };
    let result = await machineDeleteService(params);
    machineList();
    ElMessage({
      type: "success",
      message: "删除成功"
    });
  });
};
</script>

<template>
  <el-divider />
  <h1>实验器材</h1>
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
    <br />
    <br />
    <el-text
      class="mx-1"
      style="margin-left:100px"
      type="success"
    >实验名称：{{infoStore.pro.projectName}}</el-text>
    <el-text
      class="mx-1"
      style="margin-left:100px"
      type="success"
    >实验室：{{infoStore.pro.detailNumber}}</el-text>
  </div> -->

       <div class="info-wrapper">
    <!-- 第一行信息 -->
    <div class="info-row">
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

    <!-- 第二行信息 -->
    <div class="info-row">
      <div class="info-item">
        <span class="label">实验名称：</span>
        <span class="value">{{ infoStore.pro.projectName }}</span>
      </div>
      <div class="info-item">
        <span class="label">实验室：</span>
        <span class="value">{{ infoStore.pro.detailNumber }}</span>
      </div>
    </div>
  </div>






  <el-divider />

  <div>
    <el-table
      :data="tableData"
      :span-method="cellMerge"
      border
      style="width: 100%; margin-top: 20px"
      height="480"
    >
      <el-table-column prop="deviceName" label="器材名称" width="180" />
      <el-table-column prop="manufacturer" label="生产厂家" />
       <el-table-column prop="deviceURL" label="器材图片" width="150px" fixed="right">
         <template #default="{row}">
          <div class="demo-image__preview">
            <el-image
              style="width: 30px; height: 30px"
              :src="row.deviceURL"
              :zoom-rate="1.2"
              :max-scale="7"
              :min-scale="0.2"
              :preview-src-list="[row.deviceURL]"
              preview-teleported="true"
              fit="cover"
            />
          </div>   
          </template> 
      </el-table-column>
      <el-table-column prop="detail" label="详情" width="700px"/>
      <el-table-column prop label="操作" width="150px" fixed="right">
        <template #default="{row}">
          <el-button
            plain
            size="small"
            @click="handleEdit(row)"
            type="warning"
          >编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(row.deviceId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 返回和新增按钮 -->
  <div style="margin-top:20px;margin-left:500px;">
    <el-button plain @click="dialogFormAddVisible = true" type="primary">+ 添加器材</el-button>
    <el-button type="primary" @click="reback">返回</el-button>
  </div>

  <!-- 弹出添加表单-->
  <el-dialog v-model="dialogFormAddVisible" title="添加器材" width="500" center>
    <el-form :model="formAdd">
      <el-form-item label="器材名称：" :label-width="formLabelWidth">
        <el-input v-model="formAdd.deviceName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="生产厂家：" :label-width="formLabelWidth">
        <el-input v-model="formAdd.manufacturer" autocomplete="off" />
      </el-form-item>
      <!-- 图片-->
      <el-form-item label="器材图片：" :label-width="formLabelWidth">
        <el-upload
          class="avatar-uploader"
          :auto-upload="true"
          :show-file-list="false"
          action="/api/upload"
            name="file"
            :headers="{'Authorization':tokenStore.token}"
          :on-success="uploadSuccess"
        >
          <img v-if="formAdd.deviceURL" :src="formAdd.deviceURL" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="详    情：" :label-width="formLabelWidth">
        <el-input v-model="formAdd.detail" autocomplete="off" />
      </el-form-item>
    </el-form>
  <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="isEmpty">提交</el-button>
      </div>
    </template>
  </el-dialog>


  <!-- 弹出修改表单-->
  <el-dialog v-model="dialogFormEditVisible" title="修改器材信息" width="500" center>
    <el-form :model="formEdit">
      <el-form-item label="器材名称：" :label-width="formLabelWidth">
        <el-input v-model="formEdit.deviceName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="生产厂家：" :label-width="formLabelWidth">
        <el-input v-model="formEdit.manufacturer" autocomplete="off" />
      </el-form-item>
      <!-- 图片-->
      <el-form-item label="器材图片：" :label-width="formLabelWidth">
        <el-upload
          class="avatar-uploader"
          :auto-upload="true"
          :show-file-list="false"
          action="/api/upload"
            name="file"
            :headers="{'Authorization':tokenStore.token}"
          :on-success="EditUploadSuccess"
        >
          <img v-if="formEdit.deviceURL" :src="formEdit.deviceURL" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="详    情：" :label-width="formLabelWidth">
        <el-input v-model="formEdit.detail" autocomplete="off" />
      </el-form-item>
    </el-form>
  <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormEditVisible = false;">取消</el-button>
        <el-button type="primary" @click="EditIsEmpty">提交</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>

