const satate = {
    data: localStorage.getItem("items") == null? [] : JSON.parse(localStorage.getItem("items")),
};

export default satate;