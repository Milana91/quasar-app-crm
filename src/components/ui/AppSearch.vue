<template>
    <q-input  class="q-mb-md" v-model="searchText" label="Поиск" :dense="dense">
        <template v-slot:append>
            <q-icon v-if="searchText !== ''" name="close" @click="searchText = ''" class="cursor-pointer" />
            <q-icon name="search" />
        </template>
    </q-input>
        <!-- <div class="form-field">
            <select v-model="status"> 
                <option value="defVal" disabled selected hidden>Выберите статус</option>
                <option value="done">Завершен</option>
                <option value="active">Активен</option>
            </select>
        </div>
        <button class="btn warning" v-if="isActive" @click="resetBtn">Очистить</button> -->
</template>
<script>
import {ref, watch, computed} from 'vue'

export default {
    emits: ['update:modelValue'],
    props: ['modelValue'],
    setup(_, {emit} ) {
        const searchText = ref('')
        const dense = ref(false)

        watch(searchText, val => {
            console.log(searchText.value)
            emit('update:modelValue', {searchText: val})
        })

        return {
            searchText,
            dense
        }
    }
}
</script>