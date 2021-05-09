<template>
  <div>
    <v-row justify="space-between">
      <v-col cols="auto">
        <h1>Overview</h1>
      </v-col>
      <v-col cols="auto">
        <v-btn x-large color="success" dark> Create APP </v-btn>
      </v-col>
    </v-row>

    <applications-table />
  </div>
</template>

<script>
import ApplicationsTable from "../components/application/ApplicationsTable.vue";
export default {
  name: "Dashboard",

  components: { ApplicationsTable },

  data: function () {
    return {
      title: "Dashboard",
    };
  },
};
</script>

<style></style>
