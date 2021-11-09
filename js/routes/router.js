import bookApp from '../views/book-app.js'
import homePage from '../views/home-page.js'
import aboutPage from '../views/about-page.js'
import bookDetails from '../views/book-details.js'

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: aboutPage
    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    }
]

export const router = new VueRouter({ routes })