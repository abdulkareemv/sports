let index = 0;
const carouselImages = document.querySelectorAll('.carousel-container img');

function carousel() {
    carouselImages.forEach((img, i) => {
        img.style.transform = i === index ? 'scale(1)' : 'scale(0.9)';
        img.style.display = i === index ? 'block' : 'none';
    });
    index = (index + 1) % carouselImages.length;
    setTimeout(carousel, 3000);
}

// Animate score box on load
function animateScoreBoxes() {
    const scoreBoxes = document.querySelectorAll('.score-box');
    scoreBoxes.forEach((box, i) => {
        setTimeout(() => {
            box.style.transform = 'translateY(0)';
            box.style.opacity = '1';
        }, i * 200);
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    carousel();
    animateScoreBoxes();
});

let index = 0;
          function carousel() {
              const images = document.querySelectorAll('.carousel-container img');
              images.forEach(img => img.style.display = 'none');
              images[index].style.display = 'block';
              index = (index + 1) % images.length;
              setTimeout(carousel, 3000);
          }
          carousel();
