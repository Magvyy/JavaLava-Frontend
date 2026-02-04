

export function useAuth() { 
    const authenticate = async (username: string, password: string, endpoint: string) => {
        let response = await fetch("http://localhost:8080" + endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "user_name": username,
                "password": password
            })
        });
        if (!response.ok) {
            let error = await response.json();
            let errorBox = document.getElementById("error-box");
            if (errorBox) {
                errorBox.innerHTML = error.message;
                errorBox.classList.remove("hidden");
                errorBox.classList.add("error-box");
            }
        } else {
            let data = await response.json();
            localStorage.setItem("jwt", data.jwt);
            localStorage.setItem("user_id", data.user_id);
            window.location.href = "/";
        }
  }

  return { authenticate }
}