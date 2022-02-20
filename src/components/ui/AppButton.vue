<template>
  <q-btn color="primary" class="row items-center" @click="$emit('clickAction')">
    <slot></slot>
  </q-btn>
</template>

<script>
export default {
  // name: 'ComponentName',
  emit: ["clickAction"],
  setup() {
    return {};
  },
};
</script>
