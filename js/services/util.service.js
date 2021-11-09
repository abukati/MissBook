import { eventBus } from "./event-bus.service.js"

export const utilService = {
    saveToStorage,
    loadFromStorage,
    makeId,
    sendMsg,
    getRandInt,
    debounce,
    getLorem
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value) || null);
}

function loadFromStorage(key) {
    let data = localStorage.getItem(key);
    return (data) ? JSON.parse(data) : undefined;
}

function sendMsg(type, txt, link = '') {
    const msg = {
        txt,
        type,
        link
    }
    eventBus.$emit('showMsg', msg)
}

function getRandInt(min = 15, max = 150) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function debounce(func, wait = 2000) {
    let timeout;
    return function (...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

function getLorem() {
    return 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis pariatur unde, iusto ex dolorum consequuntur debitis officia quam cum facere, nisi dolor tempore labore nam natus? Excepturi voluptates labore, delectus unde velit molestias soluta nostrum quia quod a beatae quas nisi nesciunt cupiditate sequi suscipit distinctio iusto ex at! Facere voluptatum officiis earum blanditiis in illum modi adipisci eaque? Unde accusantium deserunt assumenda, asperiores sequi cupiditate quis praesentium in odio porro itaque ipsa voluptatibus esse quam consequuntur soluta amet, nam natus numquam temporibus officiis dignissimos inventore iusto reiciendis? Impedit provident animi recusandae harum consequuntur at quia sed? Quidem cupiditate dolorum voluptatem cum eaque earum vitae explicabo voluptates nemo, repellendus eveniet aut qui, est molestiae tempora autem mollitia magnam, accusantium accusamus.'
}

function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}