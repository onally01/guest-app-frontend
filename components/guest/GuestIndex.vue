<template>
  <v-app>
  <v-container>
    <!--Insert confirm component-->
    <confirm-dialog ref="confirm"></confirm-dialog>

    <!--Display guest log table-->
    <v-data-table
      :headers="headers"
      :items="guestLists"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>All Guest</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>

          <!--Search input field-->
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>

          <div class="flex-grow-1"></div>

          <!--Modal for form-->
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary"  class="mb-2" v-on="on"
                >New Guest</v-btn
              >
            </template>

            <!--Insert form component-->
            <GuestForm
              :formTitle="formTitle"
              :editedGuestField="editedGuestField"
              :closeDialog="closeDialog"
              :save="registerUpdateGuest"
              :errors="errors"
              :errorMessage="errorMessage"
            />
          </v-dialog>
        </v-toolbar>
      </template>

      <!--Table action-->
      <template v-slot:item.action="{ item }">
        <!--Guest Timeout Icon-->
        <v-icon
          v-if="item.time_out === null"
          title="time out"
          small
          color="red"
          class="mr-4"
          @click="guestTimeOut(item)"
        >
          av_timer
        </v-icon>

        <!--Edit Icon-->
        <v-icon title="edit" small class="mr-4" @click="editGuest(item)">
          edit
        </v-icon>

        <!--Delete Icon-->
        <v-icon small @click="deleteGuest(item)">
          delete
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
  </v-app>
</template>

<script>
import GuestForm from "./GuestForm";
import ConfirmDialog from "../ConfirmDialog";

export default {
  components: { ConfirmDialog, GuestForm },
  data: () => ({
    search: "",
    dialog: false,
    errors: true,
    errorMessage: {},
    // Table header
    headers: [
      {
        text: "Visitor Name",
        align: "left",
        value: "name"
      },
      { text: "Mobile", value: "mobile" },
      { text: "Email", value: "email" },
      {
        text: "Staff Name",
        align: "left",
        value: "staff.name"
      },
      { text: "Purpose", value: "purpose", width: "250px" },
      { text: "Time In", value: "time_in" },
      { text: "Time Out", value: "time_out" },
      { text: "Date", value: "date" },
      { text: "Actions", value: "action", sortable: false }
    ],
    guestLists: [],
    editedIndex: -1,
    editedGuestField: {
      id: "",
      name: "",
      staff: "",
      purpose: "",
      mobile: "",
      email: ""
    },
    defaultGuestField: {
      name: "",
      staff: "",
      purpose: "",
      mobile: "",
      email: ""
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Guest" : "Edit Guest";
    }
  },
  watch: {
    dialog(val) {
      val || this.closeDialog();
    },
    errors(val) {
      if (val === false) return false;
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    // Get all guest list
    initialize() {
      this.dispatch("AllGuest");
    },
    editGuest(item) {
      this.editedIndex = this.guestLists.indexOf(item);
      this.editedGuestField = Object.assign({}, item);
      this.editedGuestField.staff = item.staff.id;
      this.dialog = true;
    },
    deleteGuest(item) {
      this.$refs.confirm
        .open("Delete", "Are you sure?", { color: "red" })
        .then(confirm => {
          if (confirm) {
            this.dispatch("DeleteGuest", item);
          }
        });
      this.$nextTick(() => {
        this.initialize();
      });
    },
    guestTimeOut(item) {
      this.$refs.confirm
        .open("Time Out Guest", "Are you sure?", { color: "red" })
        .then(confirm => {
          if (confirm) {
            this.dispatch("GuestTimeOut", item);
          }
        });
      this.$nextTick(() => {
        this.initialize();
      });
    },
    closeDialog() {
      this.dialog = false;
      this.errorMessage = {};
      setTimeout(() => {
        this.editedGuestField = Object.assign({}, this.defaultGuestField);
        this.editedIndex = -1;
      }, 300);
    },
    registerUpdateGuest() {
      // declare a variable for this because of the setTimeout
      var self = this;

      // Check if it is an update or new log
      if (self.editedIndex > -1) {
        self.dispatch("UpdateGuest", self.editedGuestField);
      } else {
        self.dispatch("RegisterGuest", self.editedGuestField);
      }
      // set timeout
      setTimeout(function() {
        if (self.errors === false) {
          return false;
        } else {
          self.$nextTick(() => {
            self.initialize();
          });
        }
      }, 100);
    },
    // Trigger actions
    dispatch(action, data = null) {
      this.$store
        .dispatch(action, data)
        .then(() => {
          this.guestLists = this.$store.getters.listGuest;
          this.closeDialog();
        })
        .catch(error => {
          this.errors = false;
          this.errorMessage = error.response.data;
          console.log("errors", this.errorMessage);
        });
    }
  }
};
</script>
