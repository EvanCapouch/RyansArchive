// ============================================
// EXPLORER STATUS BAR
// ============================================

const rows = document.querySelectorAll(".explorer tr[data-status]");
const statusBar = document.getElementById("statusBar");

rows.forEach(row => {

    row.addEventListener("mouseenter", () => {

        if (statusBar) {
            statusBar.textContent = row.dataset.status;
        }

    });

    row.addEventListener("mouseleave", () => {

        if (statusBar) {
            statusBar.textContent = "9 Items";
        }

    });

});


// ============================================
// ARCHIVE SEARCH
// ============================================

function searchArchive() {

    const searchInput = document.getElementById("searchInput");

    if (!searchInput) return;

    const query = searchInput
        .value
        .trim()
        .toLowerCase();

    const root = "/RyansArchive/";

    switch (query) {

        case "logs":
            window.location.href = root + "logs/AboutLogs.html";
            break;

        case "images":
        case "photo_archive":
            window.location.href = root + "images/indexS.html";
            break;

        case "downloads":
            window.location.href = root + "downloads/indexD.html";
            break;

        case "about":
            window.location.href = root + "about/about.html";
            break;

        case "memory":
            window.location.href = root + "data/memory.html";
            break;

        case "root":
            window.location.href = root + "data/root.html";
            break;

        default:
            window.location.href = root + "search.html";

    }

}


// ============================================
// SEARCH WITH ENTER KEY
// ============================================

document.addEventListener("DOMContentLoaded", function () {

    const search = document.getElementById("searchInput");

    if (search) {

        search.addEventListener("keypress", function (event) {

            if (event.key === "Enter") {

                searchArchive();

            }

        });

    }

});


// ============================================
// COPY SELECTED TEXT
// ============================================

function copySelectedText() {

    const selection = window.getSelection().toString();

    if (selection) {

        navigator.clipboard.writeText(selection);

    }

}


// ============================================
// SELECT ALL EXPLORER CONTENT
// ============================================

function selectAllContent() {

    const content = document.querySelector(".viewerContent");

    if (!content) return;

    const selection = window.getSelection();
    const range = document.createRange();

    range.selectNodeContents(content);

    selection.removeAllRanges();
    selection.addRange(range);

}


// ============================================
// SHOW / HIDE ADDRESS BAR
// ============================================

function toggleAddressBar() {

    const addressBar = document.querySelector(".addressBar");

    if (!addressBar) return;

    addressBar.classList.toggle("hidden");

}


// ============================================
// SHOW / HIDE STATUS BAR
// ============================================

function toggleStatusBar() {

    const statusBar = document.querySelector(".statusBar");

    if (!statusBar) return;

    statusBar.classList.toggle("hidden");

}


// ============================================
// CLOSE ARCHIVE
// ============================================

function closeArchive() {

    const viewer = document.querySelector(".viewer");

    if (viewer) {
        viewer.style.display = "none";
    }

    document.body.classList.add("archiveClosed");

}


// ============================================
// SORT EXPLORER TABLE
// ============================================

function sortExplorerTable(columnIndex) {

    const table = document.querySelector(".explorer");

    if (!table) return;

    const rows = Array.from(
        table.querySelectorAll("tr")
    ).slice(1);

    rows.sort((a, b) => {

        const aText = a.children[columnIndex]
            .textContent
            .trim()
            .toLowerCase();

        const bText = b.children[columnIndex]
            .textContent
            .trim()
            .toLowerCase();

        return aText.localeCompare(
            bText,
            undefined,
            {
                numeric: true
            }
        );

    });

    rows.forEach(row => {

        table.appendChild(row);

    });

}