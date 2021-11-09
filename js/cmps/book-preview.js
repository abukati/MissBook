export default {
   props: ['book'],
   template: `
      <div class="book-preview-item">
         <img class="book-preview-image" :src="book.thumbnail" />
         <p :class="priceCheck">{{ currencyFormat }}</p>
         <p>{{ book.title }}</p>
      </div>
   `,
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
   }
}