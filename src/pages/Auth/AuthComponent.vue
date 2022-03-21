<template>
  <div class="row justify-center" v-if="loading">
    <q-spinner color="primary" size="11em" :thickness="2" />
  </div>
  <div v-else>
    <q-form @submit="submitForm">
      <q-input
        outlined
        class="q-mb-md"
        type="email"
        :rules="[(val) => !!val || 'Введите email']"
        label="Email"
        v-model="formData.email"
      />
      <q-input
        outlined
        class="q-mb-md"
        type="password"
        :rules="[(val) => !!val || 'Введите пароль']"
        label="Пароль"
        v-model="formData.password"
      />
      <div class="column items-center">
        <AppButton type="submit" label="Войти" />
      </div>
    </q-form>
    <div class="text-center q-my-md">
      <q-btn
        flat
        label="Забыли пароль?"
        color="green"
        class="text-capitalize rounded-borders"
        @click="forgotPassword"
      />
    </div>
    <div class="text-center q-my-md">
      <router-link v-slot="{ navigate }" custom :to="{ path: '/help' }">
        <q-btn
          flat
          label="Помощь"
          color="cyan-9"
          class="text-capitalize rounded-borders"
          @click="navigate"
        />
      </router-link>
    </div>
    <q-dialog v-model="resetPassword">
      <ForgotPassword />
    </q-dialog>
  </div>
</template>

<script>
import { ref, computed, reactive } from "vue";
import ForgotPassword from "pages/Auth/ForgotPassword";
import firebase from "firebase/compat/app";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { error } from "src/utils/error";
import { useStore } from "vuex";
import AppButton from "components/ui/AppButton";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default {
  name: "AuthComponent",
  setup() {
    const auth = getAuth();
    const $q = useQuasar();
    const router = useRouter();
    const store = useStore();

    const loading = computed(() => store.state.authenticate.loading);

    const formData = reactive({
      email: "",
      password: "",
    });
    const resetPassword = ref(false);

    const signInExistingUser = async (email, password) => {
      await store.dispatch("authenticate/signIn", { email, password });
       router.push("/home")
      // setTimeout(() => {
      //   router.push("/home");
      // }, 4000);
    };

    const submitForm = function () {
      signInExistingUser(formData.email, formData.password);
    };

    const forgotPassword = function () {
      resetPassword.value = true;
    };

    return {
      formData,
      resetPassword,
      submitForm,
      signInExistingUser,
      forgotPassword,
      loading,
    };
  },
  components: { ForgotPassword, AppButton },
};
</script>

<style lang="sass" scoped></style>
