<template>
     <q-card-section class="q-pt-none">
        <div class="q-gutter-y-md column" style="max-width: 300px">
         <div class="q-md">{{ dateEvent }}</div>
          <AppInput  label="Название" 
          autofocus  
          :modelValue="titleEvent"
          @update:modelValue="event => $emit('update:titleEvent', event)"/>
          <AppInput  label="Описание" type="text" autofocus
           :modelValue="detailsEvent" 
           @update:modelValue="event => $emit('update:detailsEvent', event)" />
           <!-- <AppInput  label="Дата" type="date" autofocus
           :modelValue="dateEvent" 
           @update:modelValue="event => $emit('update:dateEvent', event)" /> -->
           <app-input-icon  label="Время"  :icon="colorIconTime" :isIconClick="true" type="text" autofocus
           :modelValue="timeEvent" 
           @update:modelValue="event => $emit('update:timeEvent', event)">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
               <q-time
                  :modelValue="timeEvent" @update:modelValue="event => $emit('update:timeEvent', event)"
                  format24h
               />
            </q-popup-proxy>
           </app-input-icon>
           <app-input-icon :icon="colorIcon" :isIconClick="true"  label="Цвет" type="text" autofocus
           :modelValue="modelValue" 
           @update:modelValue="event => $emit('update:modelValue', event)">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-color :modelValue="modelValue" @update:modelValue="event => $emit('update:modelValue', event)"/>
            </q-popup-proxy>
           </app-input-icon>
        </div>
     </q-card-section>
</template>

<script>
import {ref} from 'vue'
import AppInput from 'components/ui/AppInput'
import AppInputIcon from 'components/ui/AppInputIcon'


export default {
     components: {AppInput, AppInputIcon},
     props: {
        modelValue: [String, Number],
        titleEvent: [String],
        detailsEvent: [String],
        dateEvent: [String],
        timeEvent: [String],
        bgcolorEvent: [String],
        iconEvent: [String],
        colorIcon: [String],
        colorIconTime: [String]
    },
     setup(){

        return {
        }
    }
}
</script>
