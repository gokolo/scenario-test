<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6">
            <v-card class="elevation-12 pa-2">
              <v-card-title>
                <v-spacer />
                <span class="bauhaus">Crowdbotics</span>
                <v-spacer />
              </v-card-title>
              <div class="text-center">
                <span class="sub-title">Create account</span>
              </div>
              <v-card-text>
                <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    required
                    label="Email"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    type="password"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" dark @click="signup"> Sign Up </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      valid: true,
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      password: "",
      passwordRules: [(v) => !!v || "Password is required"],
      lazy: false,
    };
  },
  methods: {
    signup() {
      this.$refs.form.validate();
      if (this.valid) {
        let payload = {
          email: this.email,
          password: this.password,
        };
        this.$store
          .dispatch("register", payload)
          .then((response) => {
            this.$store.dispatch("setToken", response.data.key);
            this.$store
              .dispatch("getAuthenticatedUser")
              .then((response2) => {
                this.$store.dispatch("setUser", response2.data);
                this.$router.push("/dashboard");
              })
              .catch((error) => {
                console.log("Error getAuthenticatedUser:", error, error.data);
              });
          })
          .catch(() => {
            console.log("The email or password is incorrect.");
          });
      }
    },
  },
};
</script>

<style scoped>
#errorMsgDiv {
  border-radius: 4px;
  margin-bottom: 15px;
}
.progress {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
  width: 100px;
  height: 100px;
}
</style>
