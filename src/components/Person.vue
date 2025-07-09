<style scoped>
/* 现有的样式保持不变 */

/* 添加新的表格容器样式 */
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

.link-container {
  display: inline-block;
}

.procedure-link {
  display: inline-flex;
  align-items: center;
  color: #409eff;
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

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

/* 表格样式调整 */
:deep(.el-table) {
  width: 100% !important;
}

:deep(.el-table__body) {
  width: 100% !important;
}

/* 修改按钮样式 */
:deep(.el-button--small) {
  padding: 6px 16px;
  font-size: 12px;
}
</style>
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
import { ref, reactive, computed } from "vue";
import { Link } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useUserInfoStore } from "@/stores/userInfo.js";
const infoStore = useUserInfoStore();

import { useTokenStore } from "@/stores/token.js";
const tokenStore = useTokenStore();
// 链接URL
const linkUrl = "https://vjs.zencdn.net/v/oceans.mp4";
const Url = reactive({
  first: "",
  second: ""
});
const tableData0 = ref([
  {
    fileId: 1,
    fileUrl: "设备A"
  }
]);
// 定义数据接口
// interface HumanList {
//   userName: string
//   trainDate: string
//   jianExamURL: string
//   jianExamStatus: string
//   jianVideoURL: string
//   jianVideoStatus: string
//   jianStatus: string
//   passDate: string
// }
import { useRouter } from "vue-router";
const router = useRouter();
const reback = () => {
  router.push("/project");
};

import { ProjectFileListService, fileDeleteService,HumanExamService,ExamEditService } from "@/api/project.js";
import { editUrlService, addUrlService } from "@/api/project.js";
const dialogFormAddVisible = ref(false);

const fileList = async () => {
  //调用接口
  let params1 = {
    projectId: infoStore.pro.projectId,
    index: 3
  };
  let result1 = await ProjectFileListService(params1);
  Url.first = result1.data[0].fileUrl;

 

  let params6 = {
    projectId: infoStore.pro.projectId,
  };
  let result6 = await HumanExamService(params6);


   tableData.value = result6.data;
};
fileList();




const editUrl = async (data, num) => {
  let params = {
    projectId: infoStore.pro.projectId,
    fileUrl: data,
    index: num
  };
  let result = await editUrlService(params);
  fileList();
};
const addUrl = async (data, num) => {
  let params = {
    projectId: infoStore.pro.projectId,
    fileUrl: data,
    index: num
  };
  let result = await addUrlService(params);
  fileList();
};
const UploadSuccess = result => {
  editUrl(result.data, 3);
};
const videoSuccess = result => {
  addUrl(result.data, 5);
  fileList();
};
const handleDelete = id => {
  ElMessageBox.confirm("您确认要删除吗?", "温馨提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  }).then(async () => {
    let params = { fileId: id };
    let result = await fileDeleteService(params);
    fileList();
    ElMessage({
      type: "success",
      message: "删除成功"
    });
  });
};
const tableData = ref([]);
const filteredTableData = computed(() => {
  return tableData.value.filter(row => {
    return !(row.s1 === '未上传' && row.s2 === '未上传')
  })
})

// 对话框相关变量
const dialogVisible = ref(false);
const editForm = reactive({
  examId:99,
  examStatus: "",
  videoStatus: "",
  s:"",
});
const currentRow = ref(null);

// 计算最终状态
const finalStatus = computed(() => {
  return editForm.examStatus === "通过" && editForm.videoStatus === "通过"
    ? "通过"
    : "未通过";
});

// 状态改变处理
const handleStatusChange = () => {
  if (currentRow.value) {
    currentRow.value.jianStatus = finalStatus.value;
  }
};

//修改按钮点击处理
const handleEdit = row => {
  currentRow.value = row;
  editForm.examId =row.examId;
  editForm.examStatus = row.s1;
  editForm.videoStatus = row.s2;
  dialogVisible.value = true;
};

// 取消编辑
const cancelEdit = () => {
  dialogVisible.value = false;
  if (currentRow.value) {
    editForm.examStatus = currentRow.value.s1;
    editForm.videoStatus = currentRow.value.s2;
  }
};

// 确认修改处理
const handleConfirmEdit = async() => {
  if (currentRow.value) {
    currentRow.value.s1 = editForm.examStatus;
    currentRow.value.s2 = editForm.videoStatus;
    currentRow.value.s = finalStatus.value;

    // 更新通过时间
    if (finalStatus.value === "通过") {
      currentRow.value.times = new Date().toLocaleString();
    } else {
      currentRow.value.times = "";
    }

    let params = {
      examId: editForm.examId,
      s1: editForm.examStatus,
      s2: editForm.videoStatus,
      s: finalStatus.value,
      times: new Date().toLocaleString(),
    };
   let result = await ExamEditService(params);
    ElMessage.success("修改成功");

    dialogVisible.value = false;
    //fileList();
  }
};

let playerOptions = ref({
  // height: 200,
  // width: document.documentElement.clientWidth, //播放器宽度
  playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
  autoplay: false, // 如果true,浏览器准备好时开始回放。
  muted: false, // 默认情况下将会消除任何音频。
  loop: true, // 导致视频一结束就重新开始。
  preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
  language: "zh-CN",
  aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
  fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
  notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
  controls: true,
  controlBar: {
    timeDivider: true,
    durationDisplay: true,
    remainingTimeDisplay: false,
    fullscreenToggle: true // 全屏按钮
  }
});
</script>

<template>
  <el-divider />
  <h1>准入考核</h1>
  <el-row :gutter="20">
    <el-col :span="250">
      <!-- <div>
        <el-text class="mx-1" type="success">所属学院：{{infoStore.info.basicClass}}</el-text>
        <el-text class="mx-1" style="margin-left:40px" type="success">学科：{{infoStore.info.category}}</el-text>
        <el-text
          class="mx-1"
          style="margin-left:40px"
          type="success"
        >负责教师：{{infoStore.info.standardName}}</el-text>
        <el-text
          class="mx-1"
          style="margin-left:40px"
          type="success"
        >电话号码：{{infoStore.info.standardNumber}}</el-text>
        <div style="margin-top: 20px;">
          <el-text
            class="mx-1"
            style="margin-left:40px"
            type="success"
          >实验名称：{{infoStore.pro.projectName}}</el-text>
          <el-text
            class="mx-1"
            style="margin-left:40px"
            type="success"
          >实验室：{{infoStore.pro.detailNumber}}</el-text>
        </div>
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






    </el-col>
    <el-col :span="100" :offset="1">
      <el-upload
        ref="upload"
        class="upload-demo"
        :limit="1"
        :on-exceed="handleExceed"
        :auto-upload="true"
        action="/api/upload"
        name="file"
        :headers="{'Authorization':tokenStore.token}"
        accept=".pdf, .PDF"
        :on-success="UploadSuccess"
      >
        <template #trigger>
          <el-button type="primary">上传准入考核试卷</el-button>
        </template>
      </el-upload>
      <!-- 显示规程pdf -->
      <div class="link-container">
        <a class="procedure-link" :href="Url.first" target="_blank" rel="noopener noreferrer">
          <el-icon class="link-icon">
            <Link />
          </el-icon>准入试卷
        </a>
      </div>
    </el-col>
  </el-row>
  <el-divider />



  <!-- 批改检测人员考核情况 -->
  <div class="table-container">
    <el-table :data="filteredTableData" style="width: 100%; margin-top: 20px" height="480" border>
      <el-table-column type="index" label="序号" align="center" min-width="60" />
      <el-table-column prop="name" label="学生" align="center" min-width="80" />
      <el-table-column prop="phoneNumber" label="联系方式" align="center" min-width="130"></el-table-column>
      <el-table-column label="准入试卷链接" align="center" min-width="130">
        <template #default={row}>
          <div class="link-container">
            <a class="procedure-link" :href="row.url1" target="_blank" rel="noopener noreferrer">
              <el-icon class="link-icon">
                <Link />
              </el-icon>准入试卷
            </a>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="s1" label="准入试卷通过情况" align="center" min-width="150" >
        <template #default="scope">
          <span :style="{ color: scope.row.s1 === '通过' ? '#67C23A' : '#F56C6C' }">{{ scope.row.s1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="考核视频链接" align="center" min-width="130">
        <template #default={row}>
          <div class="link-container">
            <a class="procedure-link" :href="row.url2" target="_blank" rel="noopener noreferrer">
              <el-icon class="link-icon">
                <Link />
              </el-icon>考核视频
            </a>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="s2" label="考核视频通过情况" align="center" min-width="150" >
        <template #default="scope">
          <span :style="{ color: scope.row.s2 === '通过' ? '#67C23A' : '#F56C6C' }">{{ scope.row.s2 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="s" label="最终通过情况" align="center" min-width="120">
        <template #default="scope">
          <span :style="{ color: scope.row.s === '通过' ? '#67C23A' : '#F56C6C' }">{{ scope.row.s }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="times" label="通过时间" align="center" min-width="120" />
      <el-table-column label="操作" align="center" min-width="100">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">批改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- 修改对话框 -->
  <el-dialog v-model="dialogVisible" title="修改通过情况" width="400px" align-center>
    <el-form :model="editForm" label-width="140px">
      <el-form-item label="考核文件通过情况">
        <el-radio-group v-model="editForm.examStatus" @change="handleStatusChange">
          <el-radio label="通过">通过</el-radio>
          <el-radio label="未通过">未通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="考核视频通过情况">
        <el-radio-group v-model="editForm.videoStatus" @change="handleStatusChange">
          <el-radio label="通过">通过</el-radio>
          <el-radio label="未通过">未通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="最终通过情况">
        <span :style="{ color: finalStatus === '通过' ? '#67C23A' : '#F56C6C' }">{{ finalStatus }}</span>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelEdit">取消</el-button>
        <el-button type="primary" @click="handleConfirmEdit">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 返回按钮 -->
  <div style="margin-top:20px;margin-left:560px;display: flex;align-items: center; gap: 10px;">
    <el-button type="primary" style="margin-left: 80px;" @click="reback">返回</el-button>
  </div>
</template>



