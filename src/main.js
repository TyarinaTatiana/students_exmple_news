import {createApp} from 'vue'
import App from './App.vue'
import {registerServices}  from'@/plugins/api/index.js'
import router from './router'
import store from './store'
import {vuetify} from "@/vuetify.js";


const app = createApp(App);
registerServices(app);


app.use(vuetify);
app.use(store)
app.use(router)
app.mount('#app')
