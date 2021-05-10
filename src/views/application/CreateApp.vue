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
          console.log("App created", response.data);
          this.$toasted.show(`App ${response.data.name} created`, {
            theme: "outline",
            position: "bottom-left",
            duration: 3000,
            type: "success",
            icon: "mdi-check",
            action: {
              text: "Close",
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
            },
          });

          this.$router.push(`/apps/${response.data.id}`);
        })
        .catch((error) => {
          console.log("Error createApp:", error, error.data);
        });
    },
  },
};
</script>

<style></style>
