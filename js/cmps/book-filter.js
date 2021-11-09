export default {
    template: `
        <div class="book-filter">
            <label>Filter results</label>
            <input @input="filter" v-model="filterBy.title" type="text" placeholder="Title" />
            <input @input="filter" v-model.number="filterBy.minPrice" type="number" placeholder="Min price" />
            <input @input="filter" v-model.number="filterBy.maxPrice" type="number" placeholder="Max price" />
        </div>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                minPrice: 0,
                maxPrice: Infinity
            }
        }
    },
    methods: {
        filter() {
            this.$emit('filtered', {...this.filterBy})
        }
    }
}