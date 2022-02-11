const maincontent = document.querySelector('#main-content')

loadHome()

/**
 * @param {String} url - address for the HTML to fetch
 * @return {String} the resulting HTML string fragment
 */
async function fetchHtmlAsText(url) {
    return await (await fetch(url)).text();
}

// this is your `load_home() function`
async function loadHome() {
    maincontent.innerHTML = await fetchHtmlAsText("pages/home.html");
}

async function loadCookie() {
    maincontent.innerHTML = await fetchHtmlAsText("pages/cookies.html");
}