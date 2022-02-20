<template>
   <q-input>
        <template v-slot:append>
          <AppIcon v-if="isIconClick" :name="icon" class="cursor-pointer"
            @click="popupShow = true">
            <slot></slot>
          </AppIcon>
           <AppIcon v-else :name="icon">
          </AppIcon>
        </template>
   </q-input>
</template>

<script>
import {ref} from 'vue'
import AppIcon from 'components/ui/AppIcon'

export default {
    name: 'app-input',
    components: {AppIcon},
    props: {
        icon: [String],
        isIconClick: [Boolean],
        colorFace: [String]
    },
    setup () {
      const popupShow = ref(false) 
      return {
        popupShow,
      }
    }
}
</script>
