<template>
  <v-app>
    <div v-if="$route.name != 'Login'">
      <the-header />
      <v-main class="mt-5">
        <router-view />
      </v-main>
    </div>
    <v-container v-else class="my-2">
      <router-view />
    </v-container>
  </v-app>
</template>

<script>
import TheHeader from "./components/shared/TheHeader.vue";
export default {
  name: "App",

  components: { TheHeader },

  mounted() {
    this.$store.dispatch("getPlans");
  },
};
</script>
