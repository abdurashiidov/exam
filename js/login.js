let emailInput = document.querySelector('.email-input')
let passInput = document.querySelector('.pass-input')
let loginForm = document.querySelector('.login-form')
let userNotFound = document.querySelector('.user-not-found')

let tokenLocal = localStorage.getItem('token')

async function loginFetch(email, pass) {
    await fetch('https://reqres.in/api/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: pass
            })
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.token) {
                localStorage.setItem('token', data.token)
                window.location.replace('./index.html')
            } else {
                userNotFound.style.opacity = '1';

                setTimeout(() => {
                    userNotFound.style.opacity = '0';
                }, 2000)
            }
        })
}
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    loginFetch(emailInput.value, passInput.value)
})

if (tokenLocal) {
    window.location.replace('./index.html')
}