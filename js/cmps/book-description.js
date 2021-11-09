export default {
   props: ['txt'],
   template: `
      <div class="desc-container">
         <h2 class="book-description-title">Description</h2>
         <p class="book-description">{{ bookDesc }}</p>
         <button v-if="isShowBtn" @click="toggleTxt">{{ displayBtn }}</button>
      </div>
   `,

   data() {
      return {
         isTxtShown: true,
         isShowBtn: false
      }
   },

   created() {
      this.isShowBtn = (this.txt.length > 100) ? true : false
   },

   methods: {
      toggleTxt() {
         this.isTxtShown = !this.isTxtShown
      }
   },
   computed: {
      bookDesc() {
         return !this.isTxtShown ? this.txt : this.txt.substring(0, 100)
      },
      displayBtn() {
         return this.isTxtShown ? 'Show more' : 'Show less'
      }
   }
}