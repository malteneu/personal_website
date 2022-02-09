const terminal = document.querySelector('#terminal')
const terminalcontent = document.querySelector('#terminal-content')
const input = document.querySelector('#terminal-input')
const output = document.querySelector('#terminal-output')

var terminalview = null

terminal.addEventListener('click', () => {
    terminalview = new WinBox({
        title: 'Terminal',
        modal: true,
        width: '95%',
        height: '90%',
        mount: terminalcontent,
        background: 'var(--standout-text-color)',
    })

    document.addEventListener('keyup', inputevents)
    input.value = ""
    input.focus()
})

input.addEventListener('blur', () => {
    input.focus()
})

function inputevents(e) {

    input.focus()

    if (e.key === 'Enter') {
        e.preventDefault()
        e.stopImmediatePropagation()

        var inputflieds = input.value.trim().split(' ')

        switch (inputflieds[0]) {
            case 'help':
                input.value = inputflieds[1]
                break;
            default:
                break;
        }
    }

    if (e.key === 'Escape') {
        terminalview.close()
    }

}


