const satate = {
    isLogin: localStorage.getItem("isLogin") === null? false : localStorage.getItem("isLogin"),
    user: localStorage.getItem("user") === null? [] : localStorage.getItem("user"),
};

export default satate;