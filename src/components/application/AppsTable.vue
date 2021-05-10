<template>
  <v-card>
    <v-card-title>
      Apps List
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :hide-default-header="true"
      :hide-default-footer="true"
      :disable-pagination="true"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="name"
      show-expand
      :items="apps"
      :search="search"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editApp(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteApp(item)"> mdi-delete </v-icon>
      </template>

      <template v-slot:[`item.name`]="{ item }">
        <router-link :to="`apps/${item.id}`"> {{ item.name }}</router-link>
      </template>

      <template v-slot:no-data>
        <p class="mt-4">No apps yet..</p>
        <v-btn class="mb-4" text color="primary" :to="'/apps/create'" dark>
          Create APP
        </v-btn>
      </template>

      <template v-slot:expanded-item="{ item }">
        <td class="pa-5" :colspan="100">
          <p>
            Change
            <span class="font-weight-bold">{{ item.name }}</span> Subscription
          </p>

          <v-row>
            <v-col v-for="plan in plans" :key="plan.id">
              <plan-card
                :plan="plan"
                :app="item"
                @selectPlan="handleSelectPlan"
              />
            </v-col>
          </v-row>
        </td>
      </template>
    </v-data-table>

    <v-dialog
      v-if="selectedApp"
      v-model="editAppDialog"
      persistent
      max-width="790"
      >>
      <v-card>
        <v-card-title class="headline"> Edit App </v-card-title>
        <v-card-text>
          <app-form
            :app="selectedApp"
            @submitApp="handleSubmitApp"
            @cancel="editAppDialog = false"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import AppForm from "./AppForm.vue";
import PlanCard from "@/components/plan/PlanCard.vue";
export default {
  components: { AppForm, PlanCard },
  name: "ApplicationTable",

  props: {
    apps: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      search: "",
      headers: [
        {
          text: "",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "", value: "description" },
        { text: "", value: "framework" },
        { text: "", value: "type" },
        { text: "", value: "domain_name" },
        { text: "Actions", value: "actions", sortable: false },
        { text: "", value: "data-table-expand" },
      ],

      expanded: [],
      singleExpand: true,

      selectedApp: null,
      editAppDialog: false,
    };
  },

  computed: {
    ...mapGetters(["plans"]),
  },

  methods: {
    handleSubmitApp(app) {
      if (!app.screenshot) {
        delete app.screenshot;
      }

      console.log("handleSubmitApp", app);
      this.$store.dispatch("updateApp", app);
      this.editAppDialog = false;
      this.selectedApp = null;
    },

    editApp(app) {
      console.log("edit app", app);
      this.selectedApp = app;
      this.editAppDialog = true;
    },

    deleteApp(app) {
      console.log("delete app", app);
      this.$store.dispatch("deleteApp", app.id);
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
