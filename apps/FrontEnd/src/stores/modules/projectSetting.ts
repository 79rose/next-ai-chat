import { defineStore } from 'pinia'
import projectSetting from '@/settings/projectSetting'
import type { ICrumbsSetting, IHeaderSetting, IMenuSetting, IMultiTabsSetting } from '@/types/config'

const {
  navMode,
  navTheme,
  isMobile,
  headerSetting,
  showFooter,
  menuSetting,
  multiTabsSetting,
  crumbsSetting,
  permissionMode,
  isPageAnimate,
  pageAnimateType,
} = projectSetting

interface ProjectSettingState {
  navMode: string // 导航模式
  navTheme: string // 导航风格
  headerSetting: IHeaderSetting // 顶部设置
  showFooter: boolean // 页脚
  menuSetting: IMenuSetting // 多标签
  multiTabsSetting: IMultiTabsSetting // 多标签
  crumbsSetting: ICrumbsSetting // 面包屑
  permissionMode: string // 权限模式
  isPageAnimate: boolean // 是否开启路由动画
  pageAnimateType: string // 路由动画类型
  isMobile: boolean // 是否处于移动端模式
}

export const useProjectSettingStore = defineStore('app-project-setting', () => {
  const state: ProjectSettingState = {
    navMode,
    navTheme,
    isMobile,
    headerSetting,
    showFooter,
    menuSetting,
    multiTabsSetting,
    crumbsSetting,
    permissionMode,
    isPageAnimate,
    pageAnimateType,
  }

  function getNavMode(): string {
    return state.navMode
  }
  function getNavTheme(): string {
    return state.navTheme
  }
  function getIsMobile(): boolean {
    return state.isMobile
  }
  function getHeaderSetting(): IHeaderSetting {
    return state.headerSetting
  }
  function getShowFooter(): boolean {
    return state.showFooter
  }
  function getMenuSetting(): IMenuSetting {
    return state.menuSetting
  }
  function getMultiTabsSetting(): IMultiTabsSetting {
    return state.multiTabsSetting
  }
  function getCrumbsSetting(): ICrumbsSetting {
    return state.crumbsSetting
  }
  function getPermissionMode(): string {
    return state.permissionMode
  }
  function getIsPageAnimate(): boolean {
    return state.isPageAnimate
  }
  function getPageAnimateType(): string {
    return state.pageAnimateType
  }
  function setNavTheme(value: string): void {
    state.navTheme = value
  }
  function setIsMobile(value: boolean): void {
    state.isMobile = value
  }
  return {
    state,
    getNavMode,
    getNavTheme,
    getIsMobile,
    getHeaderSetting,
    getShowFooter,
    getMenuSetting,
    getMultiTabsSetting,
    getCrumbsSetting,
    getPermissionMode,
    getIsPageAnimate,
    getPageAnimateType,
    setNavTheme,
    setIsMobile,
  }
})
