<template>
<app-page title="Помощь">
     <div style="font-size: 16px">Добрый день! Если у вас возникли вопросы по работе с приложением, обращайтесь по ссылкам ниже:</div>
    <div class="wrap flex row justify-around">
        <AppButton  round color="primary"   disable>
            <a href="https://t.me/tarja_collins">
                <q-avatar size="85px">
                    <img src="~/assets/telegram-logo.svg">
                </q-avatar>
            </a>
        </AppButton>
        <AppButton  round color="primary"   disable>
            <a href="skype:cat_admiral?chat">
                <q-avatar size="85px">
                    <img src="~/assets/skype-logo.svg">
                </q-avatar>
            </a>
        </AppButton>
    </div>
</app-page>

</template>

<script>
import AppPage from 'components/ui/AppPage'
import AppButton from 'components/ui/AppButton'

export default {
    name: 'Help',
    components: {AppPage, AppButton}
}
</script>

<style lang="sass">
.wrap
    margin-top: 70px
    width: 400px
    padding-left: 100px
    padding-right: 100px
</style>