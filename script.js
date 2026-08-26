const rows = document.querySelectorAll(".explorer tr[data-status]");
const statusBar = document.getElementById("statusBar");

rows.forEach(row => {

    row.addEventListener("mouseenter", () => {

        statusBar.textContent = row.dataset.status;

    });

    row.addEventListener("mouseleave", () => {

        statusBar.textContent = "9 Items";

    });

});

function searchArchive(){

    const query = document
        .getElementById("searchInput")
        .value
        .trim()
        .toLowerCase();
    const root = "/RyansArchive/";
    switch(query){

        case "logs":
            window.location.href = root + "logs/AboutLogs.html";
            break;

        case "images":
        case "photo_archive":
            window.location.href= root + "images/indexS.html";
            break;

        case "downloads":
            window.location.href= root + "downloads/indexD.html";
            break;

        case "about":
            window.location.href= root + "about/about.html";
            break;

        case "memory":
            window.location.href= root + "data/memory.html";
            break;

        case "root":
            window.location.href= root + "data/root.html";
            break;

        default:
            window.location.href= root + "search.html";

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