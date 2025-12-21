/* Smooth scrolling for the whole page */
html {
scroll-behavior: smooth;
}

/* Custom button hover animation */
button, a {
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

button:hover {
transform: translateY(-2px);
}
