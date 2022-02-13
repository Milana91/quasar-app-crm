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
           <AppInput filled label="Пароль" type="text" autofocus
           :modelValue="password" 
           @update:modelValue="event => $emit('update:password', event)" />
           <AppSelect
                label="Услуги"
                :options="usersRoles"
                :modelValue="users"
                @update:modelValue="event => $emit('update:users', event)"
                style="width: 290px; margin-left: 7px"
                behavior="menu"
           />
        </div>
     </q-card-section>
</template>

<script>
import {ref} from 'vue'
import AppInput from 'components/ui/AppInput'
import AppSelect from 'components/ui/AppSelect'

export default {
     components: {AppInput, AppSelect},
     props: {
        users: [Array, String],
        name: [String],
        email: [String],
        password: [String],
        usersRoles: [Array]
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