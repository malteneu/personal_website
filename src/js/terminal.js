const r = document.querySelector(':root')
const terminalcontent = document.querySelector('#terminal-content')
const input = document.querySelector('#command-line-input')
const output = document.querySelector('#terminal-output')
let used_commands = []
let used_command_pointer = 1
let terminalview = null
let contentDiv = null
let response = null

function loadTerminal() {

    terminalview = new WinBox({
        title: 'Terminal',
        modal: true,
        width: '95%',
        height: '90%',
        mount: terminalcontent,
        background: 'var(--standout-text-color)',

        onclose: () => {
            window.removeEventListener('resize', () => {
            })
            document.removeEventListener('keyup', inputevents)
        }
    })

    window.addEventListener('resize', () => {
        terminalview.resize('95%', '90%')
        terminalview.move("center", "center");
    }, true);

    document.addEventListener('keydown', inputevents)

    input.value = ""
    input.scrollIntoView()
    input.focus()
}

function inputevents(e) {

    if (e.key === 'Enter') {

        let command = input.value.trim()

        contentDiv = document.createElement('div')
        contentDiv.className = "terminal-output-single"
        let used_command = document.createElement('p')
        used_command.append('guest@neumann:~$ ' + input.value.trim())
        contentDiv.appendChild(used_command)
        output.appendChild(contentDiv)

        if (command !== "") {
            used_commands.push(command)

            let inputfields = command.split(' ')

            switch (inputfields[0].toLowerCase()) {
                case 'help':
                    help(inputfields);
                    break;
                case 'exit':
                    terminalview.close()
                case 'clear':
                    output.innerHTML = ""
                    break;
                case 'color':
                    color(inputfields)
                    break;
                case 'sudo':
                    sudo(inputfields)
                    break;
                case 'fullscreen':
                    terminalview.fullscreen()
                    break;
                case 'echo':
                    response = document.createElement('p')
                    response.append(command.slice(5))
                    output.appendChild(response)
                    break;
                case 'flip':
                case 'coin':
                case 'flipcoin':
                case 'coinflip':
                    flipcoin()
                    break;
                case 'random':
                    random(inputfields)
                    break;
                case 'useless':
                    useless()
                    break;
                default:
                    response = document.createElement('p')
                    response.append('Command not found: ' + inputfields[0] + ' - Try \'help\' to get started.')
                    contentDiv.appendChild(response)
                    break;
            }

            input.value = ""

        }

        used_command_pointer = 1
        input.scrollIntoView()

    }

    if (e.key === 'Escape') {
        terminalview.close()
    }

    if (e.key === 'ArrowUp') {

        if (used_command_pointer <= used_commands.length) {
            input.value = used_commands[used_commands.length - used_command_pointer]
            if (used_command_pointer < used_commands.length) {
                used_command_pointer++;
            }
        }
    }

    if (e.key === 'ArrowDown') {

        if (used_command_pointer > 1) {
            input.value = used_commands[used_commands.length - used_command_pointer + 1]
            if (used_command_pointer > 1) {
                used_command_pointer--;
            }
        } else {
            input.value = ""
        }
    }
}

function focusinput() {
    window.setTimeout(function () {
        input.focus();
    }, 0);
}

function help() {
    let response = document.createElement('p')
    response.innerHTML =
        "Available Commands:<br>" +
        "Type help [command] for a detailed version! <br>" +
        "clear<br>" +
        "coinflip<br>" +
        "color<br>" +
        "echo<br>" +
        "exit<br>" +
        "fullscreen<br>" +
        "random<br>"

    contentDiv.appendChild(response)
}

function sudo(args) {
    if (args[1] && args[1].toLowerCase() === "rm" && args[2] && args[2].toLowerCase().includes("-r") && args[3] && args[3] === "/") {
        terminalview.close()
        output.innerHTML = ""
    }
}

function random(args) {
    switch (args[1]) {
        case 'color':
            randomColor()
            break;
        case 'website':
            useless()
            break;
        case 'coin':
        case 'flip':
            flipcoin()
            break;
        case 'number':
        default:
            let response = document.createElement('p')
            response.innerHTML = "Random Number: " + getRandomNumber(args[2] ? args[2] : 2)
            contentDiv.appendChild(response)
    }
}

function flipcoin() {
    let response = document.createElement('p')
    response.innerHTML = getRandomNumber(2) ? "Heads" : "Tail"
    contentDiv.appendChild(response)
}

function useless() {
    let sitesList = [
        "https://longdogechallenge.com/",
        "https://checkboxrace.com/",
        "https://onesquareminesweeper.com/",
        "http://heeeeeeeey.com/",
        "http://corndog.io/",
        "https://mondrianandme.com/",
        "https://puginarug.com",
        "https://checkboxolympics.com/",
        "https://alwaysjudgeabookbyitscover.com",
        "https://thatsthefinger.com/",
        "https://cant-not-tweet-this.com/",
        "http://eelslap.com/",
        "http://www.staggeringbeauty.com/",
        "http://burymewithmymoney.com/",
        "https://smashthewalls.com/",
        "https://jacksonpollock.org/",
        "http://endless.horse/",
        "https://www.trypap.com/",
        "http://www.republiquedesmangues.fr/",
        "http://www.movenowthinklater.com/",
        "http://www.partridgegetslucky.com/",
        "http://www.rrrgggbbb.com/",
        "http://www.koalastothemax.com/",
        "http://www.everydayim.com/",
        "http://randomcolour.com/",
        "http://cat-bounce.com/",
        "http://chrismckenzie.com/",
        "https://thezen.zone/",
        "http://hasthelargehadroncolliderdestroyedtheworldyet.com/",
        "http://ninjaflex.com/",
        "http://ihasabucket.com/",
        "http://corndogoncorndog.com/",
        "http://www.hackertyper.com/",
        "https://pointerpointer.com",
        "http://imaninja.com/",
        "http://drawing.garden/",
        "http://www.ismycomputeron.com/",
        "http://www.nullingthevoid.com/",
        "http://www.muchbetterthanthis.com/",
        "http://www.yesnoif.com/",
        "http://lacquerlacquer.com",
        "http://potatoortomato.com/",
        "http://iamawesome.com/",
        "https://strobe.cool/",
        "http://thisisnotajumpscare.com/",
        "http://doughnutkitten.com/",
        "http://crouton.net/",
        "http://corgiorgy.com/",
        "http://www.wutdafuk.com/",
        "http://unicodesnowmanforyou.com/",
        "http://chillestmonkey.com/",
        "http://scroll-o-meter.club/",
        "http://www.crossdivisions.com/",
        "http://tencents.info/",
        "https://boringboringboring.com/",
        "http://www.patience-is-a-virtue.org/",
        "http://pixelsfighting.com/",
        "http://isitwhite.com/",
        "https://existentialcrisis.com/",
        "http://onemillionlols.com/",
        "http://www.omfgdogs.com/",
        "http://oct82.com/",
        "http://chihuahuaspin.com/",
        "https://popcat.click/",
        "http://www.blankwindows.com/",
        "http://tunnelsnakes.com/",
        "http://www.trashloop.com/",
        "http://www.ascii-middle-finger.com/",
        "http://spaceis.cool/",
        "http://www.donothingfor2minutes.com/",
        "http://buildshruggie.com/",
        "http://buzzybuzz.biz/",
        "http://yeahlemons.com/",
        "http://wowenwilsonquiz.com",
        "https://thepigeon.org/",
        "http://notdayoftheweek.com/",
        "http://www.amialright.com/",
        "http://nooooooooooooooo.com/",
        "https://greatbignothing.com/",
        "https://zoomquilt.org/",
        "https://dadlaughbutton.com/",
        "https://www.bouncingdvdlogo.com/",
        "https://remoji.com/",
        "http://papertoilet.com/",
        "https://loopedforinfinity.com/",
        "https://findtheinvisiblecow.com/"
    ]
    window.open(sitesList[getRandomNumber(sitesList.length + 1)])
}

function color(args) {
    if(args[1]) {
        response = document.createElement('p')

        if(args[1].match('#{1}[0-9a-zA-Z]{1,8}$')) {
            response.innerText = "Color changed to: " + args[1]
            changeColor(args[1])
        } else {
            response.innerText = "Color code incorrect: Start with a '#' followed by a maximum of 6 Digits."
        }

        contentDiv.appendChild(response)

    } else {
        changeColor()
    }
}

function randomColor() {
    let colors = [
        '#00aa00',
        '#ff0000',
        '#0c4df3',
        '#b50af1',
        '#f5d50e',
        '#0ccebe'
    ]

    changeColor(colors[getRandomNumber(colors.length)])
}

function changeColor(color = "#00aa00") {
    r.style.setProperty('--standout-text-color', color)
}

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

