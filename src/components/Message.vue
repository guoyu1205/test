<template>
  <!-- 搜索区域 -->
  <div class="search-container">
    <el-row :gutter="20" class="search-row">
      <el-col :span="7">
        <div class="search-item">
          <span class="label">产品/项目/参数名称：</span>
          <el-input
            v-model="input1"
            placeholder="请输入"
            clearable
            name="ProjectName"
          />
        </div>
      </el-col>
      <el-col :span="7">
        <div class="search-item">
          <span class="label">标准名称：</span>
          <el-input
            v-model="input2"
            placeholder="请输入"
            clearable
            name="StandardName"
          />
        </div>
      </el-col>
      <el-col :span="7">
        <div class="search-item">
          <span class="label">标准编号：</span>
          <el-input
            v-model="input3"
            placeholder="请输入"
            clearable
            name="DetailNumber"
          />
        </div>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="search" :icon="Search">搜索</el-button>
      </el-col>
    </el-row>
  </div>

  <el-divider />

  <h2 class="page-title">增加内容提醒清单</h2>

  <!-- 表格区域 -->
  <el-table 
    :data="tableData1" 
    style="width: 100%" 
    height="500"
    :header-cell-style="{'text-align':'center', 'background':'#f5f7fa'}"
    :cell-style="{'text-align':'center'}"
    border
    stripe
  >
    <el-table-column prop="ApplyPerson" label="申请人" min-width="100" />
    <el-table-column prop="ApplyTime" label="申请时间" min-width="150" />
    <el-table-column prop="StandardName" label="标准名称" min-width="150" />
    <el-table-column prop="DetailNumber" label="标准编号（含年号及条款号）" min-width="200" />
    <el-table-column prop="Project" label="项目" min-width="120" />
    <el-table-column prop="Personnel" label="人员" min-width="100" />
    <el-table-column prop="Device" label="设备" min-width="120" />
    <el-table-column prop="CompareTest" label="规程" min-width="120" />
    <el-table-column prop="Sample" label="样品" min-width="120" />
    <el-table-column prop="IsHandled" label="是否处理" min-width="100">
      <template #default="scope">
        <el-tag :type="scope.row.IsHandled === '已处理' ? 'success' : 'warning'">
          {{ scope.row.IsHandled }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button 
          type="primary" 
          size="small" 
          @click="handle(scope.row)"
          :disabled="scope.row.IsHandled === '已处理'"
        >
          处理
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 导出按钮 -->
  <div class="export-container">
    <el-button 
      type="primary" 
      @click="exportToExcel" 
      :icon="Download"
      :loading="exporting"
    >
      导出增加内容提醒清单
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, Download } from '@element-plus/icons-vue'
import * as XLSX from 'xlsx'

const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
const exporting = ref(false)

// 定义数据接口
interface Message {
  MessageId: string
  ApplyPerson: string
  ApplyTime: string
  StandardName: string
  DetailNumber: string
  Project: string
  Personnel: string
  Device: string
  CompareTest: string
  Sample: string
  IsHandled: string
}

// 表格数据
const tableData1: Message[] = [
  {
    MessageId: '1',
    ApplyPerson: 'A',
    ApplyTime: '2024-11-19 23:13',
    StandardName: 'string',
    DetailNumber: 'string',
    Project: 'string',
    Personnel: 'string',
    Device: 'string',
    CompareTest: 'string',
    Sample: 'string',
    IsHandled: '未处理',
  },
  {
    MessageId: '2',
    ApplyPerson: 'BBBB',
    ApplyTime: '2024-11-19 23:13',
    StandardName: 'string',
    DetailNumber: 'string',
    Project: 'string',
    Personnel: 'string',
    Device: 'string',
    CompareTest: 'string',
    Sample: 'string',
    IsHandled: '已处理',
  },

  {
    MessageId: '3',
    ApplyPerson: 'AAAA',
    ApplyTime: '2024-11-19 23:13',
    StandardName: 'string',
    DetailNumber: 'string',
    Project: 'string',
    Personnel: 'string',
    Device: 'string',
    CompareTest: 'string',
    Sample: 'string',
    IsHandled: '未处理',
  },
  {
    MessageId: '4',
    ApplyPerson: 'AAAA',
    ApplyTime: '2024-11-19 23:13',
    StandardName: 'string',
    DetailNumber: 'string',
    Project: 'string',
    Personnel: 'string',
    Device: 'string',
    CompareTest: 'string',
    Sample: 'string',
    IsHandled: '未处理',
  },
  {
    MessageId: '5',
    ApplyPerson: 'AAAA',
    ApplyTime: '2024-11-19 23:13',
    StandardName: 'string',
    DetailNumber: 'string',
    Project: 'string',
    Personnel: 'string',
    Device: 'string',
    CompareTest: 'string',
    Sample: 'string',
    IsHandled: '未处理',
  },
  {
    MessageId: '6',
    ApplyPerson: 'AAAA',
    ApplyTime: '2024-11-19 23:13',
    StandardName: 'string',
    DetailNumber: 'string',
    Project: 'string',
    Personnel: 'string',
    Device: 'string',
    CompareTest: 'string',
    Sample: 'string',
    IsHandled: '未处理',
  },
  
  {
    MessageId: '7',
    ApplyPerson: 'AAAA',
    ApplyTime: '2024-11-19 23:13',
    StandardName: 'string',
    DetailNumber: 'string',
    Project: 'string',
    Personnel: 'string',
    Device: 'string',
    CompareTest: 'string',
    Sample: 'string',
    IsHandled: '未处理',
  },
  {
    MessageId: '8',
    ApplyPerson: 'AAAA',
    ApplyTime: '2024-11-19 23:13',
    StandardName: 'string',
    DetailNumber: 'string',
    Project: 'string',
    Personnel: 'string',
    Device: 'string',
    CompareTest: 'string',
    Sample: 'string',
    IsHandled: '未处理',
  },
 
]

// 搜索功能
const search = () => {
  ElMessage.success('搜索功能待实现')
}

// 处理按钮功能
const handle = (row: Message) => {
  row.IsHandled = '已处理'
  ElMessage.success('处理成功')
}

// 导出Excel功能
const exportToExcel = () => {
  exporting.value = true
  try {
    // 定义要导出的列
    const exportColumns = [
      { label: '申请人', prop: 'ApplyPerson' },
      { label: '申请时间', prop: 'ApplyTime' },
      { label: '标准名称', prop: 'StandardName' },
      { label: '标准编号', prop: 'DetailNumber' },
      { label: '项目', prop: 'Project' },
      { label: '人员', prop: 'Personnel' },
      { label: '设备', prop: 'Device' },
      { label: '规程', prop: 'CompareTest' },
      { label: '样品', prop: 'Sample' },
      { label: '是否处理', prop: 'IsHandled' }
    ]

    // 准备Excel数据
    const exportData = tableData1.map(row => {
      const newRow: any = {}
      exportColumns.forEach(col => {
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
    const colWidth = exportColumns.map(() => ({ wch: 15 }))
    ws['!cols'] = colWidth

    // 添加工作表到工作簿
    XLSX.utils.book_append_sheet(wb, ws, '增加内容提醒清单')

    // 导出文件
    XLSX.writeFile(wb, `增加内容提醒清单_${new Date().toLocaleDateString()}.xlsx`)
    ElMessage.success('导出成功')
  } catch (error) {
    ElMessage.error('导出失败')
    console.error(error)
  } finally {
    exporting.value = false
  }
}
</script>

<style scoped>
.search-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}

.search-row {
  display: flex;
  align-items: center;
}

.search-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.label {
  white-space: nowrap;
  color: #606266;
}

.page-title {
  text-align: center;
  margin: 20px 0;
  color: #303133;
  font-weight: 600;
}

.export-container {
  margin: 20px 0;
  text-align: center;
}

:deep(.el-table) {
  margin-top: 20px;
  border-radius: 4px;
}

:deep(.el-table th) {
  font-weight: 600;
}

:deep(.el-button--small) {
  padding: 6px 16px;
}

:deep(.el-tag) {
  min-width: 60px;
}
</style>