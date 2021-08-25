const action = {
    create(context, data) {
        context.commit('add', data);
    },

    edit(context, data) {
        context.commit('edit', data);
    },

    delete(context, data) {
        context.commit('delete', data);
    },
};

export default action;