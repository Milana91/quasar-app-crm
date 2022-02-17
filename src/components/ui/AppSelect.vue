<template>
        <q-select  :options="options" :modelValue="modelValue" @update:modelValue="event => $emit('update:modelValue', event)">
           <template v-if="chips" v-slot:selected>
          <q-chip style="max-width: 310px; margin-left: 2px; margin-right: 2px; margin-top: 2px; margin-bottom: 2px" :key="item" v-for="item in modelValue"
            dense
            outline color="primary" text-color="white"
            class="q-ma-none">
            {{ item }}
          </q-chip>
           </template>
        </q-select>
</template>

<script>

export default {
    name: 'app-select',
    props: {
        modelValue: [String, Number, Array],
        options: [Array],
        chips: [Boolean]
    },
    setup () {

      return {
      }
    }
}
</script>
