

const accessKey = "n-CV_9zs4aFEA0Qcuef-iDjjJClvY686kOCRWhT1YEo";
const formEl = document.querySelector('form');
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages(
) {
    inputData = inputEl.value.trim();
    if (!inputData) {
        console.error("Input data is empty");
        return;
    }

    const url = `http://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const results = data.results;

    searchResults.innerHTML = ""; // Clear previous results
results.forEach((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");

        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt;

        const imageTitle = document.createElement("h3");
        imageTitle.textContent = result.alt || 'Image';

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageTitle);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    if (results.length > 0) {
        showMore.style.display = 'block';
    }
    page++;
}

if (formEl) {
    formEl.addEventListener('submit', (event) => {
        event.preventDefault();
        searchImages();
    });

    showMore.addEventListener('click', (event) => {
        event.preventDefault();
        searchImages();
    });
} else {
    console.error("Form element not found");
}

