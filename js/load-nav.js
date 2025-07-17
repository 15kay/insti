document.addEventListener("DOMContentLoaded", function () {
  fetch("/headers/index.html")
    .then(res => res.text())
    .then(data => {
      console.log(data);
      document.getElementById("nav-placeholder").innerHTML = data;
    });
});

// Responsive menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.querySelector('.menu-btn');
  const navlinks = document.querySelector('.nav-links');

  if (menuBtn && navlinks) {
    menuBtn.addEventListener('click', () => {
      navlinks.classList.toggle('mobile-menu');
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  // Set active link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (currentPage === linkPage) {
      link.classList.add('active');
    }
  });

  // Search functionality would be loaded here too
  // ... (same search script from previous example)
});



document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  // Sample search data - replace with your actual search content
  const searchData = [
    { title: "About WSU", url: "/assest/about.html" },
    { title: "Student Tracking", url: "/assest/student-tracking.html" },
    { title: "HEMIS Information", url: "/assest/hemis.html" },
    { title: "Institutional Research", url: "/assest/institutional-research.html" },
    { title: "Contact Information", url: "#", onclick: "contact()" }
  ];

  // // Handle search form submission
  // searchForm.addEventListener('submit', function (e) {
  //   e.preventDefault();
  //   performSearch();
  // });

  // Handle input changes for live search
  // searchInput.addEventListener('input', function () {
  //   if (searchInput.value.length > 0) {
  //     performSearch();
  //   } else {
  //     searchResults.classList.remove('show');
  //   }
  // });

  // Close search results when clicking outside
  document.addEventListener('click', function (e) {
    if (!searchForm.contains(e.target)) {
      searchResults.classList.remove('show');
    }
  });

  function performSearch() {
    const query = searchInput.value.toLowerCase();
    if (query.length < 1) {
      searchResults.classList.remove('show');
      return;
    }

    const results = searchData.filter(item =>
      item.title.toLowerCase().includes(query)
    );

    displayResults(results);
  }

  function displayResults(results) {
    searchResults.innerHTML = '';

    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
    } else {
      results.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.textContent = item.title;

        resultItem.addEventListener('click', function () {
          if (item.onclick) {
            window[item.onclick]();
          } else {
            window.location.href = item.url;
          }
          searchResults.classList.remove('show');
        });

        searchResults.appendChild(resultItem);
      });
    }

    searchResults.classList.add('show');
  }
});
