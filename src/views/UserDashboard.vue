<template>
  <v-app>
    <v-row justify="center" no-gutters class="">
      <v-col md="8">
        <v-row justify="space-between" class="mb-2">
          <v-col cols="auto">
            <h1>Overview</h1>
          </v-col>
          <v-col cols="auto">
            <v-btn large color="primary" :to="'/apps/create'" dark>
              Create APP
            </v-btn>
          </v-col>
        </v-row>

        <apps-table :apps="apps" />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import AppsTable from "../components/application/AppsTable.vue";
export default {
  name: "Dashboard",

  components: { AppsTable },

  mounted() {
    this.initialize();
  },

  computed: {
    ...mapGetters(["apps"]),
  },

  data: function () {
    return {
      title: "Dashboard",
    };
  },

  methods: {
    initialize() {
      this.$store.dispatch("getApps");
      this.$store.dispatch("getSubscriptions");
      this.$store.dispatch("getPlans");
    },
  },
};
</script>

<style></style>
