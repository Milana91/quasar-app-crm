<template>
     <q-card-section class="q-pt-none">
        <div class="q-gutter-y-md column" style="max-width: 300px">
          <AppInput filled label="Имя пользователя" 
          :rules="[MyRule, val =>  !!val || 'Введите имя пользователя']" 
          autofocus  
          :modelValue="name"
          @update:modelValue="event => $emit('update:name', event)"/>
          <AppInput filled label="Email" type="text" autofocus
           :modelValue="email" 
           @update:modelValue="event => $emit('update:email', event)" />
        </div>
     </q-card-section>
</template>

<script>
import {ref} from 'vue'
import AppInput from 'components/ui/AppInput'

export default {
     components: {AppInput},
     props: {
        name: [String],
        email: [String],
    },
     setup(){
        const MyRule = function (val) {
            return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve( !!val && val.length > 4 || 'Недостаточно символов')
            }, 3000)
            })
         }

        return {
            MyRule,
        }
    }
}
</script>
