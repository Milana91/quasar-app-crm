<template>
     <q-card-section class="q-pt-none">
        <div class="q-gutter-y-md column" style="max-width: 300px">
          <AppInput filled v-model="serviceTitle" label="Название" 
          :rules="[MyRule, val =>  !!val || 'Введите название']" 
          autofocus @keyup.enter="prompt = false" 
          :modelValue="title"
          @update:modelValue="event => $emit('update:title', event)"/>
          <AppInput filled label="Цена" type="number" autofocus  
          :rules="[val => !!val &&
           (val >= 0 || 'Значение должно быть больше 0') || 
           'Введите цену']" @keyup.enter="prompt = false" 
           :modelValue="cost" 
           @update:modelValue="event => $emit('update:cost', event)" />
        </div>
     </q-card-section>
</template>

<script>
import {ref, watch} from 'vue'
import AppInput from 'components/ui/AppInput'

export default {
     components: {AppInput},
     props: {
        title: [String, Number],
        cost: [String, Number]
    },
     setup(props){
        const MyRule = function (val) {
            return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve( !!val && val.length > 4 || 'Недостаточно символов')
            }, 3000)
            })
         }

         const serviceTitle = ref('')


        return {
            MyRule,
            serviceTitle
        }
    }
}
</script>
