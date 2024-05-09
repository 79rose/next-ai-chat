import { computed } from 'vue'
import { useProjectSettingStore } from '@/stores/modules/projectSetting'

export function useProjectSetting() {
  const projectStore = useProjectSettingStore()

  const navMode = computed(() => projectStore.getNavMode())

  const navTheme = computed(() => projectStore.getNavTheme())

  const isMobile = computed(() => projectStore.getIsMobile())

  const headerSetting = computed(() => projectStore.getHeaderSetting())

  const multiTabsSetting = computed(() => projectStore.getMultiTabsSetting())

  const menuSetting = computed(() => projectStore.getMenuSetting())

  const crumbsSetting = computed(() => projectStore.getCrumbsSetting())

  const permissionMode = computed(() => projectStore.getPermissionMode())

  const showFooter = computed(() => projectStore.getShowFooter())

  const isPageAnimate = computed(() => projectStore.getIsPageAnimate())

  const pageAnimateType = computed(() => projectStore.getPageAnimateType())

  return {
    navMode,
    navTheme,
    isMobile,
    headerSetting,
    multiTabsSetting,
    menuSetting,
    crumbsSetting,
    permissionMode,
    showFooter,
    isPageAnimate,
    pageAnimateType,
  }
}
