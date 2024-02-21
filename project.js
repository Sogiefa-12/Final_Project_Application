

// const accessKey = "n-CV_9zs4aFEA0Qcuef-iDjjJClvY686kOCRWhT1YEo";
// const formEl = document.querySelector('form');
// const inputEl = document.getElementById("search-input");
// const searchResults = document.querySelector(".search-results");
// const showMore = document.getElementById("show-more-button");

// let inputData = "";
// let page = 1;

// async function searchImages(
// ) {
//     inputData = inputEl.value.trim();
//     if (!inputData) {
//         console.error("Input data is empty");
//         return;
//     }

//     const url = `http://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
//     const response = await fetch(url);

//     if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     const results = data.results;

//     searchResults.innerHTML = ""; // Clear previous results
// results.forEach((result) => {
//         const imageWrapper = document.createElement("div");
//         imageWrapper.classList.add("search-result");

//         const image = document.createElement("img");
//         image.src = result.urls.small;
//         image.alt = result.alt;

//         const imageTitle = document.createElement("h3");
//         imageTitle.textContent = result.alt || 'Image';

//         const imageLink = document.createElement("a");
//         imageLink.href = result.links.html;
//         imageLink.target = "_blank";

//         imageWrapper.appendChild(image);
//         imageWrapper.appendChild(imageTitle);
//         imageWrapper.appendChild(imageLink);
//         searchResults.appendChild(imageWrapper);
//     });

//     if (results.length > 0) {
//         showMore.style.display = 'block';
//     }
//     page++;
// }

// if (formEl) {
//     formEl.addEventListener('submit', (event) => {
//         event.preventDefault();
//         searchImages();
//     });

//     showMore.addEventListener('click', (event) => {
//         event.preventDefault();
//         searchImages();
//     });
// } else {
//     console.error("Form element not found");
// }


$(function () {
    let searchInput = "";
    let page = 1;
    let data = [];
  
    async function searchImgs() {
      const accessKey = "n-CV_9zs4aFEA0Qcuef-iDjjJClvY686kOCRWhT1YEo";
      const url = `https://api.unsplash.com/search/photos?page=${page}&query=${searchInput}&client_id=${accessKey}`;
      const searchApi = await fetch(url);
      const apiResponse = await searchApi.json();
  
      if (!apiResponse.error) {
        if (page === 1) {
          data = apiResponse.results;
        } else {
          data = data.concat(apiResponse.results);
        }
        displayImgs();
      }
    }
  
    function displayImgs() {
      let searchResults = "";
      if (data.length === 0) {
        searchResults = "<p class='text-center fw-bold'>No results found.</p>";
      } else {
        for (let i = 0; i < data.length; i++) {
          searchResults += `
            <div class="col-md-6 col-lg-4">
              <div class="card searchImg">
              <div id="cardImg">
                 <img
                  src="${data[i].urls.small}"
                  class="card-img-top"
                  alt="${data[i].alt_description}"
                  /></div>
                 <div class="card-body">
                  <a
                    href="${data[i].links.html}"
                    class="card-text"
                    target="_blank"
                    rel="noopener"
                    >${data[i].alt_description}</a
                  >
                 </div>
               </div>
            </div>`;
        }
      }
      $("#inputResults").html(searchResults);
  
      if (data.length > 0) {
        $("#showMoreBtn").removeClass("d-none");
      } else {
        $("#showMoreBtn").addClass("d-none");
      }
    }
  
    function performSearch() {
      searchInput = $("#searchInput").val();
      searchImgs();
    }
  
    $("#searchInput").on("keyup", function (event) {
      if (event.key === "Enter") {
        page = 1;
        performSearch();
      }
    });
  
    $("#searchBtn").on("click", function () {
      page = 1;
      performSearch();
    });
  
    $("#showMoreBtn").on("click", function () {
      page++;
      if (searchInput == $("#searchInput").val()) {
        performSearch();
      } else {
        searchImgs();
      }
    });
  
    $(".fixedCard").on("click", function () {
      const cardTitle = $(this).find(".cardTitle").text();
      searchInput = cardTitle;
      searchImgs();
    });
  
    $("#inputResults").on("click", ".searchImg", function () {
      const imgLink = $(this).find(".card-text").attr("href");
      window.open(imgLink, "_blank");
    });
  });
  