<template>
     <q-card-section>
                <div class="row">
                    <AppInput  
                        label="ФИО"
                        :modelValue="nameVal"
                        @update:modelValue="event => $emit('update:nameVal', event)"
                    />
                    <AppInput  
                        label="Email"
                        :modelValue="emailVal"
                        @update:modelValue="event => $emit('update:emailVal', event)"
                    />
                    <AppInput  
                        label="Телефон"
                        :modelValue="phoneVal"
                        @update:modelValue="event => $emit('update:phoneVal', event)"
                    />
                    <AppInput  
                        label="Компания"
                        :modelValue="companyVal"
                        @update:modelValue="event => $emit('update:companyVal', event)"
                    />
                    <AppInput  
                        label="Комментарий"
                        :modelValue="commentVal"
                        @update:modelValue="event => $emit('update:commentVal', event)"
                    />
                    <AppInput  
                        label="Общая стоимость услуг"
                        :modelValue="sumCostVal"
                        @update:modelValue="event => $emit('update:sumCostVal', event)"
                    />
                    <AppInput  
                        label="Статус"
                        :modelValue="statusVal"
                        @update:modelValue="event => $emit('update:statusVal', event)"
                    />
                    <AppInput  
                        label="Дата создания"
                        :modelValue="createDateVal"
                        @update:modelValue="event => $emit('update:createDateVal', event)"
                    />
                     <AppInput  
                        label="Дата обновления"
                        :modelValue="updateDateVal"
                        @update:modelValue="event => $emit('update:updateDateVal', event)"
                    />                    
                </div>
    </q-card-section>
</template>

<script>
import AppInput from 'components/ui/AppInput'

export default {
     components: {AppInput},
     props: {
        nameVal: [String],
        emailVal: [String],
        phoneVal: [String],
        companyVal: [String],
        commentVal: [String],
        sumCostVal: [String],
        statusVal: [String],
        createDateVal: [String],
        updateDateVal: [String],
    },
}
</script>