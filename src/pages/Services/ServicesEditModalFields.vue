<template>
     <q-card-section>
                <div class="row">
                    <AppInput  
                        label="Название услуги"
                        :modelValue="titleVal"
                        @update:modelValue="event => $emit('update:titleVal', event)"
                    />
                    <AppInput  
                        label="Стоимость"
                        :modelValue="costVal"
                        @update:modelValue="event => $emit('update:costVal', event)"
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
                    <AppInput  
                        label="Количество заказов"
                        :modelValue="numbersVal"
                        @update:modelValue="event => $emit('update:numbersVal', event)"
                    />
                </div>
    </q-card-section>
</template>

<script>
import AppInput from 'components/ui/AppInput'

export default {
     components: {AppInput},
     props: {
        titleVal: [String, Number],
        costVal: [String, Number],
        createDateVal: [String, Number],
        updateDateVal: [String, Number],
        numbersVal: [String, Number],
    },
}
</script>