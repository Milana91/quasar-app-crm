<template>
     <q-card-section class="q-pt-none">
        <div class="q-gutter-y-md column" style="max-width: 300px">
           <AppSelect
                        label="Клиент"
                        :options="customerOptions"
                        :modelValue="customer"
                        @update:modelValue="event => $emit('update:customer', event)"
                        style="width: 290px"
                        behavior="menu"
           />
           <AppSelect
                        :rules="[val => !!val || 'Выберите услуги']"
                        label="Услуги"
                        multiple
                        :options="servicesOptions"
                        :modelValue="services"
                        @update:modelValue="event => $emit('update:services', event)"
                        style="width: 290px"
                        behavior="menu"
                        :chips="true"
           />
           <AppInput filled label="Комментарий" type="text" autofocus
           :modelValue="comment" 
           @update:modelValue="event => $emit('update:comment', event)" />
           <AppInput :rules="[val => !!val || 'Введите дату дедлайна']" filled label="Дедлайн" type="date" autofocus
           :modelValue="deadline" 
           @update:modelValue="event => $emit('update:deadline', event)" />
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
        customer: [Array, String, Number],
        services: [Array, String, Number],
        comment: [String],
        deadline: [String],
        customerOptions: [Array],
        servicesOptions: [Array]
    },
     setup(){

        return {
        }
    }
}
</script>
