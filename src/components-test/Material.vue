<script  setup>
//弹出的项目表单处理逻辑
import { useUserInfoStore } from "@/stores/userInfo.js";
import { ElMessage, ElMessageBox } from "element-plus";
const infoStore = useUserInfoStore();

import { reactive, ref } from "vue";

const dialogFormAddSampleVisible = ref(false);
const dialogFormEditSampleVisible = ref(false);
const formLabelWidth = "140px";

const formAddSample = reactive({
  productName: "",
  specificationModel: "",
  manufacturer: "",
  batchNumber: ""
});
const formEditSample = reactive({
  productId: "",
  productName: "",
  specificationModel: "",
  manufacturer: "",
  batchNumber: "",
  text:""
});

const samples = ref([
  {
    productId: "3",
    productName: "产品2",
    specificationModel: "型号a",
    manufacturer: "厂家A",
    batchNumber: "65批"
  }
]);
import {
  sampleListService,
  sampleAddService,
  sampleEditService,
  sampleDeleteService
} from "@/api/project.js";
const sampleList = async () => {
  let params = {
    standardId: infoStore.info.standardId
  };
  let result = await sampleListService(params);
  samples.value = result.data;
};
sampleList();

const handleEditSample = row => {
  formEditSample.productId = row.productId;
  formEditSample.productName = row.productName;
  formEditSample.specificationModel = row.specificationModel;
  formEditSample.manufacturer = row.manufacturer;
  formEditSample.batchNumber = row.batchNumber;
};

const isEmptyEditSample = async () => {
  if (
    formEditSample.productName != "" &&
    formEditSample.specificationModel != "" &&
    formEditSample.manufacturer != "" &&
    formEditSample.batchNumber != ""
  ) {
    let params = {
      productId: formEditSample.productId,
      productName: formEditSample.productName,
      specificationModel: formEditSample.specificationModel,
      manufacturer: formEditSample.manufacturer,
      batchNumber: formEditSample.batchNumber
    };
    let result = await sampleEditService(params);
    sampleList();
    ElMessage({
      type: "success",
      message: "申请成功"
    });
    dialogFormEditSampleVisible.value = false;
  } else {
    ElMessage({
      type: "warning",
      message: "请输入全部数据，不能为空"
    });
  }
};



const cancel =()=>{
     formAddSample.productName = "";
    formAddSample.specificationModel = "";
    formAddSample.manufacturer = "";
    formAddSample.batchNumber = "";
    dialogFormAddSampleVisible.value = false;
}

const handleDelete = id => {
  ElMessageBox.confirm("您确认要删除吗?", "温馨提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  }).then(async () => {
    let params = { productId: id };
    let result = await sampleDeleteService(params);
    sampleList();
    ElMessage({
      type: "success",
      message: "删除成功"
    });
  });
};

import {useRouter} from 'vue-router'
 const router = useRouter();
const reback = () =>{
    router.push('/common')
}
</script>

<template>
  <el-divider />
  <h1>料模块（样品信息管理）</h1>
  <div>
    <el-text class="mx-1" type="success">大类：{{infoStore.info.basicClass}}</el-text>
    <el-text class="mx-1" style="margin-left:100px" type="success">类别：{{infoStore.info.category}}</el-text>
    <el-text
      class="mx-1"
      style="margin-left:100px"
      type="success"
    >标准名称：{{infoStore.info.standardName}}</el-text>
    <el-text
      class="mx-1"
      style="margin-left:100px"
      type="success"
    >标准编号（含年号）：{{infoStore.info.standardNumber}}</el-text>
  </div>
  <el-divider />

  <el-table :data="samples" border style="width: 100%" height="380">
    <el-table-column type="index" width="50" />
    <el-table-column label="产品名称">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.productName }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="规格型号">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.specificationModel}}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="生产厂家">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.manufacturer}}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="批号">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.batchNumber}}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="操作" width="150px" fixed="right">
      <template #default="scope">
        <el-button
          plain
          @click="dialogFormEditSampleVisible = true;handleEditSample(scope.row)"
          type="warning"
          size="small"
        >申请样品</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 返回和新增按钮 -->
  <div style="margin-top:20px;margin-left:500px;">
    <el-button type="primary" @click="reback">返回</el-button>
  </div>


  <!-- 弹出修改项目表单 -->
  <el-dialog v-model="dialogFormEditSampleVisible" title="样品申请" width="500">
    <el-form :model="formEditSample">
      <el-form-item label="申请需求：" :label-width="formLabelWidth" :required="true">
        <el-input v-model="formEditSample.text" autocomplete="off" />
      </el-form-item>
      
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormEditSampleVisible = false">取消</el-button>
        <el-button type="primary" @click="isEmptyEditSample">提交</el-button>
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


