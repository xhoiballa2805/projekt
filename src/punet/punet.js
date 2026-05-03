const profileButton = document.getElementById("profileButton");
const profileMenu = document.getElementById("profileMenu");
const profileArrow = document.getElementById("profileArrow");
const notificationButton = document.getElementById("notificationButton");
const logoutButton = document.getElementById("logoutButton");
const searchInput = document.getElementById("searchInput");
const emptyMessage = document.getElementById("emptyMessage");
const cards = Array.from(document.querySelectorAll(".job-card"));
const groups = Array.from(document.querySelectorAll(".job-group"));
const compactViewport = window.matchMedia("(max-width: 680px)");

function setProfileMenu(open) {
    if (!profileButton || !profileMenu || !profileArrow) {
        return;
    }

    profileMenu.classList.toggle("open", open);
    profileArrow.classList.toggle("open", open);
    profileButton.setAttribute("aria-expanded", String(open));
}

function filterCards() {
    if (!searchInput || !emptyMessage) {
        return;
    }

    const searchTerm = searchInput.value.trim().toLowerCase();
    let visibleCards = 0;

    cards.forEach((card) => {
        const matches = card.dataset.search.includes(searchTerm);
        card.classList.toggle("hide", !matches);

        if (matches) {
            visibleCards += 1;
        }
    });

    groups.forEach((group) => {
        const hasVisibleCards = group.querySelectorAll(".job-card:not(.hide)").length > 0;
        group.hidden = !hasVisibleCards && searchTerm.length > 0;
    });

    emptyMessage.hidden = visibleCards > 0 || searchTerm.length === 0;
}

if (profileButton) {
    profileButton.addEventListener("click", (event) => {
        event.stopPropagation();
        if (profileMenu) {
            setProfileMenu(!profileMenu.classList.contains("open"));
        }
    });
}

document.addEventListener("click", (event) => {
    if (!profileMenu || !profileButton) {
        return;
    }

    if (!profileMenu.contains(event.target) && !profileButton.contains(event.target)) {
        setProfileMenu(false);
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        setProfileMenu(false);
    }
});

if (notificationButton) {
    notificationButton.addEventListener("click", () => {
        alert("Ju keni 2 njoftime te reja!");
    });
}

if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        const shouldLogout = confirm("A jeni i sigurt qe deshironi te dilni nga llogaria?");

        if (shouldLogout) {
            alert("Duke dale nga sistemi...");
        }
    });
}

if (searchInput) {
    searchInput.addEventListener("input", filterCards);
}

function syncProfileForViewport() {
    if (compactViewport.matches) {
        setProfileMenu(false);
    }
}

syncProfileForViewport();
compactViewport.addEventListener("change", syncProfileForViewport);
