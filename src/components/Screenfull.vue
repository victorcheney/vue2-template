<!--
 * @Description: 全屏按钮组件
 * @Author: chenfengtao
 * @Date: 2020-08-05 11:37:09
 * @LastEditors: chenfengtao
 * @LastEditTime: 2020-09-21 10:49:09
-->
<!--
// 使用方法
// elementId参数：是想要全屏的元素id，不传elementId值默认全屏整个页面
// size参数：设置图标大小，内部使用svg-icon组件实现

<template>
  <div id="container">
    <screenfull :element-id="container" :size="20"></screenfull>
  </div>
</template>

export default {

}
-->

<template>
  <span class="screenfull-svg">
    <svg-icon
      :icon="isFullscreen ? 'icontuichuquanping1' : 'iconquanping1'"
      :size="size"
      @click.native.stop="click" />
  </span>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'Screenfull',
  props: {
    elementId: {
      type: String
    },
    size: {
      type: Number,
      default: 14
    }
  },
  data () {
    return {
      isFullscreen: false
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    this.destroy()
  },
  methods: {
    click () {
      if (!screenfull.isEnabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      } else {
        if (this.elementId) {
          const element = document.getElementById(this.elementId)
          screenfull.toggle(element)
        } else {
          screenfull.toggle()
        }
      }
    },
    change () {
      this.isFullscreen = screenfull.isFullscreen
    },
    init () {
      if (screenfull.isEnabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy () {
      if (screenfull.isEnabled) {
        screenfull.off('change', this.change)
      }
    }
  }
}
</script>

<style scoped>
.screenfull-svg {
  cursor: pointer;
}
</style>
