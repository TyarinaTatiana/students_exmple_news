import {createStore} from 'vuex'
import usersStore from "@/store/modules/UsersStore.js";

export default createStore({
    modules: {
        usersStore: usersStore
    }
})
