
    const base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

    let dropdowns = document.querySelectorAll(".dropdown select")
    let btn = document.querySelector("button")
    let fromcurr = document.querySelector(".from select")
    let tocurr = document.querySelector(".to select")
    let msg = document.querySelector(".msg")

    for (let select of dropdowns) {
        for (let key in countryList) {
            let newoption = document.createElement("option")
            newoption.innerText = key
            newoption.value = key
            select.append(newoption)

            if (select.name === "from" && key === "USD") {
                newoption.selected = true
            }
            if (select.name === "to" && key === "NPR") {
                newoption.selected = true
            }
        }

        select.addEventListener("change", (evt) => {
            updateflag(evt.target)
        })
    }

    function updateflag(element) {
        let currCode = element.value
        let countryCode = countryList[currCode]
        let img = element.parentElement.querySelector("img")
        img.src = `https://flagsapi.com/${countryCode}/flat/64.png`
    }

    btn.addEventListener("click", async (evt) => {
        evt.preventDefault()

        let amount = document.querySelector("input")
        let amtval = amount.value

        if (amtval === "" || amtval < 1) {
            amtval = 1
            amount.value = 1
        }

        const URL = `${base_url}/${fromcurr.value.toLowerCase()}.json`

        let response = await fetch(URL)
        let data = await response.json()
        let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()]
        console.log(rate)
        console.log(amount.value)
        let result = amount.value * rate
        msg.innerText = `${amount.value} ${fromcurr.value}=${result} ${tocurr.value}`
    })

