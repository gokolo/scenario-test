<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <h1>Crowdbotics</h1>
    </div>

    <v-spacer></v-spacer>

    <v-toolbar-title class="mr-2" v-if="user">{{
      user.username
    }}</v-toolbar-title>

    <v-btn @click="logoutUser" text>
      <span class="mr-2">Logout</span>
      <v-icon>mdi-power</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "TheHeader",

  computed: {
    ...mapGetters(["user"]),
  },

  methods: {
    ...mapActions(["logout"]),
    logoutUser() {
      this.logout()
        .then(() => {
          this.$toasted.show("You have been succesfully logged out!", {
            theme: "outline",
            position: "bottom-left",
            duration: 3000,
            type: "info",
            icon: "mdi-info",
            action: {
              text: "Close",
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
            },
          });
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log("Error logging out:", error, error.data);
        });
    },
  },
};
</script>
