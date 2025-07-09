import request from '@/utils/request.js'
import { useTokenStore } from '@/stores/token.js'
//文章分类列表查询
export const articleCategoryListService = ()=>{
    //const tokenStore = useTokenStore();
    //在pinia中定义的响应式数据,都不需要.value
    //return request.get('/category',{headers:{'Authorization':tokenStore.token}})
    return request.get('/category')
}


export const standardListService = (params)=>{
   return  request.get('/standard/list',{params:params})
}

export const standardEditService = (params)=>{
    return  request.get('/standard/update',{params:params})
 }

 export const standardDeleteService = (params)=>{
    return  request.get('/standard/delete',{params:params})
 }

 export const standardAddService = (params)=>{
    return  request.get('/standard/add',{params:params})
 }





 export const projectListService = (params)=>{
   return  request.get('/project/list',{params:params})
}

export const projectAddService = (params)=>{
   return  request.get('/project/add',{params:params})
}

export const projectEditService = (params)=>{
   return  request.get('/project/update',{params:params})
}

export const projectDeleteService = (params)=>{
   return  request.get('/project/delete',{params:params})
}



export const sampleListService = (params)=>{
   return  request.get('/sample/list',{params:params})
}

export const sampleAddService = (params)=>{
   return  request.get('/sample/add',{params:params})
}

export const sampleEditService = (params)=>{
   return  request.get('/sample/update',{params:params})
}

export const sampleDeleteService = (params)=>{
   return  request.get('/sample/delete',{params:params})
}



export const machineListService = (params)=>{
   return  request.get('/device/list',{params:params})
}
export const machineAddService = (params)=>{
   return  request.get('/device/add',{params:params})
}
export const machineEditService = (params)=>{
   return  request.get('/device/update',{params:params})
}
export const machineDeleteService = (params)=>{
   return  request.get('/device/delete',{params:params})
}


export const ProjectFileListService = (params)=>{
   return  request.get('/file/list',{params:params})
}
export const editUrlService = (params)=>{
   return  request.get('/file/edit',{params:params})
}
export const fileDeleteService = (params)=>{
   return  request.get('/file/delete',{params:params})
}
export const addUrlService = (params)=>{
   return  request.get('/file/add',{params:params})
}


export const humanFileService = (params)=>{
   return  request.get('/humanFile/list',{params:params})
}
export const humanFileUrl1Service = (params)=>{
   return  request.get('/humanFile/url1',{params:params})
}
export const humanFileUrl2Service = (params)=>{
   return  request.get('/humanFile/url2',{params:params})
}
export const HumanExamService = (params)=>{
   return  request.get('/humanFile/examList',{params:params})
}

export const ExamEditService = (params)=>{
   return  request.get('/humanFile/examEdit',{params:params})
}
export const abListService = (params)=>{
   return  request.get('/humanFile/abList',{params:params})
}