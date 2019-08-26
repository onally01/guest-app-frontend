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
              v-model="editedGuestField.name"
              label="Guest name"
            ></v-text-field>
            <span
              v-if="errorMessage.name"
              :errors="errors"
              class="error--text"
              >{{ errorMessage.name[0] }}</span
            >
          </v-col>
          <v-col cols="12" sm="8" md="6">
            <v-select
              v-model="editedGuestField.staff"
              :items="staff"
              item-value="id"
              item-text="name"
              label="Select Staff"
            ></v-select>
            <span
              v-if="errorMessage.staff"
              :errors="errors"
              class="error--text"
              >{{ errorMessage.staff[0] }}</span
            >
          </v-col>
          <v-col cols="12" sm="8" md="6">
            <v-text-field
              v-model="editedGuestField.mobile"
              label="Mobile"
            ></v-text-field>
            <span
              v-if="errorMessage.mobile"
              :errors="errors"
              class="error--text"
              >{{ errorMessage.mobile[0] }}</span
            >
          </v-col>
          <v-col cols="12" sm="8" md="6">
            <v-text-field
              v-model="editedGuestField.email"
              label="Email"
            ></v-text-field>
            <span
              v-if="errorMessage.email"
              :errors="errors"
              class="error--text"
              >{{ errorMessage.email[0] }}</span
            >
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-textarea
              v-model="editedGuestField.purpose"
              label="Purpose"
            ></v-textarea>
            <span
              v-if="errorMessage.purpose"
              :errors="errors"
              class="error--text"
              >{{ errorMessage.purpose[0] }}</span
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
  name: "GuestForm",
  props: {
    formTitle: {
      type: String,
      required: true
    },
      editedGuestField: {
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
  },
  data() {
    return {
      staff: []
    };
  },
  created() {
    this.initializeStaff();
  },

  methods: {
    // Get all staff list
    initializeStaff() {
      this.$store.dispatch("AllStaff").then(() => {
        this.staff = this.$store.getters.listStaff;
      });
    }
  }
};
</script>
