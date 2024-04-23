import { computed } from 'vue'
import { useDesignSettingStore } from '@/stores/modules/designSetting'

export function useDesignSetting() {
  const designStore = useDesignSettingStore()

  const getDarkTheme = computed(() => designStore.getDarkTheme())

  const getAppTheme = computed(() => designStore.getAppTheme())

  const getAppThemeList = computed(() => designStore.getAppThemeList())

  return {
    getDarkTheme,
    getAppTheme,
    getAppThemeList,
  }
}
