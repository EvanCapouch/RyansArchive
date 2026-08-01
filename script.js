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