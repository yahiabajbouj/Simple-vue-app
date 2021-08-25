const mutations = {
    add(state, item) {
        const items = localStorage.getItem("items") == null ? [] : JSON.parse(localStorage.getItem("items"));
        item.id = state.data.length;
        items.push(item);
        state.data = items;
        localStorage.setItem("items", JSON.stringify(items));
    },

    edit(state, item) {
        state.data[item.id] = item;
        localStorage.setItem("items", JSON.stringify(state.data));
    },

    delete(state, item) {
        state.data = state.data.filter(el => {
            return el.id != item.id
        });
        localStorage.setItem("items", JSON.stringify(state.data));
    }
}

export default mutations;