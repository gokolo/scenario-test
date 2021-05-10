<template>
  <v-app>
    <div v-if="showHeader">
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

  computed: {
    showHeader() {
      if (this.$route.name == "Login" || this.$route.name == "Register") {
        return false;
      }
      return true;
    },
  },
};
</script>
