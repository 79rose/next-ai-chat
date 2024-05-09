// @ts-check
import antfu from '@antfu/eslint-config'
import unocss from '@unocss/eslint-plugin'

export default antfu(
  {
    typescript: {
      tsconfigPath: [
        'tsconfig.json',
        'tsconfig.eslint.json',
        'tsconfig.node.json',
        'tsconfig.app.json',
      ],
    },
  },
  unocss.configs.flat,
  {
    rules: {
      'vue/max-attributes-per-line': 'warn',
      'vue/html-self-closing': 'off',
      'vue/no-deprecated-slot-attribute': 'off',
      'ts/no-unsafe-argument': 'off',
      'ts/no-unsafe-assignment': 'off',
      'ts/no-unsafe-member-access': 'off',
      'ts/no-unsafe-return': 'off',
      'ts/no-unsafe-call': 'off',
      'antfu/top-level-function': 'off',
      'no-console': 'off',
      'no-undef': 'off',
    },
  },
)
