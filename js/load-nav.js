document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");

  // Ensure toggle works for mobile menu
  hamburger?.addEventListener("click", () => {
    sidebar.classList.toggle("show");
    hamburger.classList.toggle("active");
    const expanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", String(!expanded));
  });

  // Close when clicking outside
  window.addEventListener("click", (e) => {
    if (
      sidebar.classList.contains("show") &&
      !sidebar.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      sidebar.classList.remove("show");
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });

  initSearch(); // Activate search function
});

function initSearch() {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  if (!searchForm || !searchInput || !searchResults) return;

  const searchData = [
    { title: "About WSU", url: "/assest/about.html" },
    { title: "Student Tracking", url: "/assest/student-tracking.html" },
    { title: "HEMIS Information", url: "/assest/hemis.html" },
    { title: "Institutional Research", url: "/assest/institutional-research.html" },
    { title: "Contact Information", url: "#", onclick: "contact" }
  ];

  searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();
    if (query.length < 1) {
      searchResults.classList.remove("show");
      return;
    }

    const filteredResults = searchData.filter(item =>
      item.title.toLowerCase().includes(query)
    );

    searchResults.innerHTML = "";

    if (filteredResults.length === 0) {
      searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
    } else {
      filteredResults.forEach(item => {
        const div = document.createElement("div");
        div.className = "search-result-item";
        div.textContent = item.title;

        div.addEventListener("click", () => {
          if (item.onclick && typeof window[item.onclick] === "function") {
            window[item.onclick]();
          } else if (item.url) {
            window.location.href = item.url;
          } else {
            console.warn("No valid action for:", item);
          }

          searchResults.classList.remove("show");
        });

        searchResults.appendChild(div);
      });
    }

    searchResults.classList.add("show");
  });

  // Close search dropdown if clicked outside
  document.addEventListener("click", function (e) {
    if (!searchForm.contains(e.target)) {
      searchResults.classList.remove("show");
    }
  });
}
