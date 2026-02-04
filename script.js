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
const sheetURL = "PASTE_YOUR_CSV_LINK_HERE";

fetch(sheetURL)
.then(res => res.text())
.then(data => {
    const rows = data.trim().split("\n").slice(1);
    let totals = { red:0, green:0, blue:0, yellow:0 };

    const tbody = document.querySelector("#resultsTable tbody");

    rows.forEach(row => {
        const [event, r, g, b, y] = row.split(",");

        totals.red += +r;
        totals.green += +g;
        totals.blue += +b;
        totals.yellow += +y;

        tbody.innerHTML += `
            <tr>
                <td>${event}</td>
                <td>${r}</td>
                <td>${g}</td>
                <td>${b}</td>
                <td>${y}</td>
            </tr>
        `;
    });

    document.getElementById("redTotal").innerText = `Red: ${totals.red}`;
    document.getElementById("greenTotal").innerText = `Green: ${totals.green}`;
    document.getElementById("blueTotal").innerText = `Blue: ${totals.blue}`;
    document.getElementById("yellowTotal").innerText = `Yellow: ${totals.yellow}`;
});
