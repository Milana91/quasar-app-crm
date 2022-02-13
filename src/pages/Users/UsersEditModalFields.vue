<template>
     <q-card-section>
                <div class="row">
                    <AppInput  
                        label="Имя пользователя"
                        :modelValue="nameVal"
                        @update:modelValue="event => $emit('update:nameVal', event)"
                    />
                     <AppInput 
                        readonly
                        label="Email"
                        :modelValue="emailVal"
                        @update:modelValue="event => $emit('update:emailVal', event)"
                    />
                    <AppSelect
                        label="Права пользователя"
                        :options="rolesOptions"
                        :modelValue="roleVal"
                        @update:modelValue="event => $emit('update:roleVal', event)"
                        style="width: 160px"
                        behavior="menu"
                    />
                </div>    
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
        roleVal: [String],
        rolesOptions: [Array],
    },
}
</script>

