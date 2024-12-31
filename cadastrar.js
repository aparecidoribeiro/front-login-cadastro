const buttonCadastrar = document.querySelector('#cadastrar')
const formCadastro = document.querySelector('.form-cadastro');
const buttonSenha = document.querySelector('.hide-senha');
const valorSenha = document.getElementsByName('senha')


/*Array onde salva o usuário antes de set no localStorage*/
const dadosDaPessoa = JSON.parse(localStorage.getItem('users')) || []
// Dados do usuário sendo transformado de objeto para string


formCadastro.addEventListener('submit', (e) => {
    e.preventDefault()

    buttonCadastrar.disabled = true

    let nome = formCadastro.nome.value
    let email = formCadastro.email.value
    let senha = formCadastro.senha.value

    if (validarEmail(email) == false) {
        notificacao("Seu email não atende o formato correto.", "red")
    }
    else if (validarSenha(senha) == false) {
        notificacao("Sua senha precisa ter no mínimo 8 caracteres: 1 caractere especial, 1 letra minúscula e 1 letra maiúscula.", "red")
    }
    else {
        const dados = {
            "nome": nome,
            "email": email,
            "senha": senha
        }
        verificarUsuario(dados)
    }

})


function verificarUsuario(dados) {
    const user = dadosDaPessoa.find(e => e.email == dados.email)

    if (user) {
        notificacao('Já existe um usuário cadastrado com esse email.', "red")
        return false
    } else {
        salvarDados(dados)
        notificacao("Usuário cadastrado com sucesso.", "green")
        return true
    }
}

function salvarDados(dados) {
    dadosDaPessoa.push(dados)
    localStorage.setItem("users", JSON.stringify(dadosDaPessoa))
}


function notificacao(texto, cor) {
    const div = document.createElement('div')
    const menssagem = document.createElement('p')
    const icon = document.createElement('i')

    menssagem.innerText = texto
    div.appendChild(icon)
    div.appendChild(menssagem)
    div.classList.add('notification')

    if (cor == "green") {
        div.classList.add('notification-green')
        icon.classList.add('fa-solid', 'fa-circle-check', 'alert-icon')
        div.classList.add('show-alert')
    }
    else {
        div.classList.add('notification-red')
        icon.classList.add('fa-solid', 'fa-triangle-exclamation', 'alert-icon')
        div.classList.add('show-alert')
    }

    document.body.appendChild(div)
    setTimeout(function () {
        div.classList.remove('show-alert')
        div.classList.add('hide-alert')
        buttonCadastrar.disabled = false
    }, 3000)


}

/* Visualizar senha */

buttonSenha.addEventListener('click', (e) => {
    const nomeClass = e.target.classList[1]

    switch (nomeClass) {
        case "fa-eye":
            e.target.classList.remove('fa-eye')
            e.target.classList.add('fa-eye-slash')
            valorSenha[0].type = "text"
            break;
        case "fa-eye-slash":
            e.target.classList.remove('fa-eye-slash')
            e.target.classList.add('fa-eye')
            valorSenha[0].type = "password"
            break;

    }

})

/* Validações */

function validarEmail(email) {
    const emailRegex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/
    return emailRegex.test(email)
}

function validarSenha(senha) {
    const senhaRegex = /^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{8,15}$/;
    return senhaRegex.test(senha)
}