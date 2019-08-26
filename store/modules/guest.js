import {
  updateGuest,
  allGuest,
  registerGuest,
  deleteGuest,
  guestTimeOut
} from "@/api/guest";

const guest = {
  state: {
    list: {}
  },

  mutations: {
    SET_GUEST_LIST: (state, list) => {
      state.list = list;
    }
  },

  actions: {
    // register guest
    RegisterGuest({ commit }, data) {
      return new Promise((resolve, reject) => {
        registerGuest(data)
          .then(response => {
            const data = response.data;
            commit("SET_GUEST_LIST", data);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // update guest
    UpdateGuest({ commit }, data) {
      return new Promise((resolve, reject) => {
        updateGuest(data)
          .then(response => {
            const data = response.data;
            commit("SET_GUEST_LIST", data);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // List all guests
    AllGuest({ commit }, data) {
      return new Promise((resolve, reject) => {
        allGuest(data)
          .then(response => {
            const data = response.data;
            commit("SET_GUEST_LIST", data);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // delete guest
    DeleteGuest({ commit }, data) {
      return new Promise((resolve, reject) => {
        deleteGuest(data)
          .then(response => {
            const data = response.data;
            commit("SET_GUEST_LIST", data);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // Signout guest
    GuestTimeOut({ commit }, data) {
      return new Promise((resolve, reject) => {
        guestTimeOut(data)
          .then(response => {
            const data = response.data;
            commit("SET_GUEST_LIST", data);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

export default guest;
