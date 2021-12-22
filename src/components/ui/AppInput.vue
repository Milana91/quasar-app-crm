<template>
   <q-input :modelValue="modelValue" @update:modelValue="event => $emit('update:modelValue', event)"/>
</template>

<script>
import {ref} from 'vue'

export default {
    name: 'app-input',
    // emits: ['updateInput'],
    props: {
        modelValue: [String, Number]
    },
    setup (props, { emit }) {
      // const updateInput = (event) => {
      //         emit('update:modelValue', event.target.value)  //  event.target.value - обновленное в инпуте значение
      //     }
      return {
        // updateInput
      }
    }
}
</script>
