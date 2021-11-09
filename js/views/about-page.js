import { eventBus } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"

export default {
    template: `
        <section class="about-page app-main">
            <h3>About us</h3>
        </section>
    `,
    data() {
        return {
            interval: ''
        }
    },
    created() {
        const msg = utilService.sendMsg('success', 'Successfully')
        eventBus.$emit('showMsg', msg)
        
        this.interval = setInterval(this.log, 5000)
    },
    destroyed() {
        clearInterval(this.interval)
    },
    methods: {
        log() {
            console.log('in about page')
        }
    },
}