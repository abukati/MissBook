import bookPreview from "./book-preview.js"

export default {
   props: ['books'],
   components: {
      bookPreview
   },

   template: `
      <ul class="book-list">
         <li v-for="book in books" :key="book.id" class="book-preview-container">
            <book-preview :book="book" @click.native="select" />
            <div class="actions">
               <router-link :to="'/book/'+book.id">Details</router-link>
            </div>
         </li>
      </ul>
   `,
   methods: {
      select(book) {
         this.$emit('selected', book)
      },
   }
}