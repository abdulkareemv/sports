<script>
/* ===== CAROUSEL ===== */
let index = 0;
const images = document.querySelectorAll('.carousel-container img');

function carousel() {
    images.forEach((img, i) => {
        img.style.display = i === index ? 'block' : 'none';
    });
    index = (index + 1) % images.length;
    setTimeout(carousel, 3000);
}

/* ===== SCORE BOX ANIMATION ===== */
function animateScoreBoxes() {
    const scoreBoxes = document.querySelectorAll('.card');
    scoreBoxes.forEach((box, i) => {
        box.style.opacity = 0;
        box.style.transform = 'translateY(20px)';
        setTimeout(() => {
            box.style.opacity = 1;
            box.style.transform = 'translateY(0)';
        }, i * 200);
    });
}

/* ===== GOOGLE SHEET FETCH ===== */
const sheetURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vR3ZTB0p2mdrZYUGk2WogHSEccBPUB00xV7JZOBTw4LGy4Mv5G9E3ow6L77N5BpqH7J0XhzZEa1bAoZ/pub?gid=0&single=true&output=csv";

fetch(sheetURL)
.then(res => res.text())
.then(data => {
    const rows = data.trim().split("\n").slice(1);
    let totals = { red:0, green:0, blue:0, yellow:0 };
    const tbody = document.querySelector("#resultsTable tbody");

    rows.forEach(row => {
        const [event, r, g, b, y] = row.split(",");

        totals.red += Number(r);
        totals.green += Number(g);
        totals.blue += Number(b);
        totals.yellow += Number(y);

        tbody.innerHTML += `
        <tr>
            <td>${event}</td>
            <td>${r}</td>
            <td>${g}</td>
            <td>${b}</td>
            <td>${y}</td>
        </tr>`;
    });

    document.getElementById("redTotal").innerText = `Red: ${totals.red}`;
    document.getElementById("greenTotal").innerText = `Green: ${totals.green}`;
    document.getElementById("blueTotal").innerText = `Blue: ${totals.blue}`;
    document.getElementById("yellowTotal").innerText = `Yellow: ${totals.yellow}`;
});

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
    carousel();
    animateScoreBoxes();
});
</script>
