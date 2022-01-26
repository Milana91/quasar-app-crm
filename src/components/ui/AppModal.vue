<template>
  <q-dialog persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">{{title}}</div>
        </q-card-section>
        <slot/>
        <!-- <q-card-section class="q-pt-none">
          <q-input dense v-model="address" autofocus @keyup.enter="prompt = false" />
        </q-card-section>-->

        <q-card-actions align="right" class="text-primary">
          <AppButton flat :label="leftBtn" v-close-popup @click = "$emit('leftBtnAct')"/>
          <AppButton flat :label="rightBtn" v-close-popup @click = "$emit('submitForm')" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
import {ref, onMounted} from 'vue'
import AppButton from 'components/ui/AppButton'

export default {
  // name: 'ComponentName',
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
