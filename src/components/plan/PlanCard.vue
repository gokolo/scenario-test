<template>
  <v-card>
    <v-card-text>
      <div>{{ plan.description }}</div>
      <p class="display-1 text--primary">{{ plan.name }}</p>
      <p v-if="plan.price > 0">$ {{ plan.price }}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn width="100%" color="primary"> Select </v-btn>

      <!-- <v-btn width="100%" disabled> Current </v-btn> -->
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "PlanCard",

  props: {
    plan: {
      type: Object,
      required: true,
    },
  },

  data: function () {
    return {
      title: "PlanCard",
    };
  },

  computed: {
    ...mapGetters(["subscriptions"]),
  },

  methods: {
    isActivePlan() {
      console.log("isActivePlan");
    },
  },
};
</script>

<style></style>
