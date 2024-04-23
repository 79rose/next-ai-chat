import autoImport from 'unplugin-auto-import/vite'

export function createAutoImport() {
  return autoImport({
    imports: [
      'vue',
      'pinia',
      'vue-router',
    ],
    dts: './src/types/auto-imports.d.ts',
    dirs: ['src'],
    // eslintrc: {
    //   enabled: true,
    // },
  })
}
