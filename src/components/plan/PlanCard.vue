<template>
  <v-card>
    <v-card-text>
      <div>{{ plan.description }}</div>
      <p class="display-1 text--primary">{{ plan.name }}</p>
      <p v-if="plan.price > 0">$ {{ plan.price }}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn width="100%" v-if="isCurrentPlan" disabled> Current </v-btn>

      <v-btn
        width="100%"
        v-else
        @click="$emit('selectPlan', { plan, currentSubscription, app })"
        color="primary"
      >
        Select
      </v-btn>
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
    app: {
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
    isCurrentPlan() {
      let subscription = this.subscriptions.find(
        (el) => el.active && el.plan == this.plan.id && el.app == this.app.id
      );
      return Boolean(subscription);
    },
    currentSubscription() {
      let subscription = this.subscriptions.find(
        (el) => el.active && el.app == this.app.id
      );
      return subscription || null;
    },
  },
};
</script>

<style></style>
