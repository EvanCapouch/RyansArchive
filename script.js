const rows = document.querySelectorAll(".explorer tr[data-status]");
const statusBar = document.getElementById("statusBar");

rows.forEach(row => {

    row.addEventListener("mouseenter", () => {

        statusBar.textContent = row.dataset.status;

    });

    row.addEventListener("mouseleave", () => {

        statusBar.textContent = "5 Items";

    });

});

function searchArchive(){

    const query = document
        .getElementById("searchInput")
        .value
        .trim()
        .toLowerCase();

    switch(query){

        case "logs":
            window.location.href="logs/AboutLogs.html";
            break;

        case "images":
        case "photo_archive":
            window.location.href="images/indexS.html";
            break;

        case "downloads":
            window.location.href="downloads/indexD.html";
            break;

        case "about":
            window.location.href="about/about.html";
            break;

        case "memory":
            window.location.href="data/memory.html";
            break;

        case "root":
            window.location.href="data/root.html";
            break;

        default:
            window.location.href = "search.html";

    }

}

// Allow the Enter key to perform a search

document.addEventListener("DOMContentLoaded", function () {

    const search = document.getElementById("searchInput");

    if(search){

        search.addEventListener("keypress", function(event){

            if(event.key === "Enter"){

                searchArchive();

            }

        });

    }

});