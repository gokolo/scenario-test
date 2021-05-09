<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="app.name"
      :rules="[(v) => !!v || 'Name is required']"
      label="Name"
      required
    ></v-text-field>

    <v-text-field v-model="app.description" label="Description"></v-text-field>
    <v-text-field v-model="app.domain_name" label="Domain Name"></v-text-field>

    <v-select
      v-model="app.type"
      :items="APP_TYPES"
      :rules="[(v) => !!v || 'Type is required']"
      label="Type"
      required
    ></v-select>

    <v-select
      v-model="app.framework"
      :items="APP_FRAMEWORKS"
      :rules="[(v) => !!v || 'Framework is required']"
      label="Framework"
      required
    ></v-select>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validateToSubmit"
    >
      Submit
    </v-btn>

    <v-btn class="mr-4" @click="$emit('cancel')"> Cancel </v-btn>
  </v-form>
</template>

<script>
export default {
  name: "CreateAppForm",

  props: {
    app: {
      type: Object,
      default: function () {
        return {
          name: "",
          description: "",
          domain_name: "",
          type: "",
          framework: "",
        };
      },
    },
  },

  data: function () {
    return {
      APP_TYPES: ["Web", "Mobile"],
      APP_FRAMEWORKS: ["Django", "React Native"],

      valid: true,
      nameRules: [(v) => !!v || "Name is required"],
    };
  },

  methods: {
    validateToSubmit() {
      if (this.$refs.form.validate()) {
        this.$emit("submitApp", this.app);
      }
    },
  },
};
</script>

<style></style>
