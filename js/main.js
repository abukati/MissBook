import appHeader from './views/partials/app-header.js'
import appFooter from './views/partials/app-footer.js'
import flashMsg from './views/partials/flash-msg.js'
import { router } from './routes/router.js'

const options = {
   el: '#app',
   router,
   components: {
      appHeader,
      appFooter,
      flashMsg
   },

   template: `
      <section class="app">
         <flash-msg />
         <app-header />
         <router-view />
         <app-footer />
      </section>`,
}

new Vue(options)