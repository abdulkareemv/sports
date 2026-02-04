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

/* ===== GOOGLE SHEET URLs ===== */
// Score sheet (Sheet name: Score)
const scoreSheetURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vR3ZTB0p2mdrZYUGk2WogHSEccBPUB00xV7JZOBTw4LGy4Mv5G9E3ow6L77N5BpqH7J0XhzZEa1bAoZ/pub?gid=0&single=true&output=csv";

// Result sheet (Sheet name: result)
const resultSheetURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vR3ZTB0p2mdrZYUGk2WogHSEccBPUB00xV7JZOBTw4LGy4Mv5G9E3ow6L77N5BpqH7J0XhzZEa1bAoZ/pub?gid=765466622&single=true&output=csv";

/* ===== FETCH SCORES (Score sheet) ===== */
function fetchScores() {
    fetch(scoreSheetURL)
        .then(res => res.text())
        .then(data => {
            const rows = data.trim().split("\n").slice(1);

            let totals = { red: 0, green: 0, blue: 0, yellow: 0 };
            const tbody = document.querySelector("#resultsTable tbody");
            tbody.innerHTML = "";

            rows.forEach(row => {
                const [event, r, g, b, y] = row.split(",");

                totals.red += Number(r) || 0;
                totals.green += Number(g) || 0;
                totals.blue += Number(b) || 0;
                totals.yellow += Number(y) || 0;

                tbody.innerHTML += `
                    <tr>
                        <td>${event}</td>
                        <td>${r}</td>
                        <td>${g}</td>
                        <td>${b}</td>
                        <td>${y}</td>
                    </tr>`;
            });

            const tableRows = document.querySelectorAll("#resultsTable tbody tr");

            tableRows.forEach(row => {
                const cells = row.querySelectorAll("td");
                const eventCell = cells[0];
                let hasScore = false;

                for (let i = 1; i < cells.length; i++) {
                    const value = Number(cells[i].textContent.trim()) || 0;

                    cells[i].classList.remove(
                        "score-red",
                        "score-green",
                        "score-blue",
                        "score-yellow"
                    );

                    if (value > 0) {
                        hasScore = true;
                        const classes = [
                            null,
                            "score-red",
                            "score-green",
                            "score-blue",
                            "score-yellow"
                        ];
                        cells[i].classList.add(classes[i]);
                    }
                }

                eventCell.classList.toggle("event-active", hasScore);
            });

            document.getElementById("redTotal").innerText = `Red: ${totals.red}`;
            document.getElementById("greenTotal").innerText = `Green: ${totals.green}`;
            document.getElementById("blueTotal").innerText = `Blue: ${totals.blue}`;
            document.getElementById("yellowTotal").innerText = `Yellow: ${totals.yellow}`;
        });
}

/* ===== FETCH RESULTS (Result sheet) ===== */
function fetchResults() {
    fetch(resultSheetURL)
        .then(res => res.text())
        .then(data => {
            const rows = data.trim().split("\n").slice(1);

            const eventSelect = document.getElementById("eventSelect");
            const resultBox = document.getElementById("resultBox");

            if (!eventSelect || !resultBox) return;

            eventSelect.innerHTML = `<option value="">Select Event</option>`;
            const results = {};

            rows.forEach(row => {
                // ✅ FIXED CSV parsing (spaces are SAFE now)
                const cols = row
                    .match(/("([^"]|"")*"|[^,]+)(?=,|$)/g)
                    .map(v => v.replace(/^"|"$/g, "").trim());

                if (cols.length < 7) return;

                const [
                    event,
                    first, firstDept,
                    second, secondDept,
                    third, thirdDept
                ] = cols;

                results[event] = {
                    first, firstDept,
                    second, secondDept,
                    third, thirdDept
                };

                const opt = document.createElement("option");
                opt.value = event;
                opt.textContent = event;
                eventSelect.appendChild(opt);
            });

            eventSelect.onchange = () => {
                const r = results[eventSelect.value];
                if (!r) {
                    resultBox.innerHTML = "";
                    return;
                }

                resultBox.innerHTML = `
                  <table class="result-table">
                    <thead>
                      <tr>
                        <th>Medal</th>
                        <th>Name</th>
                        <th>Department</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="gold-row">
                        <td>🥇 Gold</td>
                        <td>${r.first}</td>
                        <td>${r.firstDept}</td>
                      </tr>
                      <tr class="silver-row">
                        <td>🥈 Silver</td>
                        <td>${r.second}</td>
                        <td>${r.secondDept}</td>
                      </tr>
                      <tr class="bronze-row">
                        <td>🥉 Bronze</td>
                        <td>${r.third}</td>
                        <td>${r.thirdDept}</td>
                      </tr>
                    </tbody>
                  </table>
                `;
            };
        });
}


/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
    carousel();
    animateScoreBoxes();

    fetchScores();
    fetchResults();

    setInterval(fetchScores, 10000);   // score auto-update
    setInterval(fetchResults, 30000);  // result auto-update
});
