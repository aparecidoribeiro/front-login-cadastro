const formLogin = document.querySelector('.form-login');
const buttonLogin = document.querySelector('#login');
const buttonSenha = document.querySelector('.hide-senha');
const valorSenha = document.getElementsByName('senha')

const dadosDaPessoa = JSON.parse(localStorage.getItem('users')) || []

formLogin.addEventListener('submit', (e) => {
    e.preventDefault()

    buttonLogin.disabled = true

    let email = formLogin.email
    let senha = formLogin.senha

    const dados = {
        "email": email.value,
        "senha": senha.value
    }

    verificarUsuario(dados)
    zerarInputs(email, senha)

})

function zerarInputs(email, senha) {
    email.value = ''
    senha.value = ''
}

async function verificarUsuario(dados) {
    const user = await dadosDaPessoa.find(e => e.email == dados.email)

    if (user == null) {
        notificacao("Não foi encontrado nenhum usuário com esse email.", "red")
    }
    else {
        if (user.senha == dados.senha) {
            notificacao(`Seja bem vindo(a) ${user.nome}`, "green")
        } else {
            notificacao("Email ou senha incorreta, tente novamente.", "red")
        }
    }

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
        buttonLogin.disabled = false
    }, 3000)


}

/* Visualizar senha */

buttonSenha.addEventListener('click', (e) => {
    const nomeClass = e.target.classList[1]

    console.log(e.target.classList)

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

