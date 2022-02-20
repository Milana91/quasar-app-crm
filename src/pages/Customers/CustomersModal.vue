<template>
  <q-card-section class="q-pt-none">
    <div class="q-gutter-y-md column" style="max-width: 300px">
      <AppInput
        filled
        label="ФИО клиента"
        :rules="[MyRule, (val) => !!val || 'Введите ФИО клиента']"
        autofocus
        :modelValue="name"
        @update:modelValue="(event) => $emit('update:name', event)"
      />
      <AppInput
        filled
        label="Email"
        type="text"
        autofocus
        :modelValue="email"
        @update:modelValue="(event) => $emit('update:email', event)"
      />
      <AppInput
        filled
        label="Телефон"
        type="tel"
        autofocus
        :modelValue="phone"
        @update:modelValue="(event) => $emit('update:phone', event)"
      />
      <AppInput
        filled
        label="Компания"
        type="text"
        autofocus
        :modelValue="company"
        @update:modelValue="(event) => $emit('update:company', event)"
      />
      <AppInput
        filled
        label="Комментарий"
        type="text"
        autofocus
        :modelValue="comment"
        @update:modelValue="(event) => $emit('update:comment', event)"
      />
    </div>
  </q-card-section>
</template>

<script>
import AppInput from "components/ui/AppInput";

export default {
  components: { AppInput },
  props: {
    name: [String],
    email: [String],
    phone: [String],
    company: [String],
    comment: [String],
  },
  setup() {
    const MyRule = function (val) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve((!!val && val.length > 4) || "Недостаточно символов");
        }, 3000);
      });
    };

    return {
      MyRule,
    };
  },
};
</script>
