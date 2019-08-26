
import Vuex from "vuex";
import staff from "@/store/modules/staff";
import guest from "@/store/modules/guest";
import department from "@/store/modules/department";
import getters from "@/store/getters";


const createStore = () => {
  return new Vuex.Store({
    modules: {
      staff,
      guest,
      department
    },
    getters
  })
}

export default createStore
