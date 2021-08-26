const mutations = {
    suingUp(state, user) {
        const users = localStorage.getItem("user") == null ? [] : JSON.parse(localStorage.getItem("user"));
        users.push(user);
        localStorage.setItem("user", JSON.stringify(users));
        localStorage.setItem("isLogin", true);
        state.isLogin = true;
    },

    login(state, user) {
        localStorage.setItem("isLogin", true);
        state.isLogin = true;
        state.user = user;
    },

    logout(state) {
        localStorage.setItem("isLogin", false);
        state.isLogin = false;
    }
}

export default mutations;