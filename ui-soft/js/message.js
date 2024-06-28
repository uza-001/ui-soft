const message = document.querySelector('.message')
const successMessage = () => {
    message.classList.add("active");
    setTimeout(() => {
        message.classList.remove("active")
    }, 3000);
}