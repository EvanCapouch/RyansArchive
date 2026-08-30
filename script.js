// ============================================
// EXPLORER STATUS BAR
// ============================================

const rows = document.querySelectorAll(".explorer tr[data-status]");
const statusBar = document.getElementById("statusBar");

// Remember whatever the page originally says.
// This means index.html, indexS.html, and indexD.html
// can all have different item counts.

const defaultStatus = statusBar
    ? statusBar.textContent.trim()
    : "";

rows.forEach(row => {

    row.addEventListener("mouseenter", () => {

        if (!statusBar) return;

        statusBar.textContent = row.dataset.status;

    });

    row.addEventListener("mouseleave", () => {

        if (!statusBar) return;

        statusBar.textContent = defaultStatus;

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

    window.location.href = "/RyansArchive/desktop/desktop.html";

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

// ============================================
// WORD WRAP
// ============================================

function toggleWordWrap() {

    const text = document.querySelector(".notepadText");

    if (!text) return;

    text.classList.toggle("wordWrap");

}

// ============================================
// FONT DIALOG
// ============================================

function openFontDialog() {

    const dialog = document.getElementById("fontDialog");

    if (!dialog) return;

    dialog.classList.remove("hidden");

}


function closeFontDialog() {

    const dialog = document.getElementById("fontDialog");

    if (!dialog) return;

    dialog.classList.add("hidden");

}


function applyFont() {

    const text = document.querySelector(".notepadText");

    if (!text) return;

    const fontFamily =
        document.getElementById("fontFamily").value;

    const fontSize =
        document.getElementById("fontSize").value;

    const bold =
        document.getElementById("fontBold").checked;

    const italic =
        document.getElementById("fontItalic").checked;


    text.style.fontFamily = fontFamily;

    text.style.fontSize = fontSize;

    text.style.fontWeight =
        bold ? "bold" : "normal";

    text.style.fontStyle =
        italic ? "italic" : "normal";


    closeFontDialog();

}

// ============================================
// IMAGE VIEWER
// ============================================

let imageZoom = 95;


function zoomIn() {

    const image = document.getElementById("viewedImage");

    if (!image) return;

    imageZoom += 10;

    image.style.maxWidth = imageZoom + "%";

}


function zoomOut() {

    const image = document.getElementById("viewedImage");

    if (!image) return;

    imageZoom -= 10;

    if (imageZoom < 10) {

        imageZoom = 10;

    }

    image.style.maxWidth = imageZoom + "%";

}


function actualSize() {

    const image = document.getElementById("viewedImage");

    if (!image) return;

    imageZoom = 95;

    image.style.maxWidth = "95%";

}

function copyImage() {

    const image = document.getElementById("viewedImage");

    if (!image) return;

    fetch(image.src)
        .then(response => response.blob())
        .then(blob => {

            navigator.clipboard.write([
                new ClipboardItem({
                    [blob.type]: blob
                })
            ]);

        })
        .catch(error => {

            console.error("Unable to copy image:", error);

        });

}

// ============================================
// DESKTOP: OPEN RYAN'S ARCHIVE
// ============================================

function openArchive() {

    window.location.href = "/RyansArchive/index.html";

}

// ============================================
// DESKTOP CLOCK
// ============================================

function updateDesktopClock() {

    const clock = document.getElementById("desktopClock");

    if (!clock) return;

    const now = new Date();

    clock.textContent = now.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit"
    });

}


// Update immediately when the page loads

updateDesktopClock();


// Update every minute

setInterval(updateDesktopClock, 60000);

// ============================================
// DESKTOP ICON SELECTION
// ============================================

document.addEventListener("DOMContentLoaded", function () {

    const icons = document.querySelectorAll(".desktopIcon");
    const desktop = document.querySelector(".desktop");

    if (!icons.length || !desktop) return;


    icons.forEach(icon => {

        icon.addEventListener("click", function (event) {

            event.stopPropagation();

            icons.forEach(otherIcon => {

                otherIcon.classList.remove("selected");

            });

            icon.classList.add("selected");

        });

    });


    desktop.addEventListener("click", function () {

        icons.forEach(icon => {

            icon.classList.remove("selected");

        });

    });

});

// ============================================
// START MENU
// ============================================

function toggleStartMenu(event) {

    if (event) {
        event.stopPropagation();
    }

    const menu = document.getElementById("startMenu");

    if (!menu) return;

    menu.classList.toggle("hidden");

}


// Close the Start menu when clicking elsewhere

document.addEventListener("click", function (event) {

    const menu = document.getElementById("startMenu");

    if (!menu) return;

    if (menu.contains(event.target)) return;

    menu.classList.add("hidden");

});

// ============================================
// DESKTOP: OPEN DOCUMENTS
// ============================================

function openDocuments() {

    window.location.href =
        "/RyansArchive/desktop/documents/index.html";

}

// ============================================
// APPLICATION NAVIGATION
// ============================================

function appBack() {

    const currentPath = window.location.pathname;

    // Normalize the current path so both
    // /RyansArchive/ and /RyansArchive/index.html
    // are treated as the archive's home.
    const normalizedPath =
        currentPath.replace(/\/+$/, "");

    const archiveRoot = "/RyansArchive";
    const archiveHome = [
        archiveRoot,
        archiveRoot + "/index.html"
    ];

    const documentsRoot = [
        archiveRoot + "/desktop/documents",
        archiveRoot + "/desktop/documents/index.html"
    ];


    // ========================================
    // APPLICATION BOUNDARIES
    // ========================================

    // Do not allow Back to leave Ryan's Archive.
    if (archiveHome.includes(normalizedPath)) {
        return;
    }

    // Do not allow Back to leave Documents.
    if (documentsRoot.includes(normalizedPath)) {
        return;
    }


    // ========================================
    // USE NORMAL BROWSER HISTORY WHEN SAFE
    // ========================================

    const referrer = document.referrer;

    if (referrer) {

        try {

            const referrerURL = new URL(referrer);

            const sameOrigin =
                referrerURL.origin === window.location.origin;

            const insideRyanArchive =
                referrerURL.pathname.startsWith(archiveRoot);

            if (sameOrigin &&
                insideRyanArchive &&
                window.history.length > 1) {

                history.back();
                return;

            }

        } catch (error) {

            // Fall through to the application fallback below.

        }

    }


    // ========================================
    // APPLICATION-SAFE FALLBACKS
    // ========================================

    // Logs -> About Logs
    if (currentPath.includes("/logs/")) {

        window.location.href =
            archiveRoot + "/logs/AboutLogs.html";

        return;

    }

    // Image viewers -> Photo Archive
    if (currentPath.includes("/images/") &&
        !currentPath.endsWith("/indexS.html")) {

        window.location.href =
            archiveRoot + "/images/indexS.html";

        return;

    }

    // Download viewers -> Downloads
    if (currentPath.includes("/downloads/") &&
        !currentPath.endsWith("/indexD.html")) {

        window.location.href =
            archiveRoot + "/downloads/indexD.html";

        return;

    }

    // About / Data / Search -> Archive home
    if (currentPath.includes("/about/") ||
        currentPath.includes("/data/") ||
        currentPath.endsWith("/search.html")) {

        window.location.href =
            archiveRoot + "/index.html";

        return;

    }

    // Documents sub-pages -> Documents home
    if (currentPath.includes("/desktop/documents/")) {

        window.location.href =
            archiveRoot + "/desktop/documents/index.html";

        return;

    }

}

// ============================================
// WINDOW CONTROLS
// ============================================

function minimizeWindow() {

    const viewer = document.querySelector(".viewer");

    if (!viewer) return;

    viewer.classList.add("windowMinimized");

}


function toggleMaximize() {

    const viewer = document.querySelector(".viewer");

    if (!viewer) return;

    viewer.classList.toggle("windowMaximized");

}


function closeWindow() {

    const viewer = document.querySelector(".viewer");

    if (!viewer) return;

    // If this is Ryan's Archive, return to the desktop.
    if (document.body.dataset.app === "archive") {

        window.location.href = "/RyansArchive/desktop/desktop.html";

        return;

    }

    // If this is the Documents application,
    // return to the desktop.
    if (document.body.dataset.app === "documents") {

        window.location.href = "/RyansArchive/desktop/desktop.html";

        return;

    }

    // Otherwise, use our normal application navigation.
    appBack();

}