<template>
  <v-app>
  <v-container>
    <!--Insert confirm component-->
    <confirm-dialog ref="confirm"></confirm-dialog>

    <!--Display department table-->
    <v-data-table
      :headers="headers"
      :items="departmentLists"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title class="mr-10">All Departments</v-toolbar-title>
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
          <v-dialog v-model="dialog" max-width="500px" max-height="500px">

            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on"
                >New Department</v-btn
              >
            </template>

            <!--Insert form component-->
            <DepartmentForm
              :formTitle="formTitle"
              :editedDepartmentField="editedDepartmentField"
              :closeDialog="closeDialog"
              :save="registerUpdateDepartment"
              :errors="errors"
              :errorMessage="errorMessage"
            />
          </v-dialog>
        </v-toolbar>
      </template>

      <!--Table actions-->
      <template v-slot:item.action="{ item }">
        <!--Edit Icon-->
        <v-icon title="edit" small class="mr-4" @click="editDepartment(item)">
          edit
        </v-icon>

        <!--Delete Icon-->
        <v-icon small @click="deleteDepartment(item)">
          delete
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
  </v-app>
</template>

<script>
import DepartmentForm from "./DepartmentForm";
import ConfirmDialog from "../ConfirmDialog";

export default {
  components: { ConfirmDialog, DepartmentForm },
  data: () => ({
    search: "",
    dialog: false,
    errors: true,
    errorMessage: {},
    // Table header
    headers: [
      {
        text: "Department Name",
        align: "left",
        value: "name"
      },
      { text: "Date", value: "date" },
      { text: "Actions", value: "action", sortable: false }
    ],
    departmentLists: [],
    editedIndex: -1,
    editedDepartmentField: {
      id: "",
      name: "",
      department: ""
    },
    defaultDepartmentField: {
      name: "",
      department: ""
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Department" : "Edit Department";
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
      this.dispatch("AllDepartment");
    },
    editDepartment(item) {
      this.editedIndex = this.departmentLists.indexOf(item);
      this.editedDepartmentField = Object.assign({}, item);
      this.dialog = true;
    },
    deleteDepartment(item) {
      this.$refs.confirm
        .open("Delete", "Are you sure?", { color: "red" })
        .then(confirm => {
          if (confirm) {
            this.dispatch("DeleteDepartment", item);
          }
        });
      // refresh table
      this.$nextTick(() => {
        this.initialize();
      });
    },
    closeDialog() {
      this.dialog = false;
      this.errorMessage = {};
      setTimeout(() => {
        this.editedDepartmentField = Object.assign({}, this.defaultDepartmentField);
        this.editedIndex = -1;
      }, 300);
    },
    registerUpdateDepartment() {
      // declare a variable for this because of the setTimeout
      var self = this;

      // Check if it is an update or new log
      if (self.editedIndex > -1) {
        self.dispatch("UpdateDepartment", self.editedDepartmentField);
      } else {
        self.dispatch("RegisterDepartment", self.editedDepartmentField);
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
          this.departmentLists = this.$store.getters.listDepartment;
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

