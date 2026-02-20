export function displayError(error: string) {
    let errorBox = document.getElementById("error-box");
    if (errorBox) {
        errorBox.innerHTML = error;
        errorBox.classList.remove("hidden");
        errorBox.classList.add("error-box");
    }
}