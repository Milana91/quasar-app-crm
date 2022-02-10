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
                        readonly
                        label="Общая стоимость услуг"
                        :modelValue="sumCostVal"
                        @update:modelValue="event => $emit('update:sumCostVal', event)"
                    />
                    <!-- <AppInput  
                        label="Статус"
                        :modelValue="statusVal"
                        @update:modelValue="event => $emit('update:statusVal', event)"
                    /> -->
                    <AppSelect
                        label="Статус"
                        :options="optionsVal"
                        :modelValue="statusVal"
                        @update:modelValue="event => $emit('update:statusVal', event)"
                        style="width: 160px"
                        behavior="menu"
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
        nameVal: [String],
        emailVal: [String],
        phoneVal: [String],
        companyVal: [String],
        commentVal: [String],
        sumCostVal: [String, Number],
        statusVal: [String],
        createDateVal: [String],
        updateDateVal: [String],
        optionsVal: [Array]
    },
}
</script>

<style lang="sass">
.comment
    max-width: 477px
</style>