<template>
  <q-page class="flex row q-pa-md justify-center">
    <TopCustomers style="margin-right: 50px" />
    <SalesAmountChart style="margin-left: 50px" />
  </q-page>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import TopCustomers from "components/graphics/TopCustomers";
import SalesAmountChart from "components/graphics/SalesAmountChart";

export default {
  name: "Home",
  setup() {
    const store = useStore();
    const router = useRouter();

    return {
      // logout
    };
  },
  components: { TopCustomers, SalesAmountChart },
};
</script>

<style lang="sass"></style>
