<template>
     <q-card-section>
                <div class="row">
                    <AppSelect
                        label="Клиент"
                        :options="customerOptions"
                        :modelValue="customerVal"
                        @update:modelValue="event => $emit('update:customerVal', event)"
                        style="width: 160px"
                        behavior="menu"
                    />
                    <AppSelect
                        label="Услуги"
                        :options="servicesOptions"
                        :modelValue="servicesVal"
                        multiple
                        @update:modelValue="event => $emit('update:servicesVal', event)"
                        style="width: 160px"
                        behavior="menu"
                    />
                     <AppSelect
                        label="Статус"
                        :options="statusOptions"
                        :modelValue="statusVal"
                        @update:modelValue="event => $emit('update:statusVal', event)"
                        style="width: 160px"
                        behavior="menu"
                    />
                    <AppInput  
                        label="Стоимость"
                        :modelValue="projectSumVal"
                        @update:modelValue="event => $emit('update:projectSumVal', event)"
                    />
                    <AppInput  
                        label="Оплачено"
                        :modelValue="paymentVal"
                        @update:modelValue="event => $emit('update:paymentVal', event)"
                    />
                    <AppSelect
                        label="Статус оплаты"
                        :options="paymentStatusOptions"
                        :modelValue="paymentStatusVal"
                        @update:modelValue="event => $emit('update:paymentStatusVal', event)"
                        style="width: 160px"
                        behavior="menu"
                    />
                    <AppInput 
                        readonly
                        label="Дедлайн"
                        :modelValue="deadlineVal"
                        @update:modelValue="event => $emit('update:deadlineVal', event)"
                    />
                    <AppInput  
                        readonly
                        label="Дата создания"
                        :modelValue="createDateVal"
                        @update:modelValue="event => $emit('update:createDateVal', event)"
                    />
                     <AppInput  
                        readonly
                        label="Дата обновления"
                        :modelValue="updateDateVal"
                        @update:modelValue="event => $emit('update:updateDateVal', event)"
                    />                 
                    </div>
                    <AppInput  type="textarea" class="comment"
                        label="Комментарий*"
                        :modelValue="commentVal"
                        @update:modelValue="event => $emit('update:commentVal', event)"
                    />   
    </q-card-section>
</template>

<script>
import AppInput from 'components/ui/AppInput'
import AppSelect from 'components/ui/AppSelect'

export default {
     components: {AppInput, AppSelect},
     props: {
        customerVal: [String, Array, Number],
        servicesVal: [String, Array, Number],
        statusVal: [String],
        projectSumVal: [String, Number],
        paymentVal: [String, Number],
        paymentStatusVal: [String],
        deadlineVal: [String],
        createDateVal: [String],
        updateDateVal: [String],
        commentVal: [String],
        customerOptions: [Array],
        statusOptions: [Array],
        servicesOptions: [Array],
        paymentStatusOptions: [Array],
    },
}
</script>

<style lang="sass">
.comment
    max-width: 477px
</style>