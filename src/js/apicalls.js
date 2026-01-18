

const authorize = (endpoint, body) => {
    fetch("http://localhost:8080/auth" + endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: body
    }).then(response => {
        if (!response.ok) {
            response.json().then(error => {
                let errorBox = document.getElementById("error-box");
                if (errorBox) {
                errorBox.innerHTML = error.message;
                errorBox.classList.remove("hidden");
                errorBox.classList.add("error-box");
                }
            }).catch(e => {
                console.log(e);
            })
        } else {
            response.text().then(token =>  {
                localStorage.setItem("jwt", token); // Turn into cookie instead
                window.location.href = "/";
            }).catch(e => {
                console.log(e);
            })
        }
    }).catch(e => {
        console.log(e);
    })
}