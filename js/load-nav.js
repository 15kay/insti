     document.addEventListener("DOMContentLoaded", function () {
            const hamburger = document.getElementById("hamburger");
            const sidebar = document.getElementById("sidebar");
            const closeBtn = document.getElementById("closeBtn");

            hamburger.addEventListener("click", () => {
                sidebar.classList.toggle("show");
                hamburger.classList.toggle("active");
                // Toggle aria-expanded for accessibility
                const expanded = hamburger.getAttribute("aria-expanded") === "true";
                hamburger.setAttribute("aria-expanded", String(!expanded));
            });

            closeBtn.addEventListener("click", () => {
                sidebar.classList.remove("show");
                hamburger.classList.remove("active");
                hamburger.setAttribute("aria-expanded", "false");
            });

            // Close sidebar if clicking outside
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
        });

function initSearch() {
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  if (!searchForm || !searchInput || !searchResults) return;

  const searchData = [
    { title: "About WSU", url: "/assest/about.html" },
    { title: "Student Tracking", url: "/assest/student-tracking.html" },
    { title: "HEMIS Information", url: "/assest/hemis.html" },
    { title: "Institutional Research", url: "/assest/institutional-research.html" },
    { title: "Contact Information", url: "#", onclick: "contact" }
  ];

  searchInput.addEventListener('input', function () {
    const query = searchInput.value.toLowerCase();
    if (query.length < 1) {
      searchResults.classList.remove('show');
      return;
    }

    const results = searchData.filter(item =>
      item.title.toLowerCase().includes(query)
    );

    searchResults.innerHTML = results.length
      ? results.map(item => `<div class="search-result-item">${item.title}</div>`).join('')
      : '<div class="search-result-item">No results found</div>';

    document.querySelectorAll('.search-result-item').forEach((el, i) => {
      el.addEventListener('click', () => {
        if (searchData[i].onclick) {
          window[searchData[i].onclick]();
        } else {
          window.location.href = searchData[i].url;
        }
        searchResults.classList.remove('show');
      });
    });

    searchResults.classList.add('show');
  });

  document.addEventListener('click', function (e) {
    if (!searchForm.contains(e.target)) {
      searchResults.classList.remove('show');
    }
  });
}
