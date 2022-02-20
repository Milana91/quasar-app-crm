<template>
  <div class="q-pa-md q-gutter-sm">
        <q-dialog :modelValue="modelValue" persistent >
            <q-card>
              <q-card-section>
                <div class="text-h6">{{title}}</div>
              </q-card-section>

              <slot/>
              
              <q-card-actions align="right">
                <AppButton flat label="Отмена" v-close-popup @clickAction="$emit('closeModal')" />
                <AppButton flat label="OK" v-close-popup @clickAction="$emit('submitUpdate')"/>
              </q-card-actions>
            </q-card>
        </q-dialog>
      </div>
</template>


<script>
import {ref, onMounted} from 'vue'
import AppButton from 'components/ui/AppButton'


export default {
  emit: ['submitUpdate'],
  props: {
    title: {
      type: String,
      required: true
    },
    modelValue: {}
  },
  setup () {
  
    return {}
  },
  components: { AppButton }
}
</script>
