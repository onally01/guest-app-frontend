<template>
  <v-app>
  <v-container>
    <!--Insert confirm component-->
    <confirm-dialog ref="confirm"></confirm-dialog>

    <!--Display staff log table-->
    <v-data-table
      :headers="headers"
      :items="staffLists"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>All Staff</v-toolbar-title>
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
              <v-btn color="primary" dark class="mb-2" v-on="on"
                >New Staff</v-btn
              >
            </template>

            <!--Insert form component-->
            <StaffForm
              :formTitle="formTitle"
              :editedStaffField="editedStaffField"
              :closeDialog="closeDialog"
              :save="registerUpdateStaff"
              :errors="errors"
              :errorMessage="errorMessage"
            />
          </v-dialog>
        </v-toolbar>
      </template>

      <!--Table action-->
      <template v-slot:item.action="{ item }">
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
import StaffForm from "./StaffForm";
import ConfirmDialog from "../ConfirmDialog";

export default {
  components: { ConfirmDialog, StaffForm },
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
      { text: "Department", value: "department.name" },
      { text: "Date", value: "date" },
      { text: "Actions", value: "action", sortable: false }
    ],
    staffLists: [],
    editedIndex: -1,
    editedStaffField: {
      id: "",
      name: "",
      department: ""
    },
    defaultStaffField: {
      name: "",
      department: ""
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Staff" : "Edit Staff";
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
    // Get all staff list
    initialize() {
      this.dispatch("AllStaff");
    },
    editGuest(item) {
      this.editedIndex = this.staffLists.indexOf(item);
      this.editedStaffField = Object.assign({}, item);
      this.editedStaffField.department = item.department.id;
      this.dialog = true;
    },
    deleteGuest(item) {
      this.$refs.confirm
        .open("Delete", "Are you sure?", { color: "red" })
        .then(confirm => {
          if (confirm) {
            this.dispatch("DeleteStaff", item);
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
        this.editedStaffField = Object.assign({}, this.defaultStaffField);
        this.editedIndex = -1;
      }, 300);
    },
    registerUpdateStaff() {
      // declare a variable for this because of the setTimeout
      var self = this;

      // Check if it is an update or new log
      if (self.editedIndex > -1) {
        self.dispatch("UpdateStaff", self.editedStaffField);
      } else {
        self.dispatch("RegisterStaff", self.editedStaffField);
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
          this.staffLists = this.$store.getters.listStaff;
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
