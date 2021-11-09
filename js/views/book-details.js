import bookDesc from '../cmps/book-description.js'
import bookReview from '../cmps/book-review.js'
import { bookService } from '../services/book-data.service.js'
import { eventBus } from '../services/event-bus.service.js'
import { utilService } from '../services/util.service.js'

export default {
   components: {
      bookDesc,
      bookReview
   },

   template: `
      <section v-if="book" class="book-details-container app-main">
         <div class="book-detail-items">
            <img class="book-details-image" :src="book.thumbnail" alt="book thumbnail" />
            <p class="book-title">Title: {{ book.title }}</p>
            <p class="book-lang">Language: {{ book.language }}</p>
            <p class="book-subtitle">Subtitle: {{ book.subtitle }}</p>
            <p class="book-authors-title">Written by:</p>
            <ul v-for="author in book.authors" class="book-authors-list">
               <li class="book-author">{{ author }}</li>
            </ul>
            <p :class="priceCheck" class="book-price">Price: {{ currencyFormat }}</p>
            <p v-if="book.listPrice.isOnSale" class="book-sale">On sale</p>
            <p class="publish-year">Published at: {{ book.publishedDate }}<span v-if="ageCheck">-</span>{{ ageCheck }}</p>
            <p class="page-count">{{ book.pageCount }}<span v-if="readLevel">-</span>{{ readLevel }}</p>
            <ul class="book-categories">
               <li v-for="category in book.categories" class="book-category">{{ category }}</li>
            </ul>
            <book-desc :txt="book.description" />
            <button @click="toggleReview">Leave a review</button>
         </div>
         <template v-if="reviewModalOpen">
            <book-review :book="book" @reviewSubmitted="saveReview" />
         </template>
         <fieldset class="book-reviews">
            <legend>Reviews</legend>
            <div v-if="book.reviews" class="reviews-container">
               <div class="review-body" v-for="(review, idx) in book.reviews" :key="review.id">
                  <h5>{{ review.username }}</h5>
                  <p class="starability-result" data-rating="review.rating">
                     Rated: {{ review.rating }} stars
                  </p>
                  <p class="review-text">{{ review.txt }}</p>
                  <button @click="removeReview(idx)">X</button>
               </div>
            </div>
            <div v-else class="reviews-container">
               <p>Be the first to review!</p>
            </div>
         </fieldset>
      </section>
      <section v-else class="loader app-main">
         <h2>loading</h2>
      </section>
   `,

   data() {
      return {
         book: null,
         reviewModalOpen: false
      }
   },
   created() {
      const { bookId } = this.$route.params
      bookService.getById(bookId)
         .then(book => this.book = book)
   },

   methods: {
      toggleReview() {
         this.reviewModalOpen = !this.reviewModalOpen
      },
      saveReview(review) {
         bookService.addReview(this.book.id, review)
            .then(book => this.book = book)
            .then(() => {
               const linkToBook = `/book/${this.book.id}`
               utilService.sendMsg('success', 'Review Successfully Added', linkToBook)
               this.$router.push('/book')
            })
            .catch(err => utilService.sendMsg('error', err))
      },
      removeReview(idx) {
         this.book.reviews.splice(idx, 1)
         bookService.save(this.book)
            .then(utilService.sendMsg('success', 'Review successfully removed'))
            .catch(err => utilService.sendMsg('error', err))
      }
   },

   computed: {
      currencyFormat() {
         let currBookPrice = this.book.listPrice
         if (currBookPrice.currencyCode === 'USD') return `$${currBookPrice.amount}`
         else if (currBookPrice.currencyCode === 'EUR') return `${currBookPrice.amount}€`
         else return `${currBookPrice.amount}₪`
      },
      priceCheck() {
         let currBookPrice = this.book.listPrice
         if (currBookPrice.amount > 150) return 'red'
         else if (currBookPrice.amount < 20) return 'green'
      },
      readLevel() {
         if (this.book.pageCount > 500) return 'Long reading'
         else if (this.book.pageCount > 200) return 'Decent Reading'
         else if (this.book.pageCount < 100) return 'Light Reading'
      },
      ageCheck() {
         let currYear = new Date().getFullYear()
         if ((currYear - this.book.publishedDate) > 10) return 'Veteran Book'
         else if ((currYear - this.book.publishedDate) < 1) return 'New!'
      }
   }
}