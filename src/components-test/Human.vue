<template>
  <el-divider />
  <h1>我的实验能力</h1>
  <el-divider />

  <!-- 搜索栏 -->
  <el-row :gutter="2">
    <el-col :span="8">
      <el-button 
        type="primary" 
        @click="handleExport"
        :loading="exporting"
        :icon="Download"
      >
        导出
      </el-button>
    </el-col>
    
    <el-col :span="16">
      <el-input v-model="input1" style="width: 140px;margin-left:300px" placeholder="实验名称" />
      <el-input v-model="input2" style="width: 260px;margin-left:20px" placeholder="负责教师" />
      <el-button :icon="Search" circle style="margin-left:20px" />
    </el-col>
  </el-row>

  <!-- 批改检测人员考核情况 -->
  <div class="table-container">
    <el-table 
      :data="tableData" 
      style="width: 100%; margin-top: 20px" 
      height="510" 
      border
    >
      <el-table-column type="index" label="序号" align="center" min-width="60" />
      <!-- <el-table-column prop="userName" label="人员" align="center" min-width="80" /> -->
      <el-table-column prop="category" label="所属学院" align="center" min-width="80" />
      <el-table-column prop="projectName" label="实验名称" align="center" min-width="80" />
      <el-table-column prop="basicClass" label="所属学科" align="center" min-width="80" />
      <el-table-column prop="standardName" label="负责教师" align="center" min-width="160" />
      <el-table-column prop="standardNumber" label="电话号码" align="center" min-width="130" >
      </el-table-column>
      <el-table-column label="准入试卷链接" align="center" min-width="130">
        <template #default={row}>
          <div class="link-container">
            <a class="procedure-link" :href="row.url1" target="_blank" rel="noopener noreferrer">
              <el-icon class="link-icon"><Link /></el-icon>准入试卷
            </a>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="考核视频链接" align="center" min-width="130">
        <template #default={row}>
          <div class="link-container">
            <a class="procedure-link" :href="row.url2" target="_blank" rel="noopener noreferrer">
              <el-icon class="link-icon"><Link /></el-icon>考核视频
            </a>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="times" label="通过时间" align="center" min-width="120" />
    </el-table>
  </div>
</template>

<script setup>
import { ref, reactive ,computed} from 'vue'
import { Link, Search, Download } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import * as XLSX from 'xlsx'

const input1 = ref('')
const input2 = ref('')
const exporting = ref(false)

// 链接URL
const linkUrl = 'https://vjs.zencdn.net/v/oceans.mp4'

// 定义数据接口


// 表格数据
const tableData =ref( [
  {
    name: '',
    category: '',  
    projectName: '',
    basicClass:"",
    standardName:"",
    standardNumber:"",
    trainDate: '',
    url1: '',
    url2: '',
    times: '',
  },
  // ... 其他数据保持不变
])
import { abListService} from "@/api/project.js";
import {userInfoService} from '@/api/user.js'
const getFileInfo = async () => {
  let result = await userInfoService();
  let params = {
    userId: result.data.userId
  };
  let result1 = await abListService(params);
  console.log(result1.data)
  tableData.value = result1.data;
};
getFileInfo();

// 导出Excel功能
// 定义导出的列配置
// 导出配置
const exportConfig = computed(() => ({
  fileName: '我的实验能力',
  sheetName: '我的实验能力表',
  columns: [
    { label: '序号', prop: 'index', width: 10 },
    // { label: '姓名', prop: 'name', width: 15 },
    { label: '所属学院', prop: 'category', width: 20 },
    { label: '实验名称', prop: 'projectName', width: 20 },
    { label: '所属学科', prop: 'basicClass', width: 20 },
    { label: '负责教师', prop: 'standardName', width: 20 },
    { label: '电话号码', prop: 'standardNumber', width: 20 },
    // { label: '标准编号', prop: 'detailNumber', width: 20 },    standardNumber
    // { label: '培训完成时间', prop: 'times', width: 15 },
    { label: '准入试卷链接', prop: 'url1', width: 40 },
    { label: '考核视频文件', prop: 'url2', width: 40 },
    { label: '考核通过时间', prop: 'times', width: 15 }

  ]
}))

// 格式化日期
const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString()
}

// 格式化导出数据
const formatExportData = computed(() => {
  return tableData.value.map((row, index) => {
    const newRow = {}
    exportConfig.value.columns.forEach(col => {
      if (col.prop === 'index') {
        newRow[col.label] = index + 1
      } else {
        let value = row[col.prop]
        // 对特定字段进行格式化
        if (['trainDate', 'times'].includes(col.prop)) {
          value = formatDate(value)
        }
        newRow[col.label] = value
      }
    })
    return newRow
  })
})

// 创建样式配置
const createStyles = () => {
  // 表头样式
  const headerStyle = {
    font: { bold: true },
    alignment: { horizontal: 'center' },
    fill: { fgColor: { rgb: "CCCCCC" } }
  }
  
  // 单元格样式
  const cellStyle = {
    alignment: { horizontal: 'center', vertical: 'center' }
  }
  
  return {
    headerStyle,
    cellStyle
  }
}

// 导出Excel
const handleExport = async () => {
  try {
    const { fileName, sheetName, columns } = exportConfig.value
    const styles = createStyles()
    
    // 创建工作簿
    const wb = XLSX.utils.book_new()
    
    // 创建工作表
    const ws = XLSX.utils.json_to_sheet(formatExportData.value)
    
    // 设置列宽
    ws['!cols'] = columns.map(col => ({ wch: col.width }))
    
    // 将工作表添加到工作簿
    XLSX.utils.book_append_sheet(wb, ws, sheetName)
    
    // 导出文件
    const exportFileName = `${fileName}_${formatDate(new Date())}.xlsx`
    XLSX.writeFile(wb, exportFileName)
    
    ElMessage.success('导出成功')
  } catch (error) {
    console.error('导出错误:', error)
    ElMessage.error('导出失败，请重试')
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
</style>