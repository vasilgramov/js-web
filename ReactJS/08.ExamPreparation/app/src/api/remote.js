const host = 'http://localhost:5000/'

async function register(name, email, password) {
    const res = await fetch(host + 'auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    })

    return res.json()
}

async function login(email, password) {
    const res = await fetch(host + 'auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })

    return res.json()
}

async function createHotel(hotel) {
    const res = await fetch(host + 'hotels/create/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('auth-token')
        },
        body: JSON.stringify(hotel)
    })

    return res.json()
}

async function getPage(page) {
    const res = await fetch(host + 'hotels/all?page=' + page)
    return res.json()
}

async function getAllHotels() {
    const all = await fetch(host + 'hotels/all')
    return all.json()
}

async function getDetails(id) {
    const res = await fetch(host + 'hotels/details/' + id, {
        method: 'GET',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('authToken'),
        }
    })
    
    return await res.json()
}


async function postReview(hotelId, comment, rating) {
    const res = await fetch(host + `hotels/details/${hotelId}/reviews/create`, {
        method: 'POST',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('authToken'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            comment,
            rating
        })
    })

    return await res.json()
}

async function getReviews(hotelId) {
    const res = await fetch(host + `hotels/details/${hotelId}/reviews`, {
        method: 'GET',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('authToken'),            
        }
    })
    
    return await res.json()
}

export { register, login, createHotel, getPage, getAllHotels, getDetails, postReview, getReviews }