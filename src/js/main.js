const maincontent = document.querySelector('#main-content')
const navigation_items = document.querySelectorAll('button')

navigation_items.forEach(navigation_item => {
    navigation_item.addEventListener('click', () => {
            action(navigation_item)
    })
})

document.getElementById('home').addEventListener('click', () => {
    loadHome()
})

loadHome()

async function fetchHtmlAsText(url) {

    let page = await fetch("elements/" + url + ".html")

    if(page.status === 200) {
        return await (page).text();
    } else {
        return await (await fetch("elements/404.html")).text();
    }
}

async function loadElement(element) {
    maincontent.innerHTML = await fetchHtmlAsText(element)
    window.scrollTo(0,0)
}

function action(navigation_item) {

    switch(navigation_item.getAttribute("id").toLowerCase()) {
        case '':
        case '/':
            loadHome()
            break;
        case 'repo':
            window.open("https://github.com/malteneu/personal_website", "_blank")
            break;
        case 'terminal':
            loadTerminal()
            break;
        case 'scroll_up':
            window.scrollTo({ top: 0, behavior: "smooth" })
            break;
        default:
            loadElement(navigation_item.getAttribute("id"))
            break;
    }
}

function loadHome() {
    loadElement("home")
}

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        document.querySelector('#scroll_up').className = "";
    } else {
        document.querySelector('#scroll_up').className = "hidden";
    }
}



