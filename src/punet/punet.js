const jobs = [
    {
        plate: "AB 123 CD",
        client: "Emri i Klienti",
        phone: "044 123 456",
        mechanics: ["Emri Mekanikut 1", "Emri Mekanikut 2"],
        dueDate: "30/09/2025",
        status: "Aktiv",
        group: "active",
    },
    {
        plate: "AB 123 CD",
        client: "Emri i Klienti",
        phone: "049 222 333",
        mechanics: ["Emri Mekanikut 1", "Emri Mekanikut 2"],
        dueDate: "30/09/2025",
        status: "Aktiv",
        group: "active",
    },
    {
        plate: "AB 123 CD",
        client: "Emri i Klienti",
        phone: "045 555 777",
        mechanics: ["Emri Mekanikut 1", "Emri Mekanikut 2"],
        dueDate: "30/09/2025",
        status: "Aktiv",
        group: "active",
    },
    {
        plate: "AB 123 CD",
        client: "Emri i Klienti",
        phone: "043 100 200",
        mechanics: ["Emri Mekanikut 1", "Emri Mekanikut 2"],
        dueDate: "30/09/2025",
        status: "Aktiv",
        group: "active",
    },
    {
        plate: "AB 123 CD",
        client: "Emri i Klienti",
        phone: "048 321 654",
        mechanics: ["Emri Mekanikut 1", "Emri Mekanikut 2"],
        dueDate: "30/09/2025",
        status: "Aktiv",
        group: "active",
    },
    {
        plate: "AB 123 CD",
        client: "Emri i Klienti",
        phone: "044 999 111",
        mechanics: ["Emri Mekanikut 1", "Emri Mekanikut 2"],
        dueDate: "30/09/2025",
        status: "Aktiv",
        group: "active",
    },
    {
        plate: "AB 123 CD",
        client: "Emri i Klienti",
        phone: "049 101 303",
        mechanics: ["Emri Mekanikut 1", "Emri Mekanikut 2"],
        dueDate: "30/09/2025",
        status: "Aktiv",
        group: "finished",
    },
    {
        plate: "AB 123 CD",
        client: "Emri i Klienti",
        phone: "045 707 808",
        mechanics: ["Emri Mekanikut 1", "Emri Mekanikut 2"],
        dueDate: "30/09/2025",
        status: "Aktiv",
        group: "finished",
    },
    {
        plate: "AB 123 CD",
        client: "Emri i Klienti",
        phone: "044 606 505",
        mechanics: ["Emri Mekanikut 1", "Emri Mekanikut 2"],
        dueDate: "30/09/2025",
        status: "Aktiv",
        group: "finished",
    },
];

const folderIcon = `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 7.8c0-1 .8-1.8 1.8-1.8h4.6l2 2h7.8c1 0 1.8.8 1.8 1.8v1.4H3V7.8Z" fill="#303030"/>
        <path d="M3.3 10h17.4c.7 0 1.3.6 1.2 1.4l-.8 6.9c-.1 1-1 1.7-2 1.7H4.9c-1 0-1.8-.7-2-1.7l-.8-6.9C2 10.6 2.6 10 3.3 10Z" fill="url(#folderGradient)"/>
        <defs>
            <linearGradient id="folderGradient" x1="12" y1="10" x2="12" y2="20" gradientUnits="userSpaceOnUse">
                <stop stop-color="#555"/>
                <stop offset="1" stop-color="#151515"/>
            </linearGradient>
        </defs>
    </svg>
`;

const activeJobs = document.getElementById("activeJobs");
const finishedJobs = document.getElementById("finishedJobs");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("jobSearch");
const profileButton = document.getElementById("profileBtn");
const profileMenu = document.getElementById("profileMenu");
const profileChevron = document.getElementById("profileChevron");
const notificationButton = document.getElementById("notificationBtn");
const logoutButton = document.getElementById("logoutBtn");

function createJobCard(job) {
    const card = document.createElement("article");
    card.className = "job-card";
    card.dataset.search = `${job.plate} ${job.phone} ${job.client}`.toLowerCase();

    card.innerHTML = `
        <div class="job-card__top">
            <div class="job-card__icon">${folderIcon}</div>
            <div class="job-card__title">
                <strong class="job-card__plate">${job.plate}</strong>
                <span class="job-card__client">${job.client}</span>
            </div>
            <span class="job-card__status">${job.status}</span>
        </div>
        <div class="job-card__divider"></div>
        <div class="job-card__details">
            <div class="job-card__group">
                <span class="job-card__label">Mekanikët</span>
                <span class="job-card__value">${job.mechanics.join("<br>")}</span>
            </div>
            <div class="job-card__group">
                <span class="job-card__label">Data e Përfundimit</span>
                <span class="job-card__value">${job.dueDate}</span>
            </div>
        </div>
    `;

    return card;
}

function renderJobs() {
    if (!activeJobs || !finishedJobs) {
        return;
    }

    activeJobs.innerHTML = "";
    finishedJobs.innerHTML = "";

    jobs.forEach((job) => {
        const target = job.group === "finished" ? finishedJobs : activeJobs;
        target.appendChild(createJobCard(job));
    });
}

function filterJobs() {
    const term = searchInput.value.trim().toLowerCase();
    const cards = document.querySelectorAll(".job-card");
    let visibleCount = 0;

    cards.forEach((card) => {
        const isVisible = card.dataset.search.includes(term);
        card.hidden = !isVisible;

        if (isVisible) {
            visibleCount += 1;
        }
    });

    emptyState.hidden = visibleCount !== 0;
}

function closeProfileMenu() {
    profileMenu.classList.remove("is-open");
    profileChevron.classList.remove("is-open");
    profileButton.setAttribute("aria-expanded", "false");
}

renderJobs();

if (searchInput) {
    searchInput.addEventListener("input", filterJobs);
}

if (profileButton && profileMenu && profileChevron) {
    profileButton.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = profileMenu.classList.toggle("is-open");
        profileChevron.classList.toggle("is-open", isOpen);
        profileButton.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", (event) => {
        if (!profileMenu.contains(event.target) && !profileButton.contains(event.target)) {
            closeProfileMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeProfileMenu();
        }
    });
}

if (notificationButton) {
    notificationButton.addEventListener("click", () => {
        alert("Ju keni 2 njoftime të reja!");
    });
}

if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        if (confirm("A jeni i sigurt që dëshironi të dilni nga llogaria?")) {
            alert("Duke dalë nga sistemi...");
        }
    });
}
