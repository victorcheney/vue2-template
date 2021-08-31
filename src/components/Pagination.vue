<!--
 * @Description: 二次封装el-pagination组件
 * @Author: chenfengtao
 * @Date: 2020-07-04 14:32:05
 * @LastEditors: chenfengtao
 * @LastEditTime: 2020-07-21 09:11:10
-->
<!--
<template>
  <pagination
    :total="pageObj.total"
    :page.sync="pageObj.currentPage"
    :limit.sync="pageObj.pageSize"
    @pagination="getPage" />
</template>

<script>

export default {
  data() {
    return {
      pageObj: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    getPage({page, limit}) {
      // 获取数据
      this.pageObj.currentPage = page
      this.pageObj.pageSize = limit
    }
  }
}
</script>
-->

<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      :prev-text="prevText"
      :next-text="nextText"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default () {
        return [10, 20, 30, 50, 100]
      }
    },
    layout: {
      type: String,
      default: 'sizes, prev, pager, next'
    },
    prevText: {
      type: String,
      default: '上一页'
    },
    nextText: {
      type: String,
      default: '下一页'
    },
    background: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get () {
        return this.page
      },
      set (val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get () {
        return this.limit
      },
      set (val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('pagination', { page: this.currentPage, limit: val })
    },
    handleCurrentChange (val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
    }
  }
}
</script>

<style lang="less" scoped>
.pagination-container {
  background: #fff;
  padding: 20px 16px;
  text-align: center;
}
.pagination-container.hidden {
  display: none;
}

/deep/ .el-pagination.is-background .btn-prev,
/deep/ .el-pagination.is-background .btn-next {
  background-color: transparent;
}
/deep/ .el-pagination.is-background .el-pager li {
  background-color: #fff;
  border: 1px solid #dddddd;
  color: #555555;
  border-radius: 3px;
}
/deep/ .el-pagination.is-background .el-pager li.active {
  border-color: #a62b1d;
}
</style>
