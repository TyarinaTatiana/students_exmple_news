import '@mdi/font/css/materialdesignicons.css'
import {aliases, mdi} from 'vuetify/iconsets/mdi';
// Vuetify
import 'vuetify/styles';
import {createVuetify} from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import LogoIcon from "@/icons/LogoIcon.vue";


// Components
export const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases: {
            ...aliases,
            logoIcon: LogoIcon,
        },
        sets: {
            mdi,
        },
    },
    components,
    directives,
});
