export default {
    template: `
    <div class="review-container">
        <h2>Leave a Review</h2>
        <form @submit.prevent="submitReview">
            <div class="review-stars-container">
                <fieldset class="starability-basic">
                    <input type="radio" id="no-rate" class="input-no-rate" name="review[rating]" value="1" checked />
                    <template v-for="n in 5">
                        <input type="radio" @click="setScore(n)" :id="'first-rate'+n" :value="n" name="review[rating]" />
                        <label :for="'first-rate'+n" :title="n+' stars'"></label>
                    </template>
                </fieldset>
            </div>
            <div class="review-text-container">
                <label for="review-username">Username:</label>
                <input v-model.trim="review.username" type="text" id="review-username" />
                <label class="review-form-label" for="review-body">Review:</label>
                <textarea v-model="review.txt" class="review-form-text" id="review-body" cols="30" rows="3" required></textarea>
                <label class="review-date" for="date-read">Read at:</label>
                <input type="date" id="date-read" />
            </div>
            <button class="btn-save-review">Submit</button>
        </form>
    </div>
    `,
    data() {
        return {
            review: {
                txt: '',
                username: '',
                date: '',
                rating: 0
            }
        }
    },
    methods: {
        resetReview() {
            this.review = {
                txt: '',
                username: '',
                date: '',
                rating: 0
            }
        },
        submitReview() {
            this.$emit('reviewSubmitted', this.review)
            this.resetReview()
        },
        setScore(rating) {
            this.review.rating = rating
        },
    },
}