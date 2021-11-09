import { eventBus } from './../services/event-bus.service.js'
import { bookService } from './../services/book-data.service.js'
import bookList from './../cmps/book-list.js'
import bookFilter from './../cmps/book-filter.js'
import bookAdd from './../cmps/book-add.js'


export default {
   components: {
      bookList,
      bookFilter,
      bookAdd
   },

   template: `
      <section class="book-app app-main">
         <book-add @added="loadBooks"/>
         <book-filter @filtered="setFilter" />
         <book-list :books="booksToShow" @selected="selectBook" />
      </section>
   `,
   data() {
      return {
         books: null,
         filterBy: null
      }
   },
   created() {
      this.loadBooks()
   },
   methods: {
      loadBooks() {
         bookService.query()
            .then(books => this.books = books)
      },
      setFilter(filterBy) {
         this.filterBy = filterBy
      },
      selectBook(bookId) {
         const idx = this.books.findIndex(book => book.id === bookId)
         this.selectedBook = this.books[idx]
      },
      closeBook() {
         this.selectedBook = null
      }
   },
   computed: {
      booksToShow() {
         if (!this.filterBy) return this.books
         const filter = this.filterBy.title.toLowerCase()
         const minPrice = (this.filterBy.minPrice) ? this.filterBy.minPrice : 0
         const maxPrice = (this.filterBy.maxPrice) ? this.filterBy.maxPrice : Infinity
         
         const booksToShow = this.books.filter(book => {
            return (book.title.toLowerCase().includes(filter)
                  && book.listPrice.amount >= minPrice
                  && book.listPrice.amount <= maxPrice)
         })
         return booksToShow
      }
   }
}