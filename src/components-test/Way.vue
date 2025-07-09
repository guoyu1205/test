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


<template>

<el-divider />
    <h1>预习实验</h1>
    <el-row :gutter="20">
      <el-col  :span="250">
    <!-- <div>
     <el-text class="mx-1" type="success">大类：{{infoStore.info.basicClass}}</el-text>
     <el-text class="mx-1" style="margin-left:40px" type="success">类别：{{infoStore.info.category}}</el-text>
     <el-text class="mx-1" style="margin-left:40px" type="success">标准名称：{{infoStore.info.standardName}}</el-text>
     <el-text class="mx-1" style="margin-left:40px" type="success">标准编号（含年号）：{{infoStore.info.standardNumber}}</el-text>
     <div style="margin-top: 20px;">
     <el-text class="mx-1" style="margin-left:40px" type="success">项目名称：{{infoStore.pro.projectName}}</el-text>
     <el-text class="mx-1" style="margin-left:40px" type="success">标准编号（含年号）及条款号：{{infoStore.pro.detailNumber}}</el-text>
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
    <el-col  :span="100" :offset="0">
       
   
    <!-- 显示规程pdf -->

    <div class="link-container">
    <a 
      class="procedure-link" 
      :href="Url.first" 
      target="_blank"
      rel="noopener noreferrer"
      style="margin-top:20px; color:green"
    >
      <el-icon class="link-icon" ><Link /></el-icon>
      预习报告
    </a>
  </div>
      &nbsp;&nbsp;
    <!-- 显示测试pdf -->
    <!-- <div class="link-container">
    <a 
      class="procedure-link" 
      :href="Url.second" 
      target="_blank"
      rel="noopener noreferrer"
    >
      <el-icon class="link-icon"><Link /></el-icon>
      对比测试
    </a>
  </div> -->
  
    </el-col>
  </el-row>
<el-divider />

  <div>
    <el-table :data="tableData" :span-method="objectSpanMethod"  style="width: 100%; margin-top: 20px" height="510" >
        <el-table-column type="index" width="100"  label="序号" align = "center" />
    <!-- 视频显示和播放 -->
      <el-table-column prop="fileUrl" label="预习视频" width="" align = "center" >
        <template #default="{row}">
      <div style="width: 300px; height: 170px; margin-left: 350px;" >
       <video-player 
      :src="row.fileUrl"
      :options="playerOptions"
      :volume="0.6"
      />
      </div>
        </template>
      </el-table-column>

      <el-table-column prop="" label="" width="300px" fixed = "right" align = "center">
     
      </el-table-column>




    
    </el-table>
  </div>

     <div style="margin-top:20px;margin-left:440px;display: flex;align-items: center; gap: 10px;">
   <!-- <el-button plain type="primary" style="margin-left: 80px;" @click="apply">申请对比测试</el-button> -->
  <el-button type="primary" style="margin-left: 150px;" @click="reback">返回</el-button>
    </div>



</template>

<script  setup>

import  { useUserInfoStore } from "@/stores/userInfo.js";
import { ElMessage, ElMessageBox } from "element-plus";
const infoStore = useUserInfoStore();
import { Link } from '@element-plus/icons-vue'

import {useTokenStore} from '@/stores/token.js'
const tokenStore = useTokenStore();
//const linkUrl = reactive('https://work-02.oss-cn-beijing.aliyuncs.com/0bd6c297-5bc8-44b7-853a-46e9acb89875.pdf')
const Url = reactive({
  first:"",
  second: ""
});
const tableData =ref([
  {
  fileId: 1,
  fileUrl: '设备A',  
  }
])
//import type { TableColumnCtx } from 'element-plus'
import { useRouter } from "vue-router";
const router = useRouter();
const reback = () => {
  router.push("/projectTest");
};
//弹出的东西
import { reactive, ref } from 'vue'
import { ProjectFileListService,fileDeleteService } from "@/api/project.js";
import { editUrlService ,addUrlService} from "@/api/project.js";
const dialogFormAddVisible = ref(false)

const fileList = async()=>{
    //调用接口
    let params1 = {
      projectId: infoStore.pro.projectId,
      index:1,
    };
    let result1 = await ProjectFileListService(params1);
    Url.first = result1.data[0].fileUrl

    // let params2 = {
    //   projectId: infoStore.pro.projectId,
    //   index:2,
    // };
    // let result2 = await ProjectFileListService(params2);
    // Url.second = result2.data[0].fileUrl

    let params4 = {
      projectId: infoStore.pro.projectId,
      index:4,
    };
    let result4 = await ProjectFileListService(params4);
    tableData.value = result4.data

};

fileList();
const apply = ()=>{
    ElMessageBox.confirm("确认要申请吗?", "温馨提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  }).then(async () => {
    ElMessage({
      type: "success",
      message: "申请成功"
    });
  });
}
// interface device {
//   deviceId: number
//   deviceName: string
//   projectId: number
//   manufacturer: string
//   deviceURL: string
//   detail:string   
// }



//

//处理逻辑
const handleDelete = (id) => {
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





// 视频链接地址
const videoSrc = ref('https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209104902N3v5Vpxuvb.mp4');
// 视频播放器配置
let playerOptions = ref({
  // height: 200,
  // width: document.documentElement.clientWidth, //播放器宽度
  playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
  autoplay: false, // 如果true,浏览器准备好时开始回放。
  muted: false, // 默认情况下将会消除任何音频。
  loop: true, // 导致视频一结束就重新开始。
  preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
  language: 'zh-CN',
  aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
  fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
  notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
  controls: true,
  controlBar: {
    timeDivider: true,
    durationDisplay: true,
    remainingTimeDisplay: false,
    fullscreenToggle: true // 全屏按钮
  }
})

//pdf上传 

// import { genFileId } from 'element-plus'
// import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

// const upload = ref<UploadInstance>()

// const handleExceed: UploadProps['onExceed'] = (files) => {
//   upload.value!.clearFiles()
//   const file = files[0] as UploadRawFile
//   file.uid = genFileId()
//   upload.value!.handleStart(file)
// }

// const submitUpload = () => {
//   upload.value!.submit()
// }













///////////测试PR--二次测试
</script>











