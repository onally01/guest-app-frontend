<template>
  <v-card>
    <!--Form title-->
    <v-card-title>
      <span class="headline">{{ formTitle }}</span>
    </v-card-title>

    <!--Form field-->
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="8" md="6">
            <v-text-field
              v-model="editedDepartmentField.name"
              label="Department name"
            ></v-text-field>
            <span
              v-if="errorMessage.name"
              :errors="errors"
              class="error--text"
              >{{ errorMessage.name[0] }}</span
            >
          </v-col>

        </v-row>
      </v-container>
    </v-card-text>

    <!--Form action-->
    <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
      <v-btn color="blue darken-1" text @click="save">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: "DepartmentForm",
  props: {
    formTitle: {
      type: String,
      required: true
    },
      editedDepartmentField: {
      type: Object,
      required: true
    },
    errorMessage: {
      type: Object,
      required: true
    },
    errors: {
      type: Boolean,
      required: true
    },
    closeDialog: {
      type: Function,
      required: true
    },
    save: {
      type: Function,
      required: true
    }
  }
};
</script>
