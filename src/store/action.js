const action = {
    suingUp(context, data) {
        return new Promise((resolve, reject) => {
            const users = localStorage.getItem("user") == null ? [] : JSON.parse(localStorage.getItem("user"));
            let user = users.find(el => {
                return el.email == data.email
            });
            if (user) {
                reject("email used before");
            } else {
                context.commit('suingUp', data);
                resolve(true);
            }
        });
    },

    login(context, data) {
        return new Promise((resolve, reject) => {
            const users = localStorage.getItem("user") == null ? [] : JSON.parse(localStorage.getItem("user"));
            let user = users.find(el => {
                return el.email == data.email && el.password == data.password
            });
            if (user) {
                context.commit('login', user);
                resolve(true);
            } else {
                reject("user not found");
            }
        });
    },

    logout(context) {
        context.commit('logout');
    }
};

export default action;