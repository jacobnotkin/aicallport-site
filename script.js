// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (toggle && navLinks) {
  toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // close menu when clicking a link
  navLinks.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Steps interaction
const steps = document.querySelectorAll(".step");
const stepTitle = document.getElementById("stepTitle");
const stepBody = document.getElementById("stepBody");

const stepCopy = {
  1: {
    title: "Pick where you want your number",
    body: "Choose the country where you want your business number. Then you’re ready to configure your agent."
  },
  2: {
    title: "Choose your industry",
    body: "Auto Repair, Beauty Salon, Dental, HVAC, and more. This tailors call flows and FAQs."
  },
  3: {
    title: "Select your AI call service",
    body: "Receptionist, lead capture, scheduling, FAQs, call routing — configured for your business."
  },
  4: {
    title: "Enter business details",
    body: "Set hours, location, services, booking rules, and anything you want the agent to say."
  },
  5: {
    title: "Call your company (live demo)",
    body: "Hear your agent before you activate. Adjust responses until it matches your brand."
  },
  6: {
    title: "Activate your AI agent",
    body: "Go live instantly. Monthly billing starts only when you activate."
  }
};

steps.forEach(btn => {
  btn.addEventListener("click", () => {
    steps.forEach(s => s.classList.remove("active"));
    btn.classList.add("active");

    const key = btn.getAttribute("data-step");
    const data = stepCopy[key];
    if (data && stepTitle && stepBody) {
      stepTitle.textContent = data.title;
      stepBody.textContent = data.body;
    }
  });
});

// Footer year
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
