
let url = "https://reqres.in/api/login"

let options = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
    },
    "body": JSON.stringify(
        {
            "email": "eve.holt@reqres.in",
            "password": "cityslicka"
        }
    )
}