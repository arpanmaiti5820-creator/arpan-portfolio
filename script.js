/* =========================================
   PORTFOLIO INTERACTIONS
========================================= */

const navlinks = document.querySelector(".nav-links");
const menutoggle = document.querySelector(".menu-toggle");
const navItem = document.querySelectorAll(".nav-links a");
const backToTop = document.querySelector("#backToTop");
const year = document.querySelector("#year");

const sections = Array.from(
    document.querySelectorAll("main section[id]")
);

/* Current year */
if (year) {
    year.textContent = new Date().getFullYear();
}

/* =========================================
   MOBILE NAVIGATION
========================================= */

if (menutoggle && navlinks) {
    menutoggle.setAttribute("aria-expanded", "false");

    menutoggle.addEventListener("click", () => {
        const isOpen = navlinks.classList.toggle("active");
        menutoggle.setAttribute("aria-expanded", String(isOpen));
    });

    navItem.forEach((item) => {
        item.addEventListener("click", () => {
            navlinks.classList.remove("active");
            menutoggle.setAttribute("aria-expanded", "false");
        });
    });

    /* Close the mobile menu when clicking outside it */
    document.addEventListener("click", (event) => {
        if (!event.target.closest(".navbar")) {
            navlinks.classList.remove("active");
            menutoggle.setAttribute("aria-expanded", "false");
        }
    });
}

/* =========================================
   SECTION ACTIVE NAV LINK
========================================= */

function updateActiveNav() {
    const headerOffset = 110;
    let currentSection = sections[0];

    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= headerOffset && rect.bottom > headerOffset) {
            currentSection = section;
        }
    });

    navItem.forEach((item) => item.classList.remove("active"));

    if (currentSection) {
        const activeLink = document.querySelector(
            `.nav-links a[href="#${currentSection.id}"]`
        );

        if (activeLink) {
            activeLink.classList.add("active");
        }
    }
}

/* =========================================
   REVEAL TRANSITION FOR EVERY SECTION
========================================= */

/* Add the same reveal class used by the About section to every section. */
sections.forEach((section) => {
    if (!section.classList.contains("hero-intro")) {
        section.classList.add("reveal");
    }
});

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px"
    }
);

revealElements.forEach((element) => observer.observe(element));

/* =========================================
   SCROLL HANDLER
========================================= */

let ticking = false;

window.addEventListener(
    "scroll",
    () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveNav();

                if (backToTop) {
                    backToTop.classList.toggle("show", window.scrollY > 300);
                }

                ticking = false;
            });

            ticking = true;
        }
    },
    { passive: true }
);

/* Set the correct active link immediately on page load. */
updateActiveNav();

/* =========================================
   BACK TO TOP
========================================= */

if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
