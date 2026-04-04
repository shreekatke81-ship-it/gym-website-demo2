// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// BMI Calculator Function
function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const resultDiv = document.getElementById('bmi-result');

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        resultDiv.innerHTML = "Please enter valid height and weight.";
        resultDiv.style.color = "#ff3131";
        return;
    }

    // Formula: weight (kg) / [height (m)]^2
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    let status = "";
    if (bmi < 18.5) {
        status = "Underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        status = "Healthy Weight";
    } else if (bmi >= 25 && bmi <= 29.9) {
        status = "Overweight";
    } else {
        status = "Obese";
    }

    resultDiv.innerHTML = `Your BMI is <strong>${bmi}</strong> (${status})`;
    resultDiv.style.color = "#ffffff";
}

// Sticky Header on Scroll with Dynamic Background
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
        header.style.padding = '10px 0';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.85)';
        header.style.padding = '15px 0';
    }
});

// Form Submission (Prevent Default)
const contactForm = document.getElementById("contact-form");
const submitBtn = contactForm.querySelector('button[type="submit"]');

let isSubmitting = false;

contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (isSubmitting) return;

    isSubmitting = true;
    submitBtn.disabled = true;

    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = "Sending...";

    try {
        await emailjs.sendForm("service_7n70y0k", "template_cbqqzjz", this);

        document.querySelector(".contact-form").innerHTML =
            "<h3 style='color:#4CAF50'>Message sent successfully!</h3>";

    } catch (error) {
        alert("Failed to send message");

        isSubmitting = false;
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
    }
});

// Add scroll event to close mobile menu
window.addEventListener('scroll', () => {
    if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    }
});



