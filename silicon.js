
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

function invertColours(element) {
    document.getElementById(element).style.filter = 'invert(100%)';
}

function revertColours(element) {
   document.getElementById(element).style.filter = 'invert(0%)';
}

function revealPage() {
    var startPage = document.getElementById('startPage');
    startPage.classList.add('fade-out');

    // Wait for the fade-out transition to complete before hiding the element
    setTimeout(function() {
        startPage.style.display = 'none';
    }, 2000); // 2000ms matches the transition duration in the CSS
}