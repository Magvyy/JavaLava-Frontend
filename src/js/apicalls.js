
export async function APICall(endpoint, method, header, body, relocate) {
    fetch("http://localhost:8080" + endpoint, {
        method: method,
        headers: header,
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
            response.json().then(resp => {
                if (resp.jwt) {
                    localStorage.setItem("jwt", resp.jwt);
                }
                if (relocate != "") {
                    window.location.href = relocate;
                }
            }).catch(e => {
                console.log(e);
            })
        }
    }).catch(e => {
        console.log(e);
    })
}