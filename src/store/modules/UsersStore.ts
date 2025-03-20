import UserService from "@/plugins/api/services/UsersService";

const userModule = {
    namespaced: true,
    state: {
        currentUser: {},
    },
    getters: {
        currentUser: state => {
            console.log(state);
            return  state.currentUser},
    },
    mutations: {
        SET_CURRENT_USER(state, payload) {
            console.log(payload, state);
            state.currentUser = payload;
        }
    },
    actions: {
        async INIT_CURRENT_USER({ commit }, userId) {
            await UserService.getUserById(userId).then((response) => {
                response.fullShortName = response.lastName + " " + response.name[0]+'.'+response.secondName[0]+".";
                commit('SET_CURRENT_USER', response)
            })
                .catch(error => {
                    console.error(error);
                    alert('Ошибка авторизации');
                })
        },
        async INIT_AUTORIZATION({commit, dispatch}, usersInfo) {
            await UserService.authorizationUser(usersInfo.login, usersInfo.password).then((response) => {
                alert(response.message);
                localStorage.setItem('currentUser', JSON.stringify(response.user.id));
                dispatch('INIT_CURRENT_USER', response.user.id);
            })
                .catch(error => {
                    console.error(error);
                    alert('Ошибка авторизации');
                })
        },
        async INIT_LOGOUT({commit}) {
            localStorage.removeItem("currentUser");
            commit('SET_CURRENT_USER', {});
        }
        

    },
}

export default userModule;