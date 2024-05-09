import { defineStore } from 'pinia'
import store from '@/stores'
import designSetting from '@/settings/designSetting'

const { darkTheme, appTheme, appThemeList } = designSetting

interface DesignSettingState {
  // 深色主题
  darkTheme: boolean
  // 系统风格
  appTheme: string
  // 系统内置风格
  appThemeList: string[]
}

// export const useDesignSettingStore = defineStore({
//   id: 'app-design-setting',
//   state: (): DesignSettingState => ({
//     darkTheme,
//     appTheme,
//     appThemeList,
//   }),
//   getters: {
//     getDarkTheme(): boolean {
//       return this.darkTheme
//     },
//     getAppTheme(): string {
//       return this.appTheme
//     },
//     getAppThemeList(): string[] {
//       return this.appThemeList
//     },
//   },
//   actions: {},
// })
export const useDesignSettingStore = defineStore('app-design-setting', () => {
  const state: DesignSettingState = {
    darkTheme,
    appTheme,
    appThemeList,
  }
  function getDarkTheme(): boolean {
    return state.darkTheme
  }
  function getAppTheme(): string {
    return state.appTheme
  }
  function getAppThemeList(): string[] {
    return state.appThemeList
  }
  return {
    state,
    getDarkTheme,
    getAppTheme,
    getAppThemeList,
  }
})
// Need to be used outside the setup
export function useDesignSetting() {
  return useDesignSettingStore(store)
}
