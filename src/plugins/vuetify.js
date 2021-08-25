import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const opts = {
    theme: {
        options: {
            customProperties: true,
        },
        themes: {
            light: {
                primary: "#0c0c0c",
                secoundrey: "#ff4141",
            }
        }
    },
    icons: {
        iconfont: "mdi"
    },
}

export default new Vuetify(opts)