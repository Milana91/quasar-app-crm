<template>
  <div class="text-h4 flex row justify-center">Сегодня: {{todayDate}}</div>
  <div class="flex row justify-center items-center">
    <div class="q-pa-md q-gutter-sm row" >
      <q-btn
        no-caps
        class="button"
        style="margin: 2px;"
        @click="$emit('today')"
      >
        Сегодня
      </q-btn>
      <q-btn
        no-caps
        class="button"
        style="margin: 2px;"
        @click="$emit('prev')"
      >
        &lt; Назад
      </q-btn>
      <q-btn
        no-caps
        class="button"
        style="margin: 2px;"
        @click="$emit('next')"
      >
        Вперед &gt;
      </q-btn>
    </div>
  </div>
</template>

<script>
export default {
  setup () {
    const todayDate = new Date().toLocaleDateString("ru", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timezone: 'UTC'
    })


    return {
      todayDate
    }
  }
}
</script>