<template>
   <q-input :modelValue="modelValue" @update:modelValue="event => $emit('update:modelValue', event)">
   </q-input>
</template>

<script>

export default {
    name: 'app-input',
    props: {
        modelValue: [String, Number],
    },
    setup () {

      return {
      }
    }
}
</script>
