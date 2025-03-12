// DOM Elements
const themeToggle = document.querySelector(".theme-toggle");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navLinksItems = document.querySelectorAll(".nav-links a");
const header = document.querySelector("header");
const contactForm = document.getElementById("contactForm");
const scrollIndicator = document.querySelector(".scroll-indicator");

// Theme Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  // Change icon based on theme
  const icon = themeToggle.querySelector("i");
  if (document.body.classList.contains("dark-theme")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
    localStorage.setItem("theme", "light");
  }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
  const icon = themeToggle.querySelector("i");
  icon.classList.remove("fa-moon");
  icon.classList.add("fa-sun");
}

// Mobile Navigation
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");

  // Animate hamburger to X
  if (hamburger.classList.contains("active")) {
    hamburger.querySelector(".line:nth-child(1)").style.transform =
      "rotate(45deg) translate(5px, 5px)";
    hamburger.querySelector(".line:nth-child(2)").style.opacity = "0";
    hamburger.querySelector(".line:nth-child(3)").style.transform =
      "rotate(-45deg) translate(5px, -5px)";
  } else {
    hamburger.querySelector(".line:nth-child(1)").style.transform = "none";
    hamburger.querySelector(".line:nth-child(2)").style.opacity = "1";
    hamburger.querySelector(".line:nth-child(3)").style.transform = "none";
  }
});

// Close mobile menu when clicking on a link
navLinksItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");

    // Reset hamburger icon
    hamburger.querySelector(".line:nth-child(1)").style.transform = "none";
    hamburger.querySelector(".line:nth-child(2)").style.opacity = "1";
    hamburger.querySelector(".line:nth-child(3)").style.transform = "none";
  });
});

// Header scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
    if (scrollIndicator) {
      scrollIndicator.style.opacity = "0";
    }
  } else {
    header.classList.remove("scrolled");
    if (scrollIndicator) {
      scrollIndicator.style.opacity = "0.7";
    }
  }

  // Add active class to current section in navigation
  const sections = document.querySelectorAll("section");
  const scrollPosition = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinksItems.forEach((link) => {
        link.classList.remove("active-link");
        if (
          link.getAttribute("href") === `#${sectionId}` ||
          (sectionId === "about-details" &&
            link.getAttribute("href") === "#about")
        ) {
          link.classList.add("active-link");
        }
      });
    }
  });
});

// Form submission
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Simple form validation
    if (!name || !email || !message) {
      showFormMessage("Please fill in all fields", "error");
      return;
    }

    // Here you would typically send the form data to a server
    // For now, we'll just show a success message
    showFormMessage(
      "Thank you for your message! I will get back to you soon.",
      "success"
    );
    contactForm.reset();
  });
}

// Show form message
function showFormMessage(message, type) {
  // Remove any existing message
  const existingMessage = document.querySelector(".form-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create message element
  const messageElement = document.createElement("div");
  messageElement.classList.add("form-message", type);
  messageElement.textContent = message;

  // Add to form
  contactForm.appendChild(messageElement);

  // Remove after 5 seconds
  setTimeout(() => {
    messageElement.classList.add("fade-out");
    setTimeout(() => {
      messageElement.remove();
    }, 500);
  }, 5000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Offset for header
        behavior: "smooth",
      });
    }
  });
});

// Add animation to elements when they come into view
const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    ".project-card, .timeline-item, .skill-tag"
  );

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;

    if (elementPosition < screenPosition) {
      element.classList.add("animate");
    }
  });
};

// Typing effect for the highlight text
function typeEffect() {
  const highlight = document.querySelector(".highlight");
  if (!highlight) return;

  const text = highlight.textContent;
  highlight.textContent = "";
  highlight.style.opacity = "1";

  let i = 0;
  const typing = setInterval(() => {
    if (i < text.length) {
      highlight.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typing);
      // Add cursor after typing is complete
      highlight.classList.add("cursor-effect");
    }
  }, 100);
}

// Call animation function on scroll
window.addEventListener("scroll", animateOnScroll);

// Initialize animations on page load
window.addEventListener("load", () => {
  animateOnScroll();

  // Add a class to the body when the page is fully loaded
  document.body.classList.add("loaded");

  // Start typing effect after a short delay
  setTimeout(typeEffect, 500);

  // Add active class to navigation based on current section
  const currentSection = window.location.hash || "#about";
  document
    .querySelector(`a[href="${currentSection}"]`)
    ?.classList.add("active-link");
});
