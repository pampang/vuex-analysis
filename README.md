# 阅读源码计划

计划时长： 5h/d * 2d
选取的版本： v4.0.2

# 什么是 vuex
官方文档：https://vuex.vuejs.org/zh/
核心概念：state、Getters、Mutations、Actions、Modules

# 我希望从 vuex 中学到什么
1. vuex 的分层思路
1. vuex 是如何利用 vue 的能力，无缝结合的？
1. vuex 的 mutation 是怎么做异步处理的
1. vuex 的数据是什么时候提交的？如何才能确保 vuex 的 action 真正生效了？
1. vuex 如何保证 state 数据是单项流动的呢？
1. vuex 是如何做插件的？
1. vuex 为什么要依赖 promise？
  1. dispatch 返回的是 promise
1. index.js、index.cjs.js、index.mjs.js 有什么区别？

# vuex 基础用法
```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

store.commit('increment')
methods: {
  increment() {
    this.$store.commit('increment')
    console.log(this.$store.state.count)
  }
}
```

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
Action 类似于 mutation，不同在于：
- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。

Modules
由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。
为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块


# 源码解析
## vuex 的项目结构
对 src/ 目录使用 tree 命令，我们可以得到如下项目结构。
```javascript
src
├── index.js // 入口文件
├── index.mjs // es6 打包入口
├── index.cjs.js // commonjs 打包入口
├── helpers.js // vuex 使用时的工具函数，mapXXX
├── mixin.js // mixin for vue，主要干预 beforeCreate 方法，用以创建 store
├── module
│   ├── module-collection.js // Module 收集器
│   └── module.js // Module 类
├── plugins // 插件
│   ├── devtool.js
│   └── logger.js
├── store.js // store 类，用于创建 store 实例
└── util.js // 工具函数
```

## 学到了什么？
1. 代码的组织模式
  1. 核心逻辑，用类来组织。module-collection、module
  1. 用命名合理的方法来分离逻辑
1. 项目的结构
1. 简单的插件机制
1. assert

## 其他感受
1. 项目结构清晰明了，完备，优雅
  1. example/、test/、types/、docs/，让人感觉很清晰
1. 清晰的代码书写
1. 代码格式整洁明了，美感爆棚
1. 函数的命名

## vscode 的快捷键
如何快速预览一个函数，而不用跳转？
跳转之后，如何返回到之前的位置？
cmd + g 对函数的意义是什么？
大纲预览整个文件
