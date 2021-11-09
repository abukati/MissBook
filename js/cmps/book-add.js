import { bookService } from "../services/book-data.service.js"
import { utilService } from "../services/util.service.js"

export default {
    template: `
        <section class="book-add-container">
            <div class="search-bar">
                <input @input="search" v-model="searchKey" type="text" placeholder="Search for a book" />
            </div>
            <div v-if="results.length !== 0" class="results-container">
                <ul>
                    <li v-for="(result,idx) in results" :key="idx">
                        <span>{{ result.volumeInfo.title }}</span>
                        <button @click="addBook(result)">+</button>
                    </li>
                </ul>
            </div>
        </section>
    `,
    data() {
        return {
            searchKey: '',
            results: [],
            timeout: null
        }
    },
    destroyed() {
        clearTimeout(this.timeout)
    },
    methods: {
        search() {
            if (this.timeout) clearTimeout(this.timeout)
            if (!this.searchKey.length) this.results = []
            this.timeout = setTimeout(() => {
                if (this.searchKey) {
                    this.results = []
                    bookService.fetchBooks(this.searchKey)
                        .then(data => {
                            let filteredResults = data.filter(book => {
                                    return book.volumeInfo.title.toLowerCase().includes(this.searchKey.toLowerCase())
                                })
                            this.results = filteredResults
                    })
                }
            }, 1500)
        },
        addBook(book) {
            bookService.addGoogleBook(book)
            this.searchKey = ''
            this.results = []
            this.$emit('added')
        }
    }
}