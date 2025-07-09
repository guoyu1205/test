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
  color: #409eff; /* 值的颜色：绿色 */
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

<template>
  <el-divider />
  <h1>准入考核</h1>
      <!-- <div class="info-section"> -->
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

        <!-- 添加考核视频链接字段 -->
        <div class="info-line video-info" style="margin-top: 40px; margin-left:80px">
          <span class="video-label">准入试卷链接：</span>
          <a class="procedure-link" :href="Url.first" target="_blank" rel="noopener noreferrer">
            <el-icon class="link-icon">
              <Document />
            </el-icon>准入试卷下载
          </a>
        </div>
     

      <div class="upload-section">
        <!--上传规程pdf -->
        <div class="upload-item">
          <div class="upload-row">
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
              :on-success="UploadSuccessPdf"
            >
              <template #trigger>
                <el-button type="primary">上传试卷答案</el-button>
              </template>
            </el-upload>
            <div class="status-info">
              <div class="status-row">
                <span>(请上传pdf文件)</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>试卷状态：</span>
                <el-tag :type=" human.s1  === '通过' ? 'success' : 'danger'">{{ human.s1 }}</el-tag>
              
        <!-- <template #default="scope">
          <span :style="{ color: scope.s1 === '通过' ? '#67C23A' : '#F56C6C' }">{{ scope.s1 }}</span>
        </template> -->


              </div>
              
              <!-- <span class="time-info">{{ pdfTime }}</span> -->
            </div>
          </div>
          <div class="link-container">
            <a class="procedure-link" :href="human.url1" target="_blank" rel="noopener noreferrer">
              <el-icon class="link-icon">
                <Document />
              </el-icon>试卷答案
            </a>
          </div>
        </div>

        <!--上传考核视频 -->
        <div class="upload-item">
          <div class="upload-row">
            <el-upload
              ref="upload"
              class="upload-demo"
              :limit="1"
              :on-exceed="handleExceed"
              :auto-upload="true"
              action="/api/upload"
              name="file"
              :headers="{'Authorization':tokenStore.token}"
              accept="video/*"
              :on-success="UploadSuccessVideo"
            >
              <template #trigger>
                <el-button type="primary">上传考核视频</el-button>
              </template>
            </el-upload>
            <div class="status-info">
              <div class="status-row">
                 <span>(请上传mp4文件)</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span>视频状态：</span>
                <el-tag :type="human.s2 === '通过' ? 'success' : 'danger'">{{ human.s2 }}</el-tag>
              </div>
              <!-- <span class="time-info">{{ videoTime }}</span> -->
            </div>
          </div>
          <div class="link-container">
            <a class="procedure-link" :href="human.url2" target="_blank" rel="noopener noreferrer">
              <el-icon class="link-icon">
                <VideoPlay />
              </el-icon>考核视频
            </a>
          </div>
        </div>
      </div>
  
        <!-- 添加下载按钮区域 -->
        <div class="download-buttons" style="margin-top: 30px; margin-left:500px">
          <el-button plain type="primary" size="" @click="downloadOperationCertificate">查看准入许可</el-button>
          <!-- <el-button type="primary" @click="generateCertificate">生成证书</el-button> -->
          <el-button plain  type="primary" size="" @click="downloadAuthCertificate">查看通过证书</el-button>
           <el-button type="primary" style="margin-left: 80px;" @click="reback">返回</el-button>
        </div>





  <el-divider />

  <!-- <div>
    <el-table
      :data="tableData0"
      :span-method="objectSpanMethod"
      style="width: 100%; margin-top: 20px"
      height="510"
    >
  <el-table-column type="index" width="100" label="序号" align="center" />-->
  <!-- 视频显示和播放 -->
  <!-- <el-table-column prop="fileUrl" label="培训视频" width align="center">
        <template #default="{row}">
          <div style="width: 300px; height: 170px; margin-left: 350px;">
            <video-player :src="row.fileUrl" :options="playerOptions" :volume="0.6" />
          </div>
        </template>
      </el-table-column>

      <el-table-column prop label="操作" width="300px" fixed="right" align="center">
        <template #default="scope"></template>
      </el-table-column>
    </el-table>
  </div>-->

  <!-- 返回 -->
  <!-- <div style="margin-top:20px;margin-left:440px;display: flex;align-items: center; gap: 10px;">
    <el-button type="primary" style="margin-left: 80px;" @click="reback">返回</el-button>
  </div> -->
</template>



<script  setup>
import { Document, VideoPlay } from "@element-plus/icons-vue";
//import { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

import { ref, reactive, computed } from "vue";
import { Link } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useUserInfoStore } from "@/stores/userInfo.js";
const infoStore = useUserInfoStore();
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";
import { useTokenStore } from "@/stores/token.js";
const tokenStore = useTokenStore();

import { userInfoService } from "@/api/user.js";
const name = ref("");
const getUserInfo = async () => {
  //调用接口
  let result = await userInfoService();
  name.value = result.data.name;
};
getUserInfo();
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

const human = ref({
  examId: 1,
  projectId: 1,
  userId: 1,
  url1: "https://vjs.zencdn.net/v/oceans.mp4",
  s1: "未通过",
  url2: "",
  s2: "未通过",
  s: "未通过"
});



import {
  humanFileService,
  humanFileUrl1Service,
  humanFileUrl2Service,
  ProjectFileListService,
  ExamEditService
} from "@/api/project.js";
const fileList = async () => {
  //调用接口
  let params1 = {
    projectId: infoStore.pro.projectId,
    index: 3
  };
  let result1 = await ProjectFileListService(params1);
  Url.first = result1.data[0].fileUrl;

  let params5 = {
    projectId: infoStore.pro.projectId,
    index: 5
  };
  let result5 = await ProjectFileListService(params5);
  tableData0.value = result5.data;
};
fileList();
const getFileInfo = async () => {
  let result = await userInfoService();
  let params = {
    projectId: infoStore.pro.projectId,
    userId: result.data.userId
  };
  let result1 = await humanFileService(params);
  human.value = result1.data;
  console.log(result1.data);
};
getFileInfo();

const UploadSuccessPdf = async result => {
  //修改url1
  let params = {
    projectId: human.value.projectId,
    userId: human.value.userId,
    url1: result.data
  };
  let result1 = await humanFileUrl1Service(params);

  let params1 = {
      examId: human.value.examId,
      s1: "待批改",
    };
   let result2 = await ExamEditService(params1);
    getFileInfo();
};

const UploadSuccessVideo = async result => {
  let params = {
    projectId: human.value.projectId,
    userId: human.value.userId,
    url2: result.data
  };
  let result1 = await humanFileUrl2Service(params);

  let params1 = {
      examId: human.value.examId,
      s2: "待审核",
    };
   let result2 = await ExamEditService(params1);
   getFileInfo();
};
// const fileList = async()=>{
//     //调用接口
//     let params = {
//       projectId: infoStore.pro.projectId,
//       userId:id.value
//     };
//     let result = await humanFileService(params);
//     human.value = result.data
//     console.log(result.data)
// };
// fileList();
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
  router.push("/projectTest");
};

// PDF链接
const pdfUrl =
  "https://work-02.oss-cn-beijing.aliyuncs.com/0bd6c297-5bc8-44b7-853a-46e9acb89875.pdf";
// 视频链接
const videoUrl = "https://vjs.zencdn.net/v/oceans.mp4";

// 状态和时间
// const s1 = ref('未通过')
// const pdfTime = ref('2024-03-15')
// const s2 = ref('已通过')
// const videoTime = ref('2024-03-16')

// 计算是否可以下载证书
const canDownloadCertificate = computed(() => {
  return human.value.s1 === "通过" && human.value.s2 === "通过";
});
const canDownload = computed(() => {
  return human.value.s1 === "通过" ;
});


const generateCertificate = async (url, a) => {
  try {
    // 读取模板文件
    const response = await fetch(url);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();

    // 加载模板
    const zip = new PizZip(arrayBuffer);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true
    });

    // 替换模板中的变量
    doc.render({
      name: name.value,
      standardName: infoStore.info.standardName,
      detailNumber: infoStore.pro.detailNumber,
      projectName: infoStore.pro.projectName
    });

    // 生成新文档
    const out = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    });

    // 下载文件
    saveAs(out, `${a}证书-${name.value}.docx`);

    ElMessage.success("证书已生成");
  } catch (error) {
    console.error(error);
    ElMessage.error("生成证书失败");
  }
};

// 下载操作证书
const downloadOperationCertificate = () => {
  if (!canDownload.value) {
    ElMessage.warning("未获得准入资格");
    return;
  }
  try {
    // 这里添加下载证书的逻辑
    generateCertificate("/001.docx", "培训");
  } catch (error) {
    console.error("下载失败:", error);
    ElMessage.error("下载失败，请稍后重试");
  }
};
// 下载授权证书

const downloadAuthCertificate = () => {
  if (!canDownloadCertificate.value) {
    ElMessage.warning("未通过考核");
    return;
  }
  try {
    // 这里添加下载授权证书的逻辑

    generateCertificate("/002.docx", "授权");
  } catch (error) {
    console.error("下载失败:", error);
    ElMessage.error("下载失败，请稍后重试");
  }
};

// 视频播放器配置
const videoSrc = ref("https://vjs.zencdn.net/v/oceans.mp4");
const playerOptions = ref({
  playbackRates: [0.7, 1.0, 1.5, 2.0],
  autoplay: false,
  muted: false,
  loop: true,
  preload: "auto",
  language: "zh-CN",
  aspectRatio: "16:9",
  fluid: true,
  notSupportedMessage: "此视频暂无法播放，请稍后再试",
  controls: true,
  controlBar: {
    timeDivider: true,
    durationDisplay: true,
    remainingTimeDisplay: false,
    fullscreenToggle: true
  }
});

// 生成文件ID
const genFileId = () => {
  return Math.random()
    .toString(36)
    .substring(2);
};

// 表格合并方法（如果需要）
const objectSpanMethod = () => {
  // 实现表格合并逻辑
};
</script>

<style scoped>
.info-row {
  display: flex;
  align-items: flex-start;
  margin: 0;
  padding: 10px 0;
}

.info-section {
  padding: 5px 0;
}

.info-line {
  line-height: 1.5;
}

.video-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.video-label {
  color: #10100f;
  font-size: 16px;
}

/* 新增下载按钮区域样式 */
.download-buttons {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.upload-section {
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  margin-left: 100px;
  gap: 12px;
  padding: 5px 0;
}

.upload-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.upload-row {
  display: flex;
  align-items: center;
  gap: 20px;
}

.status-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.time-info {
  font-size: 12px;
  color: #909399;
}

.link-container {
  margin-top: 3px;
}

.procedure-link {
  display: inline-flex;
  align-items: center;
  color: #409eff;
  text-decoration: none;
  font-size: 14px;
  color:green;
  transition: color 0.3s;
}

.procedure-link:hover {
  color: #66b1ff;
  text-decoration: underline;
}

.link-icon {
  margin-right: 4px;
  font-size: 16px;
  color: green;
}

/* 上传组件样式 */
.upload-demo {
  display: block;
}

:deep(.el-upload) {
  display: block;
}

:deep(.el-upload-list) {
  margin-top: 5px;
  margin-bottom: 0;
}

/* 调整按钮间距 */
:deep(.el-button) {
  margin: 0;
}

:deep(.el-button--small) {
  padding: 5px 12px;
  font-size: 12px;
}

/* 表格样式 */
:deep(.el-table) {
  margin-top: 20px;
}

:deep(.el-table th) {
  background-color: #f5f7fa !important;
  font-weight: 600;
}

:deep(.el-table td) {
  padding: 8px 0;
}

:deep(.el-tag) {
  min-width: 60px;
  text-align: center;
}

/* 下载按钮样式 */
.download-button {
  margin-left: 10px;
}

/* 状态标签和按钮的容器 */
.status-button-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 响应式调整 */
@media screen and (max-width: 768px) {
  .upload-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .status-info {
    margin-top: 10px;
  }

  .status-row {
    flex-wrap: wrap;
  }

  .download-buttons {
    flex-direction: column;
    gap: 10px;
  }
}
</style>