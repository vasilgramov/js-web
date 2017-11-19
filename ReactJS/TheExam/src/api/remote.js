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

    return await res.json()
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

async function yearlyPlan() {
    const res = await fetch(host + 'plan/2017', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('auth-token')
        }
    })

    return res.json()
}

async function getPlanYearMonth(year, month) {
    const res = await fetch(host + `plan/${year}/${month}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('auth-token')
        }
    })

    return res.json()
}

async function updatePlanYearMoth(year, month, income, budget) {
    const res = await fetch(host + `plan/${year}/${month}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('auth-token')
        },
        body: JSON.stringify({
            income,
            budget
        })
    })

    return res.json()
}

async function addNewExpense(year, month, date, name, category, amount) {
    const res = await fetch(host + `plan/${year}/${month}/expense`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('auth-token')
        },
        body: JSON.stringify({
            date,
            name,
            category,
            amount
        })
    })

    return res.json()
}

async function deleteExpensive(id) {
    const res = await fetch(host + `plan/expense/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('auth-token')
        }
    })

    return res.json()
} 

export { register, login, yearlyPlan, getPlanYearMonth, updatePlanYearMoth, addNewExpense, deleteExpensive }