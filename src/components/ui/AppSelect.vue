<template>
        <q-select  :options="options" :modelValue="modelValue" @update:modelValue="event => $emit('update:modelValue', event)"/>
</template>

<script>

export default {
    name: 'app-select',
    props: {
        modelValue: [String, Number, Array],
        options: [Array],
    },
    setup () {

      return {
      }
    }
}
</script>
