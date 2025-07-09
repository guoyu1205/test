
<template>

<el-divider />
    <h1>样品需求清单</h1>
    <div>

    </div>
<el-divider />
<!-- 搜索栏-->
    <el-row :gutter="2">
    <el-col :span="8">
      <el-button plain @click="dialogFormAddProjectVisible = true" type="primary">
    导出项目清单
  </el-button>
    </el-col>
    
    <el-col :span="16" >
    <el-input v-model="input1" style="width: 140px;margin-left:300px" placeholder="标准名称" />
    <el-input v-model="input2" style="width: 200px;margin-left:20px" placeholder="请输入标准编号（含年号）" />
    <el-button :icon="Search" circle style="margin-left:20px" />
    </el-col>
  </el-row>

<!--表格-->
  <el-table :data="tableData" border  style="width: 100%" height = "400">
   <el-table-column fixed="left" type="index" label="序号"width="60" />
        <!-- <el-table-column label="需求人" width="80">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.userName }}</span>
        </div>
      </template>
    </el-table-column> -->
            <el-table-column label="标准名称" width="120">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.standardName }}</span>
        </div>
      </template>
    </el-table-column>
            <el-table-column label="标准编号（含年号）" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.standardNumber }}</span>
        </div>
      </template>
    </el-table-column>
            <el-table-column label="产品名称" width="120">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.productName }}</span>
        </div>
      </template>
    </el-table-column>
            <el-table-column label="规格型号" width="120">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.specificationModel }}</span>
        </div>
      </template>
    </el-table-column>
            <el-table-column label="申请需求（文本）" width="200">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.needNumer }}</span>
        </div>
      </template>
    </el-table-column>
        <el-table-column label="生产厂家" width="120" >
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.manufacture }}</span>
        </div>
      </template>
    </el-table-column>
            <el-table-column label="实际数量" width="90">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.number }}</span>
        </div>
      </template>
    </el-table-column>
            <el-table-column label="申请需求时间" width="120">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.applyDate }}</span>
        </div>
      </template>
    </el-table-column>
            <el-table-column label="样品发放时间" width="120" >
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.giveDate }}</span>
        </div>
      </template>
    </el-table-column>
        <el-table-column label="状态" width="120" fixed="right">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.status }}</span>
        </div>
      </template>
    </el-table-column>
        <el-table-column label="操作" align="center" width="200" fixed="right">
        <template #default="scope">
          <el-button
            plain
            @click="dialogFormEditVisible = true;handleEdit(scope.row)"
            type="warning"
            size="small"
          >编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.standardId)">删除</el-button>
        </template>
      </el-table-column>
  </el-table>
<!-- 弹出修改表单-->
  <el-dialog v-model="dialogFormEditVisible" title="处理需求" width="500">
    <el-form :model="formEdit" >
      <el-form-item label="实际数量" :label-width="formLabelWidth" :required = "true">
        <el-input v-model="formEdit.number"  autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormEditVisible = false">取消</el-button>
        <el-button type="primary" @click="isEmptyEdi">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {
  Search,
} from '@element-plus/icons-vue'
import { reactive,ref } from 'vue'
import { ElMessageBox } from "element-plus";
import { ElMessage } from "element-plus";
const dialogFormEditVisible = ref(false)
const formEdit = reactive({
  number:'',
})
const input1 = ref('')
const input2 = ref('')
interface samList {
  samId: string      //样品需求id
  userName:string      //需求人
  standardName:string  //标准名称
  standardNumber:string   //标准编号（含年号）
  productName: string       //产品名称
  specificationModel:string  //规格型号
  needNumer:string        //申请需求
  manufacture:string      //生产厂家
  number:string       //实际数量（此产品的实际数量）
  applyDate:string    //申请时间
  giveDate:string     //样品发放时间
  status:string       //状态
}

const handleEdit = (index: number, row: samList) => { 
    if(row.status=="已发放"){
      ElMessage.error("状态为已发放，不能再次修改");
    }
    else{
    formEdit.number = row.number;
    dialogFormEditVisible.value = true;
     
    }
}
const tableData: samList[] = [
  
  {
  userName:'小强',     //需求人
  standardName:'医用一次性防护服',   //标准名称
  standardNumber:'GB 19082-2023',    //标准编号（含年号）
  productName: '防护头盔',        //产品名称
  specificationModel:'型号3000',   //规格型号
  needNumer:'100',         //申请需求
  manufacture:'北京一公司',       //生产厂家
  number:'100',       //实际数量（此产品的实际数量）
  applyDate:'2024-12-16',     //申请时间
  giveDate:'2024-12-16',      //样品发放时间
  status:'申请需求',       //状态
  },


]

</script>
