---
outline: deep
description: 包(模块)自身缺陷或引发的问题
editLink: true
---

# defects

<<< @/summary/defects/index.js#snippet1

::: code-group
```js [config.js] :line-numbers
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
}

export default config
```

```ts [configs.ts]
const config : UserConfig = {
  // ...
}

export default config
```

<script setup>
  import { useData } from 'vitepress'

  const { page } = useData()
</script>

<div v-for="item in [1, 2, 3]">{{ item }}</div>

<button :class="$style.button" @click="count++">Increment</button>

<div :class="$style.module">额外模块内容</div>

<pre>{{ page }}</pre>

### 额外子标题

<style module>
  .button {
    color: red;
    font-weight: bold;
    font-size: 20px;
  }
  .module {
    color: orange;
  }
</style>