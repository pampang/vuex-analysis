import { Store, install } from './store'
import { mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers } from './helpers'
import createLogger from './plugins/logger'

export default {
  // Store 类
  Store,
  // Vue.use 会用到的 install 函数
  install,
  // 这里似乎是用 rollup 来做变量替换的
  version: '__VERSION__',
  // 工具函数，给开发者便捷提取内容的
  mapState,
  mapMutations,
  mapGetters,
  mapActions,
  // 有什么作用？
  createNamespacedHelpers,
  // 创建 logger plugin
  createLogger
}

export {
  Store,
  install,
  mapState,
  mapMutations,
  mapGetters,
  mapActions,
  createNamespacedHelpers,
  createLogger
}
