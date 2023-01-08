let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function createAndAppendSearchResult(result) {
    let booktitle = result["title"];
    let bookimagelink = result["imageLink"];
    let bookauthor = result["author"];
    let resultItem = document.createElement("div");
    resultItem.classList.add("col-6", "col-md-4", "col-xl-3", "d-flex", "flex-column");
    let bookimg = document.createElement("img");
    bookimg.setAttribute('src', bookimagelink);
    bookimg.classList.add("bookimg");
    resultItem.appendChild(bookimg);
    let authorname = document.createElement("p");
    authorname.textContent = bookauthor;
    authorname.classList.add("authors");
    resultItem.appendChild(authorname);
    searchResults.appendChild(resultItem);
}

function displayResults(search_results) {
    spinner.classList.add("d-none");
    removeAllChildNodes(searchResults);
    let len = search_results.length;
    let resultItem = document.createElement("div");
    resultItem.classList.add("col-12");
    let resultitemtxt = document.createElement("p");
    resultitemtxt.classList.add("resulttxt");
    resultItem.appendChild(resultitemtxt);
    searchResults.appendChild(resultItem);
    if (len == 0) {
        resultitemtxt.textContent = "No results found.";
    } else {
        resultitemtxt.textContent = "Popular Books";
        for (let result of search_results) {
            createAndAppendSearchResult(result);
        }
    }
}

function searchstore(event) {
    if (event.key === "Enter") {
        spinner.classList.remove("d-none");
        let searchInputval = searchInput.value;
        let url = "https://apis.ccbp.in/book-store?title=" + searchInputval;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function (response) {
                return response.json();
            })
            .then(function (jsonData) {
                let { search_results } = jsonData;
                displayResults(search_results);
            });
    }
}
searchInput.addEventListener("keydown", searchstore);