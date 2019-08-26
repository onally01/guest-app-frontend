import { registerStaff, updateStaff, allStaff, deleteStaff } from "@/api/staff";

const staff = {
  state: {
    list: {}
  },

  mutations: {
    SET_STAFF_LIST: (state, list) => {
      state.list = list;
    }
  },

  actions: {
    // register staff
    RegisterStaff({ commit }, data) {
      return new Promise((resolve, reject) => {
        registerStaff(data)
          .then(response => {
            const data = response.data;
            commit("SET_STAFF_LIST", data);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // update staff
    UpdateStaff({ commit }, data) {
      return new Promise((resolve, reject) => {
        updateStaff(data)
          .then(response => {
            const data = response.data;
            commit("SET_STAFF_LIST", data);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // List all staffs
    AllStaff({ commit }, data) {
      return new Promise((resolve, reject) => {
        allStaff(data)
          .then(response => {
            const data = response.data;
            commit("SET_STAFF_LIST", data);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // delete staff
    DeleteStaff({ commit }, data) {
      return new Promise((resolve, reject) => {
        deleteStaff(data)
          .then(response => {
            const data = response.data;
            commit("SET_STAFF_LIST", data);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

export default staff;
