<script setup>
//弹出表单
import { reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

const dialogFormAddVisible = ref(false);
const dialogFormEditVisible = ref(false);
const formLabelWidth = "140px";

const formAdd = reactive({
  category: "",
  basicClass: "",
  standardName: "",
  standardNumber: ""
});

const formEdit = reactive({
  standardId: "",
  category: "",
  basicClass: "",
  standardName: "",
  standardNumber: ""
});

//搜索及表格渲染
import { Search } from "@element-plus/icons-vue";
import { ref } from "vue";
const input1 = ref("");
const input2 = ref("");
const input3 = ref("");
const input4 = ref("");
const pageNum = ref(1);
const total = ref(20);
// const handleLiao = (index: number, row: Standard) => {
//   console.log(index, row)
// }

const standards = ref([]);

  const user = ref({
  })

import {userInfoService} from '@/api/user.js'
const getUserInfo = async()=>{
    //调用接口
    let result = await userInfoService();
    user.value = result.data;
    formAdd.standardName = result.data.name
}
getUserInfo();

const isCurrentUser = (row) => {
  return row.standardName === user.value.name
}

const getTooltipContent = (action) => {
  return `只能${action}自己负责的项目`
}

import { standardListService } from "@/api/project.js";
const standardList = async () => {
  let params = {
    pageNum: pageNum.value,
    category: input2.value ? input2.value : null,
    basicClass: input1.value ? input1.value : null,
    standardName: input3.value ? input3.value : null,
    standardNumber: input4.value ? input4.value : null
  };
  let result = await standardListService(params);
  total.value = result.data.total;
  standards.value = result.data.items;

  standards.value.sort((a, b) => {
  if (a.standardName === user.value.name) return -1
  if (b.standardName === user.value.name) return 1
  return 0
})
};
standardList();


const onCurrentChange = num => {
  pageNum.value = num;
  standardList();
};
//标准编辑
const handleEdit = row => {
  formEdit.standardId = row.standardId;
  formEdit.category = row.category;
  formEdit.basicClass = row.basicClass;
  formEdit.standardName = row.standardName;
  formEdit.standardNumber = row.standardNumber;
};
//标准编辑提交
import { standardEditService } from "@/api/project.js";
const isEmptyEdit = async () => {
    if( !(/^\d{11}$/.test(formEdit.standardNumber)))
  {
        ElMessage({
      type: "warning",
      message: "电话号码需为11位数字"
    });
  }
  else if (
    formEdit.category != "" &&
    formEdit.basicClass != "" &&
    formEdit.standardName != "" &&
    formEdit.standardNumber != ""
  ) {
    let params = {
      standardId: formEdit.standardId,
      basicClass: formEdit.basicClass,
      category: formEdit.category,
      standardName: formEdit.standardName,
      standardNumber: formEdit.standardNumber
    };
    let result = await standardEditService(params);
    standardList();
    ElMessage({
      type: "success",
      message: "修改成功"
    });
    dialogFormEditVisible.value = false;
  } else {
    ElMessage({
      type: "warning",
      message: "请输入全部数据，不能为空"
    });
  }
};
//标准删除
import { standardDeleteService } from "@/api/project.js";
const handleDelete = id => {
  ElMessageBox.confirm("您确认要删除吗?", "温馨提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  }).then(async () => {
    let params = { standardId: id };
    let result = await standardDeleteService(params);
    standardList();
    ElMessage({
      type: "success",
      message: "删除成功"
    });
  });
};
//新增标准
import { standardAddService } from "@/api/project.js";
const isEmpty = async () => {
  if( !(/^\d{11}$/.test(formAdd.standardNumber)))
  {
        ElMessage({
      type: "warning",
      message: "电话号码需为11位数字"
    });
  }
  else if (
    formAdd.category != "" &&
    formAdd.basicClass != "" &&
    formAdd.standardName != "" &&
    formAdd.standardNumber != ""
  ) {
    let params = {
      basicClass: formAdd.basicClass,
      category: formAdd.category,
      standardName: formAdd.standardName,
      standardNumber: formAdd.standardNumber
    };
    let result = await standardAddService(params);
    console.log(result);
    standardList();

    ElMessage({
      type: "success",
      message: "添加成功"
    });
    formAdd.category = "";
    formAdd.basicClass = "";
    formAdd.standardName = "";
    formAdd.standardNumber = "";
    dialogFormAddVisible.value = false;
  } else {
    ElMessage({
      type: "warning",
      message: "请输入全部数据，不能为空"
    });
  }
};

const search = () => {
  standardList();
};

//查看
import {useRouter } from 'vue-router';
 import {useUserInfoStore} from '@/stores/userInfo.js'
const router = useRouter();
const handleCheck = (standard) => {
  const infoStore = useUserInfoStore()
  infoStore.setInfo(standard)
 router.push('/project')
}

const handleMaterial = (standard) => {
  const infoStore = useUserInfoStore()
  infoStore.setInfo(standard)
 router.push('/material')
}
</script>





<template>
  <div>
    <el-divider />
    <h1>实验大类管理</h1>

    <el-divider />
    <div>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content ep-bg-purple" />
          <!-- <el-button type="primary">Excel导入</el-button> -->
          <el-button plain @click="dialogFormAddVisible = true" type="primary">+ 新增实验大类</el-button>
        </el-col>
        <!-- 搜索框 -->
        <el-col :span="16">
          <div class="grid-content ep-bg-purple" />
          <el-input v-model="input2" style="width: 140px" placeholder="请输入学院" />
          <el-input v-model="input1" style="width: 140px;margin-left:20px" placeholder="学科" />
          <el-input v-model="input3" style="width: 140px;margin-left:20px" placeholder="负责教师" />
          <el-input v-model="input4" style="width: 140px;margin-left:20px" placeholder="电话号码" />
          <el-button :icon="Search" circle style="margin-left:20px" @click="search" />
        </el-col>
      </el-row>
    </div>
    <!-- 表格 -->
    <el-table :data="standards" border style="width: 100%">
    <el-table-column type="index" width="50" />
    <el-table-column label="承办学院" width="220">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.category }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="所属学科" width="220">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.basicClass }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="负责教师" width="220">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.standardName }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="电话号码" width="220">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.standardNumber }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="选项">
      <template #default="scope">
        <el-tooltip
          :content="getTooltipContent('查看')"
          :disabled="isCurrentUser(scope.row)"
        >
          <el-button 
            size="small" 
            type="primary" 
            @click="handleCheck(scope.row)"
            :disabled="!isCurrentUser(scope.row)"
          >
            查看
          </el-button>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="150px" fixed="right">
      <template #default="scope">
        <el-tooltip
          :content="getTooltipContent('编辑')"
          :disabled="isCurrentUser(scope.row)"
        >
          <el-button
            plain
            @click="dialogFormEditVisible = true;handleEdit(scope.row)"
            type="warning"
            size="small"
            :disabled="!isCurrentUser(scope.row)"
          >
            编辑
          </el-button>
        </el-tooltip>
        <el-tooltip
          :content="getTooltipContent('删除')"
          :disabled="isCurrentUser(scope.row)"
        >
          <el-button 
            size="small" 
            type="danger" 
            @click="handleDelete(scope.row.standardId)"
            :disabled="!isCurrentUser(scope.row)"
          >
            删除
          </el-button>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
    <!-- 分页 -->

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

  <!-- 新增表单 -->
  <el-dialog v-model="dialogFormAddVisible" title="新增实验大类" width="500" style="text-align:center">
    <el-form :model="formAdd">
      <el-form-item label="承办学院" :label-width="formLabelWidth" :required="true">
        <el-input v-model="formAdd.category" autocomplete="off" />
      </el-form-item>
      <el-form-item label="所属学科" :label-width="formLabelWidth" :required="true">
        <el-input v-model="formAdd.basicClass" required autocomplete="off" />
      </el-form-item>
      <el-form-item label="电话号码" :label-width="formLabelWidth" :required="true">
        <el-input v-model="formAdd.standardNumber" required autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormAddVisible = false">取消</el-button>
        <el-button type="primary" @click="isEmpty()">提交</el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 弹出修改表单 -->
  <!-- 编辑表单 -->
  <el-dialog v-model="dialogFormEditVisible" title="修改实验大类" width="500" style="text-align:center">
    <el-form :model="formEdit">
      <el-form-item label="承办学院" :label-width="formLabelWidth" :required="true">
        <el-input v-model="formEdit.category" autocomplete="off" />
      </el-form-item>
      <el-form-item label="所属学科" :label-width="formLabelWidth" :required="true">
        <el-input v-model="formEdit.basicClass" required autocomplete="off" />
      </el-form-item>
      <!-- <el-form-item label="负责教师" :label-width="formLabelWidth" :required="true">
        <el-input v-model="formEdit.standardName" required autocomplete="off" />
      </el-form-item> -->
      <el-form-item label="电话号码" :label-width="formLabelWidth" :required="true">
        <el-input v-model="formEdit.standardNumber" required autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormEditVisible = false">取消</el-button>
        <el-button type="primary" @click="isEmptyEdit">提交</el-button>
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


