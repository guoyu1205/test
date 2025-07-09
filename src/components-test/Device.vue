<template>
  <el-divider />
  <h1>设备计划采购清单</h1>
  <el-divider />

  <!-- 搜索栏 -->
  <el-row :gutter="2">
    <el-col :span="8">
      <el-button 
        type="primary" 
        @click="exportToExcel"
        :loading="exporting"
        :icon="Download"
      >
        导出设备计划采购清单
      </el-button>
    </el-col>
    
    <el-col :span="16">
      <el-input v-model="input1" style="width: 140px;margin-left:300px" placeholder="项目名称名称" />
      <el-input v-model="input2" style="width: 260px;margin-left:20px" placeholder="请输入标准编号（含年号）及条款号" />
      <el-button :icon="Search" circle style="margin-left:20px" />
    </el-col>
  </el-row>

  <!-- 表格区域 -->
  <div class="table-container">
    <el-table 
      :data="tableData" 
      style="width: 100%; margin-top: 20px" 
      height="510" 
      border
    >
      <el-table-column type="index" label="序号" align="center" min-width="60" />
      <!-- <el-table-column prop="userName" label="人员" align="center" min-width="80" /> -->
      <el-table-column prop="category" label="类别" align="center" min-width="80" />
      <el-table-column prop="projectName" label="项目名称" align="center" min-width="80" />
      <el-table-column prop="standardName" label="标准名称" align="center" min-width="80" />
      <el-table-column prop="detailNumber" label="标准编号（含年号）及条款号" align="center" min-width="160" />
      <el-table-column prop="deviceName" label="设备名称" align="center" min-width="100" />
      <el-table-column prop="status" label="状态（计划采购、采购完成）" align="center" min-width="120">
        <template #default="scope">
          <el-tag :type="scope.row.status === '采购完成' ? 'success' : 'warning'">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" align="center" width="100" fixed="right">
        <template #default="scope">
          <el-button 
            type="warning" 
            size="small" 
            @click="handleStatusChange(scope.row)"
            :disabled="scope.row.status === '采购完成'"
          >
            修改
          </el-button>
        </template>
      </el-table-column> -->
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
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { Search, Download } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import * as XLSX from 'xlsx'

const input1 = ref('')
const input2 = ref('')
const exporting = ref(false)

// 定义数据接口
interface DeviceList {
  userName: string
  category: string   
  projectName: string
  standardName: string
  detailNumber: string
  deviceName: string
  status: string 
}

// 表格数据
const tableData: DeviceList[] = [
  {
    userName: '小强',
    category: '医用一次性防护服',  
    projectName: '撕破强力',
    standardName: '撕破强力',
    detailNumber: 'GB 19082-2023 4.3.9',
    deviceName: '耐磨损测试仪',
     status: '采购完成' 
  },
  
]

// 修改状态功能
const handleStatusChange = (row: DeviceList) => {
  row.status = '采购完成'
  ElMessage.success('状态修改成功')
}

// 导出Excel功能
const exportToExcel = () => {
  exporting.value = true
  try {
    // 定义要导出的列
    const exportColumns = [
      { label: '序号', prop: 'index' },
      { label: '人员', prop: 'userName' },
      { label: '类别', prop: 'category' },
      { label: '项目名称', prop: 'projectName' },
      { label: '标准名称', prop: 'standardName' },
      { label: '标准编号（含年号）及条款号', prop: 'detailNumber' },
      { label: '设备名称', prop: 'deviceName' },
      { label: '状态', prop: 'status' }
    ]

    // 准备Excel数据
    const exportData = tableData.map((row, index) => {
      const newRow: any = {
        index: index + 1
      }
      exportColumns.slice(1).forEach(col => {
        newRow[col.label] = row[col.prop]
      })
      return newRow
    })

    // 创建工作簿和工作表
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(exportData, {
      header: exportColumns.map(col => col.label)
    })

    // 设置列宽
    const colWidth = exportColumns.map(col => {
      if (col.label === '标准编号（含年号）及条款号') {
        return { wch: 40 }
      }
      return { wch: 15 }
    })
    ws['!cols'] = colWidth

    // 添加工作表到工作簿
    XLSX.utils.book_append_sheet(wb, ws, '设备计划采购清单')

    // 导出文件
    const fileName = `设备计划采购清单_${new Date().toLocaleDateString()}.xlsx`
    XLSX.writeFile(wb, fileName)
    
    ElMessage.success('导出成功')
  } catch (error) {
    console.error('导出失败:', error)
    ElMessage.error('导出失败，请稍后重试')
  } finally {
    exporting.value = false
  }
}
</script>

<style scoped>
.link-container {
  display: inline-block;
}

.procedure-link {
  display: inline-flex;
  align-items: center;
  color: #409EFF;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.procedure-link:hover {
  color: #66b1ff;
  text-decoration: underline;
}

.link-icon {
  margin-right: 4px;
  font-size: 16px;
}

/* 表格容器样式 */
.table-container {
  width: 100%;
  overflow-x: hidden;
}

/* 确保表格头部和内容对齐 */
:deep(.el-table__header-wrapper),
:deep(.el-table__body-wrapper) {
  width: 100% !important;
}

:deep(.el-table__header),
:deep(.el-table__body) {
  width: 100% !important;
  table-layout: fixed !important;
}

/* 防止表格溢出 */
:deep(.el-table) {
  width: 100% !important;
  overflow-x: hidden !important;
}

/* 导出按钮样式 */
.el-button {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

:deep(.el-button .el-icon) {
  margin-right: 4px;
}

/* 表格样式美化 */
:deep(.el-table) {
  margin-top: 20px;
  border-radius: 4px;
}

:deep(.el-table th) {
  background-color: #f5f7fa !important;
  font-weight: 600;
}

:deep(.el-table td) {
  padding: 8px 0;
}

/* 状态标签样式 */
:deep(.el-tag) {
  min-width: 80px;
}
</style>

