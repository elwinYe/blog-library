# region snippet
<template>
  <div class="virtual-list-wrapper" @scroll="handleScroll">
    <div class="virtual-list-lift" :style="{ height: liftListBoxHeight + 'px' }"></div>
    <div class="virtual-list-box" ref="listBox">
      <div
        class="list-item"
        :style="{ height: itemSize + 'px' }"
        v-for="item in visibleData"
        :key="item.key"
      >
        {{ item.value }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VirtualList',

  data() {
    return {
      startIndex: 0, // 要渲染的数据起始
      endIndex: 0, // 要渲染的数据终止
      itemSize: 40, // 每个节点项的尺寸大小高度
      dataList: [], // 列表全部数据
      limit: 10 // 条数限制
    }
  },

  computed: {
    // 撑起高度的盒子高度
    liftListBoxHeight() {
      const { dataList, itemSize } = this
      return dataList.length * itemSize
    },

    // 可见的数据列表
    visibleData() {
      const { dataList, startIndex, endIndex } = this
      return dataList.slice(startIndex, Math.min(endIndex + 1, dataList.length))
    }
  },

  created() {
    // 构建数据
    this.dataList = new Array(7000).fill(1).map((item, index) => {
      return { value: index, key: index }
    })
  },

  mounted() {
    this.updateVisibleData()
  },

  methods: {
    // 盒子X滚动事件
    handleScroll(evt) {
      const scrollTop = evt.target.scrollTop || 0
      this.updateVisibleData(scrollTop)
    },
    // 更新可见数据列表
    updateVisibleData(scrollTop) {
      const { dataList, limit, itemSize } = this
      scrollTop = scrollTop || 0
      this.startIndex = Math.floor(scrollTop / itemSize)
      this.endIndex = Math.min(this.startIndex + limit, dataList.length - 1)
      this.$refs.listBox.style.transform = `translateY(${this.startIndex * itemSize}px)`
    }
  }
}
</script>
<style lang="scss" scoped>
.virtual-list-wrapper {
  width: 300px;
  height: 400px;
  border: 1px solid;
  position: relative;
  overflow-y: auto;

  .virtual-list-lift {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .virtual-list-box {
    position: absolute;
    top: 0;
    left: 0;
    .list-item {
      width: 100%;
      line-height: 40px;
    }
  }
}
</style>
# endregion snippet