export default {
   template: `
      <header>
         <div class="logo">
            <a class="logo-link" href="/"><p>Miss-book</p></a>
         </div>
         <nav class="main-nav">
            <router-link @click.native="scrollToTop" to="/" active-class="active-link" exact>Home</router-link>
            <router-link @click.native="scrollToTop" to="/book">Books</router-link>
            <router-link @click.native="scrollToTop" to="/about">About</router-link>
         </nav>
      </header>
   `,
   methods: {
      scrollToTop() {
         window.scrollTo(0, 0)
      }
   }
}