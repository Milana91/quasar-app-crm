<template>
  <q-page class="flex justify-center q-py-md">
    <q-card class="my-card">
        <q-card-section>
          <div class="text-center text-h4 mb-3">Войти в систему</div>
        </q-card-section>

        <q-card-section>
          <AuthComponent/>
        </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import AuthComponent from 'components/AuthComponent'

export default defineComponent({
  name: 'Auth',
  setup() {

    return {
      
    }
  },
  components: { AuthComponent }
})
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  min-width: 300px
  max-width: 500px
</style>