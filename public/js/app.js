(function () {
    const weatherForm = document.querySelector("form");
    const search = document.querySelector("input");
    const messageOne = document.querySelector("#message-1");
    const messageTwo = document.querySelector("#message-2");

    weatherForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const location = search.value;
        messageOne.textContent = "loading...";
        messageTwo.textContent = "";
        fetch(generateUrl(location)).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error;
                } else {
                    const { location, description, temperature, feelslike, localtime, timezone} = data.forecast || {};
                    messageOne.textContent = location;
                    messageTwo.textContent = description +
                    ". " + temperature +
                    " degrees. It feels like " +
                    feelslike + 
                    ". The locatime is " + 
                    localtime + 
                    " and the timezone is " + 
                    timezone;
                }
            })
        });
    });

    const generateUrl = (location) => "/weather?address=" + location;
})();
