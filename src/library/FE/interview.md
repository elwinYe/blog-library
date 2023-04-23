---
title: 常见面试题(持续更新)
description: 记录自己遇到的或在论坛中遇到的各类面试题以备不时之需(跑路)
---

# 面试题相关

## HTML
  - 简要说明一下html的语义化
  - 重排和重绘

## CSS
  - flex: 1的具体涵义
  - 盒子模型
  - 选择器优先级
  - 垂直居中定位

## JS
  *  输出的结果是?
  ```js :line-numbers
  let a = { n: 1 }
  let b = a 
  a.x = a = { n: 2 }
  console.log(a.x)
  console.log(b.x)
  ```
  * 正确的选项是?
  ```js
  var a = 4
  console.log(a + a / a-- + a++ * ++a)
  A: 21  B: 20  C: 17
  ```
  * 不用for循环，不用标准库的方法数组求和?
  ```js
  function sum(arr) {
  // fn表示从第几位开始到末尾的数组和
    function fn(i) {
      return i >= arr.length ? 0 : arr[i] + fn(i + 1)
    }
    return fn(0)
  }
  ```
  * 输出结果是?
  ```js
  let a = { n: 1 }
  let b = { n: 2 }
  let c = {}

  c[a] = 3
  console.log(c[b])
  ```
  * 如何让下面的表达式返回结果为`true`
  ```js
  let a = ?
  (a == 1 && a == 2 && a == 3) === true
  ```
  * 判断数据类型？如果判断是数组

  * `typeof`,`instanceof`

  * 防抖与节流的实现原理

  * 闭包

  * 原型、原型链

  * this指向、new 关键字时做了什么

  * ！call方法的实现

  * ES6特性

  * eventloop事件循环机制

  * async与await（Map与Symbol的特点）

  * for与forEach的区别
  <br />
    * *forEach中使用return只会终止本轮循环，类似与for循环中的continue,对于非海量的数据而言，forEach效率更高，但数据过于庞大（千万级别）for循环的执行效率更高*
    * *for拿到的对象属性的具体,forEach拿到的则是代理*

## TS

## Vue
  * ### Vue2
    * 生命周期
    * 组件封装
    * v-for、v-if优先级
    * 组件通信
    * 双向绑定原理
  * ### Vue3
    * 如何给props加上类型限制
## React

## Cli

## MySQL