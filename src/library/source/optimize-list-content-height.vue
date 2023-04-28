<template>
  <div class="virtual-list-wrapper" @scroll="handleScroll">
    <div class="virtual-list-lift" :style="{ height: liftListBoxHeight + 'px' }"></div>
    <div class="virtual-list-box" ref="listBox">
      <div
        class="list-item"
        :style="{ height: itemSizeGetter(item) + 'px' }"
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
      dataList: [], // 列表全部数据
      lastMeasuredIndex: -1, // 上次测量的索引
      sizeAndOffsetCache: {}, // 尺寸和偏移量缓存
      estimatedItemSize: 40 // 默认的Item高度
    }
  },

  computed: {
    // 撑起高度的盒子高度
    liftListBoxHeight() {
      const { dataList, lastMeasuredIndex, estimatedItemSize, getLastMeasuredSizeAndOffset } = this
      const len = dataList.length
      if (lastMeasuredIndex >= 0) {
        const lastMeasuredSizeAndOffset = this.getLastMeasuredSizeAndOffset()
        const { size, offset } = lastMeasuredSizeAndOffset
        return offset + size + (len - 1 - lastMeasuredIndex) * estimatedItemSize
      } else {
        return len * estimatedItemSize
      }
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
    // 计算Item的高度
    itemSizeGetter(item) {
      return 40 + (item.value % 10)
    },
    // 获取滚动条位置对应的Item索引
    getNearestItemIndex(scrollTop) {
      const { dataList, getItemSizeAndOffset } = this
      let total = 0
      for (let i = 0, j = dataList.length; i < j; i++) {
        total += getItemSizeAndOffset(i).size
        // 叠加的元素高度大于等于滚动高度或遍历结束
        if (total >= scrollTop || i === j - 1) {
          return i
        }
      }
      return 0
    },
    // 获取指定索引的Item的尺寸和偏移量
    getItemSizeAndOffset(index) {
      const { dataList, itemSizeGetter, lastMeasuredIndex, sizeAndOffsetCache } = this
      if (lastMeasuredIndex >= index) {
        return sizeAndOffsetCache[index]
      }
      let offset = 0
      if (lastMeasuredIndex >= 0) {
        const lastMeasured = sizeAndOffsetCache[lastMeasuredIndex]
        if (lastMeasured) {
          offset = lastMeasured.offset + lastMeasured.size
        }
      }
      for (let i = lastMeasuredIndex + 1; i <= index; i++) {
        const item = dataList[i]
        const size = itemSizeGetter(item)
        sizeAndOffsetCache[i] = {
          size,
          offset
        }
        offset += size
      }
      if (index > lastMeasuredIndex) {
        this.lastMeasuredIndex = index
      }
      return sizeAndOffsetCache[index]
    },

    getLastMeasuredSizeAndOffset() {
      const { lastMeasuredIndex, sizeAndOffsetCache } = this
      return lastMeasuredIndex >= 0 ? sizeAndOffsetCache[lastMeasuredIndex] : { size: 0, offset: 0 }
    },

    // 盒子X滚动事件
    handleScroll(evt) {
      const scrollTop = evt.target.scrollTop || 0
      this.updateVisibleData(scrollTop)
    },
    // 更新可见数据列表
    updateVisibleData(scrollTop) {
      const { getItemSizeAndOffset, getNearestItemIndex } = this
      scrollTop = scrollTop || 0
      this.startIndex = getNearestItemIndex(scrollTop)
      this.endIndex = getNearestItemIndex(scrollTop + this.$el.clientHeight)
      this.$refs.listBox.style.transform = `translateY(${
        getItemSizeAndOffset(this.startIndex).offset
      }px)`
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
