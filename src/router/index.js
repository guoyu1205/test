import {createRouter,createWebHistory} from 'vue-router'

import LoginVue from '@/components/Login.vue'
import MainVue from '@/components/Main.vue'
import DeviceVue from '@/components/Device.vue'
import HumanVue from '@/components/Human.vue'
import ManageVue from '@/components/Manage.vue'
import MessageVue from '@/components/Message.vue'
import TestVue from '@/components/Test.vue'
import SampleVue from '@/components/Sample.vue'
import PersonalVue from '@/components/Personal.vue'
import ProjectVue from '@/components/Project.vue'
import MaterialVue from '@/components/Material.vue'
import MachineVue from '@/components/Machine.vue'
import WayVue from '@/components/Way.vue'
import PersonVue from '@/components/Person.vue'

import MainVueTest from '@/components-test/Main.vue'
import DeviceVueTest from '@/components-test/Device.vue'
import HumanVueTest from '@/components-test/Human.vue'
import ManageVueTest from '@/components-test/Manage.vue'
import MessageVueTest from '@/components-test/Message.vue'
import TestVueTest from '@/components-test/Test.vue'
import SampleVueTest from '@/components-test/Sample.vue'
import PersonalVueTest from '@/components-test/Personal.vue'
import ProjectVueTest from '@/components-test/Project.vue'
import MaterialVueTest from '@/components-test/Material.vue'
import MachineVueTest from '@/components-test/Machine.vue'
import WayVueTest from '@/components-test/Way.vue'
import PersonVueTest from '@/components-test/Person.vue'
const routes = [
    {path:'/login',component:LoginVue},
    {path:'/admin',component:MainVue, redirect:'/manage',children: [
        {path:'/device',component:DeviceVue},
        {path:'/human',component:HumanVue},
        {path:'/manage',component:ManageVue},
        {path:'/message',component:MessageVue},
        {path:'/test',component:TestVue},
        {path:'/sample',component:SampleVue},
        {path:'/personal',component:PersonalVue},
        {path:'/project',component:ProjectVue},
        {path:'/material',component:MaterialVue},
        {path:'/machine',component:MachineVue},
        {path:'/way',component:WayVue},
        {path:'/person',component:PersonVue},
    ]},
    {path:'/common',component:MainVueTest, redirect:'/manageTest',children: [
        {path:'/deviceTest',component:DeviceVueTest},
        {path:'/humanTest',component:HumanVueTest},
        {path:'/manageTest',component:ManageVueTest},
        {path:'/messageTest',component:MessageVueTest},
        {path:'/testTest',component:TestVueTest},
        {path:'/sampleTest',component:SampleVueTest},
        {path:'/personalTest',component:PersonalVueTest},
        {path:'/projectTest',component:ProjectVueTest},
        {path:'/materialTest',component:MaterialVueTest},
        {path:'/machineTest',component:MachineVueTest},
        {path:'/wayTest',component:WayVueTest},
        {path:'/personTest',component:PersonVueTest},
    ]}
]

const router = createRouter({
    history:createWebHistory(),
    routes:routes
})

export default router