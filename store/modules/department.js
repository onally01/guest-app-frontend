import {
  updateDepartment,
  allDepartment,
  registerDepartment,
  deleteDepartment
} from "../../api/department";

const department = {
  state: {
    list: {}
  },

  mutations: {
    SET_DEPARTMENT_LIST: (state, list) => {
      state.list = list;
    }
  },

  actions: {
    // register department
    RegisterDepartment({ commit }, data) {
      return new Promise((resolve, reject) => {
        registerDepartment(data)
          .then(response => {
            const data = response.data;
            console.log('All department', data)
            commit("SET_DEPARTMENT_LIST", data);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // update department
    UpdateDepartment({ commit }, data) {
      return new Promise((resolve, reject) => {
        updateDepartment(data)
          .then(response => {
            const data = response.data;
            commit("SET_DEPARTMENT_LIST", data);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // List all department
    AllDepartment({ commit }, data) {
      return new Promise((resolve, reject) => {
        allDepartment(data)
          .then(response => {
            const data = response.data;
            commit("SET_DEPARTMENT_LIST", data);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // delete department
    DeleteDepartment({ commit }, data) {
      return new Promise((resolve, reject) => {
        deleteDepartment(data)
          .then(response => {
            const data = response.data;
            commit("SET_DEPARTMENT_LIST", data);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

export default department;
