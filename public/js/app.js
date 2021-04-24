console.log("Client side javascript file is loaded")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

message1.textContent = ''
message2.textContent = ''

weatherForm.addEventListener('submit', (event) => {
    message1.textContent = 'loading'
    message2.textContent = ''
    event.preventDefault()
    const address = search.value
    // const url = 'http://localhost:3000/weather?address=' + address // localhost
    const url = '/weather?address=' + address // localhost

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const {
                forecast,
                location,
                error
            } = data
            if (error) {
                // console.log("Error", error)
                message1.textContent = error
            }
            else {
                // console.log(forecast)
                // console.log(location)
                message1.textContent = forecast
                message2.textContent = location
            }
        })
        .catch(err => console.log("Error" + err.message))
})

