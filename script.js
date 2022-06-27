let nome;
let obj;
let mensagem;
let chat = document.querySelector('ul');

function entraUsuario() {
    nome = prompt('Digite seu nome');
    obj = {name: nome}
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', obj)
    promise.then(nomeOK)
    promise.catch(nomeErrado)
}

function nomeOK(nome) {
    console.log('O nome está liberado para uso')
}

function nomeErrado(erro) {
    alert('O nome já está em uso, digite outro')
    window.location.reload()
}

function usuarioAtivo() {
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', obj);
    console.log('oi')
}

function pegaMensagens() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    promise.then(renderizarMensagens)
    promise.catch(erroMensagens)
}

function renderizarMensagens(mensagem) {
    for (let i = 0; i < mensagem.data.length; i++) {
        let tipo = mensagem.data[i].type;
        let horario = mensagem.data[i].time;
        let nome = mensagem.data[i].from;
        let to = mensagem.data[i].to;
        let texto = mensagem.data[i].text;
        let mensagem_texto;
        if (tipo === 'status') {
            mensagem_texto = `<li class='status'><span class='horario'>(${horario})</span> <span class='nome'>${nome}</span> ${texto}</li>`
        } else {
            mensagem_texto = `<li class='normal'><span class='horario'>(${horario})</span> <span class='nome'>${nome}</span> para <span class='nome'>${to}</span>: ${texto}</li>`
        }
        chat.innerHTML += mensagem_texto
        scroll()
    }
}

function scroll() {
    document.querySelector('ul').lastElementChild.scrollIntoView();
}

function erroMensagens(erro) {
    console.log('As mensagens não carregaram')
}

function enviarMensagem() {
    mensagem = document.querySelector('input').value
    mensagem = {from: nome, to: 'Todos', text: mensagem, type: 'message'}
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', mensagem)
}

entraUsuario()
setInterval(usuarioAtivo, 5000)
setInterval(pegaMensagens, 3000)