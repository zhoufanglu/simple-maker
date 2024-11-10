<script setup lang="ts">
  /** ******************** es5 ***********************/
  function add(a: number, b: number): number {
    return a + b
  }
  /** ******************** 箭头函数 ***********************/
  const add2 = (a: number, b: number): number => {
    return a + b
  }
  /** ******************** 接口定义函数类型 ***********************/
  interface MathOperation {
    (a: number, b: number): number
  }
  const multiply: MathOperation = function (a, b) {
    return a * b
  }
  /** ******************** 泛型 ***********************/
  function identity<T>(arg: T) {
    return arg
  }
  interface User {
    name: string
    age: number
    gender: string
  }
  const user = identity<User>({ name: 'lfz', age: 22, gender: 'box' })
  /** ******************** 泛型约束 ***********************/
  interface Lengthwise {
    length: number
  }

  function printLength<T extends Lengthwise>(obj: T) {
    console.log(obj.length)
  }
  printLength('123444')
</script>
<template>
  <div class=""> </div>
</template>

<style scoped lang="scss">
  .test {
  }
</style>
