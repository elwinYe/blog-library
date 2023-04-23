<span class="desc warning">问题现象</span>: select组件在使用`v-model:value="xxx"`,再添加了`labelInLabel`属性,则`xxx`默认会被赋予`change`事件包装后的对象,该对象在被lodash的clone函数处理时会抛出性能警告<br />
<span class="desc primary">期望结果</span>: `xxx`希望得到`label|value`的结果 <br />
<span class="desc success">问题解决</span>: 使用`:value='xxx'`再配合`onChange`事件进一步处理 或 移除`labelInLabel`属性

```vue
<template>
  <Select
    v-model:value="xxx"
    placeholder="请选择"
    label-in-value
    :options="options"
  />
</template>

<script setup>
  import { cloneDeep } from 'lodash'
  const cloneX = cloneDeep(xxx) // 控制台抛出警告如下
  // avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead
</script>
```

<style lang="scss">
  .desc { 
    font-weight: bold;
    
    &.warning{
      color: #d97706;
    }
    &.primary {
      color: #1890ff;
    }
    &.success {
      color:#10b981;
    }
  }
  
</style>