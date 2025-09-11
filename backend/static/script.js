document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".animated-form")
  const submitBtn = document.querySelector(".submit-btn")
  const successMessage = document.querySelector(".success-message")
  const inputs = document.querySelectorAll("input, select, textarea")

  // Add focus animations to form inputs
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused")
    })

    input.addEventListener("blur", function () {
      if (!this.value) {
        this.parentElement.classList.remove("focused")
      }
    })

    // Add typing animation
    input.addEventListener("input", function () {
      this.style.transform = "scale(1.02)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 150)
    })
  })

  // Form submission with animation
  form.addEventListener("submit", (e) => {
    e.preventDefault()

    // Add loading state
    submitBtn.classList.add("loading")
    submitBtn.querySelector(".btn-text").textContent = "Sending..."

    // Simulate form submission
    setTimeout(() => {
      // Hide form and show success message
      form.style.transform = "translateY(-20px)"
      form.style.opacity = "0"

      setTimeout(() => {
        form.style.display = "none"
        successMessage.classList.add("show")
      }, 300)
    }, 2000)
  })

  // Add hover effects to form groups
  const formGroups = document.querySelectorAll(".form-group")
  formGroups.forEach((group) => {
    group.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(5px)"
    })

    group.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0)"
    })
  })

  // Add parallax effect to background
  document.addEventListener("mousemove", (e) => {
    const container = document.querySelector(".container")
    const x = (e.clientX / window.innerWidth) * 100
    const y = (e.clientY / window.innerHeight) * 100

    container.style.transform = `translate(${x * 0.02}px, ${y * 0.02}px)`
  })
})
