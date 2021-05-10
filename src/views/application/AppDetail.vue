<template>
  <v-app>
    <v-row justify="center" no-gutters class="">
      <v-col md="8">
        <v-row justify="space-between" class="mb-2">
          <v-col cols="auto">
            <h1>{{ app.name }}</h1>
          </v-col>
        </v-row>

        <v-row justify="space-between" class="mb-2">
          <v-col cols="">
            <p>Name:</p>
          </v-col>
          <v-col cols="">
            <p class="font-weight-bold">{{ app.name }}</p>
          </v-col>
        </v-row>

        <v-row justify="space-between" class="mb-2">
          <v-col cols="">
            <p>Type:</p>
          </v-col>
          <v-col cols="">
            <p class="font-weight-bold">{{ app.type }}</p>
          </v-col>
        </v-row>

        <v-row justify="space-between" class="mb-2">
          <v-col cols="">
            <p>Description:</p>
          </v-col>
          <v-col cols="">
            <p class="font-weight-bold">{{ app.description }}</p>
          </v-col>
        </v-row>

        <v-row justify="space-between" class="mb-2">
          <v-col cols="">
            <p>Framework:</p>
          </v-col>
          <v-col cols="">
            <p class="font-weight-bold">{{ app.framework }}</p>
          </v-col>
        </v-row>

        <v-row justify="space-between" class="mb-2">
          <v-col cols="">
            <p>Domain Name:</p>
          </v-col>
          <v-col cols="">
            <p class="font-weight-bold">{{ app.domain_name }}</p>
          </v-col>
        </v-row>

        <v-card class="pa-4">
          <v-row>
            <v-col v-for="plan in plans" :key="plan.id">
              <plan-card
                :plan="plan"
                :app="app"
                @selectPlan="handleSelectPlan"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-btn @click="$router.push('/')">Back</v-btn>
    </v-row>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import PlanCard from "../../components/plan/PlanCard.vue";
export default {
  components: { PlanCard },
  name: "AppDetail",

  created() {
    this.initialize();
  },

  watch: {
    $route(to) {
      this.id = to.params.id;
      this.initialize();
    },
  },

  computed: {
    ...mapGetters(["plans"]),
  },

  data: function () {
    return {
      app: {},
    };
  },

  methods: {
    initialize() {
      this.appId = this.$route.params.id;
      this.$store
        .dispatch("getApp", this.appId)
        .then((response) => {
          this.app = response.data;
        })
        .catch((error) => {
          console.log("Error getApps:", error, error.data);
        });
    },

    handleSelectPlan(payload) {
      if (payload.currentSubscription) {
        let subscription = {
          ...payload.currentSubscription,
          plan: payload.plan.id,
        };
        this.$store.dispatch("updateSubscription", subscription);
      } else {
        let subscription = {
          app: payload.app.id,
          plan: payload.plan.id,
          active: true,
        };
        this.$store.dispatch("createSubscription", subscription);
      }
    },
  },
};
</script>

<style></style>
