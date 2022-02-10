<template>
     <q-card-section>
                <div class="row">
                    <AppInput  
                        label="Имя пользователя"
                        :modelValue="nameVal"
                        @update:modelValue="event => $emit('update:nameVal', event)"
                    />
                    <AppInput  
                        label="Email"
                        :modelValue="emailVal"
                        @update:modelValue="event => $emit('update:emailVal', event)"
                    />
    </q-card-section>
</template>

<script>
import AppInput from 'components/ui/AppInput'

export default {
    components: {AppInput},
    props: {
        nameVal: [String],
        emailVal: [String],
    },
}
</script>

<style lang="sass">
.comment
    max-width: 477px
</style>