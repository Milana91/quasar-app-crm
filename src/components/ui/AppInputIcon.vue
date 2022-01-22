<template>
   <q-input>
        <template v-slot:append>
          <!-- <component :is="activeComponent" :round="isIconBtn" :dense="isIconBtn" flat="isIconBtn"  :name="icon"> </component> -->
          <AppIcon v-if="isIconClick" :name="icon" class="cursor-pointer"
            @click="popupShow = true">
            <slot></slot>
            <!-- <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-color :modelValue="modelValue" @update:modelValue="event => $emit('update:modelValue', event)"/>
            </q-popup-proxy> -->
          </AppIcon>
           <AppIcon v-else :name="icon">
          </AppIcon>
        </template>
   </q-input>
</template>

<script>
import {ref, computed} from 'vue'
import AppIcon from 'components/ui/AppIcon'
import AppButton from 'components/ui/AppButton'

export default {
    name: 'app-input',
    // emits: ['updateInput'],
    components: {AppIcon},
    props: {
        // modelValue: [String, Number],
        icon: [String],
        isIconClick: [Boolean],
        colorFace: [String]
        // colorFace: [String]
        // isIconBtn: [Boolean]
    },
    setup (props, { emit }) {
      const popupShow = ref(false) 
      // const colorFace = ref('#666')
    //   const activeComponent = computed(() => {
    //   if (props.isIconBtn) {
    //     return AppButton
    //   }
    //   else return AppIcon
    // })
      return {
        // colorFace,
        popupShow,
      }
    }
}
</script>
