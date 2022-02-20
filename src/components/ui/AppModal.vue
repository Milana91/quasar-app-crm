<template>
  <q-dialog persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">{{title}}</div>
        </q-card-section>
        <slot/>

        <q-card-actions align="right" class="text-primary">
          <AppButton flat :label="leftBtn" v-close-popup @click = "$emit('leftBtnAct')"/>
          <AppButton flat :label="rightBtn" v-close-popup @click = "$emit('submitForm')" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
import AppButton from 'components/ui/AppButton'

export default {
  emit: ['submitForm', 'leftBtnAct'],
  props: {
    title: {
      type: String,
      required: true
    },
    leftBtn: String,
    rightBtn: String
  },
  setup () {
    return {}
  },
  components: { AppButton }
}
</script>
