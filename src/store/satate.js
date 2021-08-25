const satate = {
    isLogin: localStorage.getItem("isLogin") === null? false : localStorage.getItem("isLogin"),
    user: localStorage.getItem("user") === null? false : localStorage.getItem("user"),
};

export default satate;