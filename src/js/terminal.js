const terminal = document.querySelector('#terminal')
const terminalcontent = document.querySelector('#terminal-content')
const input = document.querySelector('#command-line-input')
const output = document.querySelector('#terminal-output')
let used_commands = []
let used_command_pointer = 1
let terminalview = null
let terminalviewbody = null


terminal.addEventListener('click', () => {
    terminalview = new WinBox({
        title: 'Terminal',
        modal: true,
        width: '95%',
        height: '90%',
        mount: terminalcontent,
        background: 'var(--standout-text-color)',

        onclose: () => {
            window.removeEventListener('resize', () => {})
            document.removeEventListener('keyup', inputevents)
        }
    })

    terminalviewbody = document.querySelector('.wb-body')

    window.addEventListener('resize', function(e) {
        terminalview.resize('95%', '90%')
        terminalview.move("center", "center");
    }, true);

    document.addEventListener('keydown', inputevents)

    input.value = ""
    input.focus()
})

function inputevents(e) {

    if (e.key === 'Enter') {

        let command = input.value.trim()

        let div = document.createElement('div')
        let used_command = document.createElement('p')
        used_command.append('guest@neumann:~$ ' + input.value.trim())
        div.appendChild(used_command)
        output.appendChild(div)

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
                case 'sudo':
                    sudo(inputfields)
                    break;
                case 'fullscreen':
                    terminalview.fullscreen()
                    break;
                case 'echo':
                    var response = document.createElement('p')
                    response.append(command)
                    output.appendChild(response)
                    break;
                default:
                    var response = document.createElement('p')
                    response.append('Command not found: ' + inputfields[0] + ' - Try \'help\' to get started.')
                    output.appendChild(response)
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

function help(args, div) {
    let response = document.createElement('html')
    response.append("Available Commands: </br> Test")
    output.appendChild(response)
}

function sudo(args) {
    if (args[1] && args[1].toLowerCase() === "rm" && args[2] && args[2].toLowerCase().includes("-r") && args[3] && args[3] === "/") {
        terminalview.close()
        output.innerHTML = ""
    }
}