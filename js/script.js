// pre loader
window.addEventListener("load", function () {
  document.getElementById("preloader").style.display = "none";
});

// Scroll to top button functionality
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
});
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Smooth scrolling for anchor links
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY >= 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Replace with your actual Google Sheets CSV URL for NEWS content
const sheet2CSV =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vR92joYVUckkwpG1sFV4uXkfwmrclhao3nHW-r8z4mYKvYhVsQ4rnLUET_IXgtB2aRgH4k-si7X3IV2/pub?gid=1677709979&single=true&output=csv";

fetch(sheet2CSV)
  .then((response) => response.text())
  .then((data) => {
    const rows = data.split("\n").slice(1);
    const newsItems = rows
      .map((row) => {
        const columns = row.split(",");
        const content = columns[0]?.trim();
        const color = columns[1]?.trim().toLowerCase();
        if (content) {
          const style = color === "red" ? "color: red; font-weight: 600;" : "color: black;";
          return `<span style="${style}">${content}</span>`;
        }
        return null;
      })
      .filter((item) => item);

    // Use newspaper icon as separator
    document.getElementById("news-marquee").innerHTML = newsItems.join(
      ' <i class="fa-solid fa-newspaper" style="margin: 0 10px;"></i> '
    );
  })
  .catch((error) => {
    console.error("Error fetching Google Sheet:", error);
    document.getElementById("news-marquee").textContent =
      "Unable to load news.";
  });
