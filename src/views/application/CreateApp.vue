<template>
  <v-app>
    <v-row justify="center" no-gutters class="">
      <v-col md="8">
        <v-row justify="space-between" class="mb-2">
          <v-col cols="auto">
            <h1>Create App</h1>
          </v-col>
        </v-row>
        <app-form @submitApp="handleSubmitApp" @cancel="$router.go(-1)" />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import AppForm from "../../components/application/AppForm.vue";
export default {
  name: "CreateApp",

  components: { AppForm },

  data: function () {
    return {};
  },

  methods: {
    handleSubmitApp(app) {
      this.$store
        .dispatch("createApp", app)
        .then((response) => {
          console.log("App crated", response.data);
          this.$router.push(`/apps/${response.data.id}`);
          // TODO ALERT
        })
        .catch((error) => {
          console.log("Error createApp:", error, error.data);
        });
    },
  },
};
</script>

<style></style>
