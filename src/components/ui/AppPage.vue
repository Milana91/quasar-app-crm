<template>
  <q-page padding>
        <q-card-section class="row justify-between">
            <div class="text-center text-h4 mb-3">{{title}}</div>
            <slot name="header"/>
        </q-card-section>
        <slot/>
  </q-page>
</template>

<script>
export default {
    props: {
        title: {
            type: String, 
            required: true
        }
    },
    setup(props) {
        // меняем title страницы
        document.title = `${props.title} | CRM - Контекст ВН `
    }
}
</script>

<style lang="sass" scoped>

  
</style>