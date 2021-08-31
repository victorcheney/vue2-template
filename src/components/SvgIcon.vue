<!--
 * @Description: iconfont 引入svg图标组件
 * @Author: chenfengtao
 * @Date: 2020-07-04 11:32:29
 * @LastEditors: chenfengtao
 * @LastEditTime: 2020-07-04 11:47:50
-->
<template>
  <svg class="icon svg-icon" aria-hidden="true" :style="ClassStyle">
      <use :xlink:href="IconName"></use>
  </svg>
</template>
<script>
export default {
  name: 'svg-icon',
  props: {
    size: {
      type: [Number, String],
      default: 14
    },
    icon: {
      type: String,
      default: ''
    },
    fill: {
      type: String,
      default: ''
    }
  },
  computed: {
    ClassStyle () {
      return `width:${parseInt(this.size)};height:${parseInt(this.size)};fill:${this.fill};`
    },
    IconName () {
      return `#${this.icon}`
    }
  }
}
</script>

<style scoped>

</style>
