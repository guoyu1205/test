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

const standards = ref([

]);

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
};
standardList();

const onCurrentChange = num => {
  pageNum.value = num;
  standardList();
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
 router.push('/projectTest')
}

const handleMaterial = (standard) => {
  const infoStore = useUserInfoStore()
  infoStore.setInfo(standard)
 router.push('/materialTest')
}
</script>





<template>
  <div>
    <el-divider />
    <h1>实验大类</h1>

    <el-divider />
    <div>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content ep-bg-purple" />
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
      <el-table-column label="所属学院" width="240">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.category }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="学科" width="240">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.basicClass }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="负责教师" width="240">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.standardName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="电话号码" width="240">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.standardNumber }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="选项">
        <template #default="scope">
          <!-- <el-button size="small" @click="handleMaterial(scope.row)">料</el-button> -->
          <el-button size="small" type="primary" @click="handleCheck(scope.row)">查看</el-button>
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


