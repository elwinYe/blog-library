<span class="desc warning">问题现象</span>: select组件在使用`v-model:value="xxx"`,再添加了`labelInLabel`属性,则`xxx`默认会被赋予`change`事件包装后的对象,该对象在被lodash的clone函数处理时会抛出性能警告<br />
<span class="desc primary">期望结果</span>: `xxx`希望得到`label|value`的结果 <br />
<span class="desc success">问题解决</span>: 使用`:value='xxx'`再配合`onChange`事件进一步处理 或 移除`labelInLabel`属性

```vue
<template>
  <Select
    style="width: 200px"
    v-model:value="demo"
    label-in-value
    placeholder="请选择游戏"
    @change="handleChange"
  >
    <SelectOption v-for="item in options" :key="item.key" :value="item.value">{{
      item.label
    }}</SelectOption>
  </Select>
</template>

<script setup>
  import { cloneDeep } from 'lodash'
  import { Select, SelectOption } from 'ant-design-vue'
  import 'ant-design-vue/dist/antd.css'

  const options = [
    {
      class: 'custom',
      disabled: false,
      key: '01',
      label: '战神4',
      value: 1
    },
    {
      class: 'custom',
      disabled: false,
      key: '02',
      label: '荒野大镖客2',
      value: 2
    }
  ]
  const demo = ref(undefined)
  const handleChange = val => {
    console.log('val', val)
    // val中的label是一个复杂的对象数组, 对这类对象做深拷贝的情况下, 
    // Vue会警告不必要的性能开销(因为实际有用的也就那么几个属性)
    // const res = cloneDeep(demo.value)
    // avoid app logic that relies on enumerating keys on a component instance. 
    // The keys will be empty in production mode to avoid performance overhead
    // console.log('res', res)
  }
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