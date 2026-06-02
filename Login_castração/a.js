let usuarios = [];
let ongs = [];

function carregarDados() {
    let u = localStorage.getItem('usuarios_arca');
    if (u) usuarios = JSON.parse(u);
    let o = localStorage.getItem('ongs_arca');
    if (o) ongs = JSON.parse(o);
}
function salvarDados() {
    localStorage.setItem('usuarios_arca', JSON.stringify(usuarios));
    localStorage.setItem('ongs_arca', JSON.stringify(ongs));
}
function gerarProtocolo() {
    let ano = new Date().getFullYear();
    let letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let l1 = letras[Math.floor(Math.random() * letras.length)];
    let l2 = letras[Math.floor(Math.random() * letras.length)];
    let num = Math.floor(Math.random() * 9000) + 1000;
    return `${ano}${l1}${l2}${num}`;
}

document.addEventListener('DOMContentLoaded', function() {
    carregarDados();

   let btnLogin = document.getElementById('btnLogin');

if (btnLogin) {
    btnLogin.addEventListener('click', function () {

        let usuario = document.getElementById('loginDoc').value.trim();
        let senha = document.getElementById('loginSenha').value;

        if (usuario === 'tutor' && senha === '123456') {
            window.location.href = 'painel-tutor.html';
        }

        else if (usuario === 'candidato' && senha === 'cand!098') {
            window.location.href = 'painel-candidato.html';
        }

        else if (usuario === 'ong' && senha === 'ong$-135') {
            window.location.href = '../Ong/index.html';
        }

        else if (usuario === 'prefeitura' && senha === 'pref@456') {
            window.location.href = '../ADM_denúncias/admHome.html';
        }

        else {
            alert('Usuário ou senha inválidos');
        }
    });
}

    let btnCadPessoa = document.getElementById('btnCadPessoa');
    if (btnCadPessoa) {
        btnCadPessoa.addEventListener('click', function() {
            let nome = document.getElementById('nomePessoa').value.trim();
            let cpf = document.getElementById('cpfPessoa').value.trim();
            let senha = document.getElementById('senhaPessoa').value;
            if (!nome || !cpf || !senha) {
                alert('Preencha todos os campos');
                return;
            }
            if (usuarios.find(u => u.cpf === cpf)) {
                alert('CPF já cadastrado');
                return;
            }
            usuarios.push({ nome, cpf, senha });
            salvarDados();
            alert('Cadastro realizado! Faça login.');
            window.location.href = '..Login_castração/login.html';
        });
    }

    let btnCadONG = document.getElementById('btnCadONG');
    if (btnCadONG) {
        btnCadONG.addEventListener('click', function() {
            let nome = document.getElementById('nomeONG').value.trim();
            let cnpj = document.getElementById('cnpjONG').value.trim();
            let responsavel = document.getElementById('respONG').value.trim();
            let email = document.getElementById('emailONG').value.trim();
            let senha = document.getElementById('senhaONG').value;
            if (!nome || !cnpj || !responsavel || !email || !senha) {
                alert('Preencha todos os campos');
                return;
            }
            if (ongs.find(o => o.cnpj === cnpj)) {
                alert('CNPJ já cadastrado');
                return;
            }
            ongs.push({ nome, cnpj, responsavel, email, senha });
            salvarDados();
            alert('ONG cadastrada! Faça login.');
            window.location.href = '../Login_castração/login.html';
        });
    }

    let btnContinuar = document.getElementById('btnContinuarCastracao');
    if (btnContinuar) {
        btnContinuar.addEventListener('click', function() {
            let tutor = {
                nome: document.getElementById('tutorNome').value,
                cpf: document.getElementById('tutorCpf').value,
                rg: document.getElementById('tutorRg').value,
                nasc: document.getElementById('tutorNasc').value,
                tel: document.getElementById('tutorTel').value,
                email: document.getElementById('tutorEmail').value
            };
            let pet = {
                nome: document.getElementById('petNome').value,
                idade: document.getElementById('petIdade').value,
                especie: document.getElementById('petEspecie').value,
                sexo: document.getElementById('petSexo').value
            };
            sessionStorage.setItem('dadosCastracao', JSON.stringify({ tutor, pet }));
            window.location.href = '../Login_castração/castracao-agendamento.html';
        });
    }

    let btnConfirmar = document.getElementById('btnConfirmarAgendamento');
    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', function() {
            let termos = document.getElementById('termos');
            if (!termos || !termos.checked) {
                alert('Você deve concordar com os Termos para continuar.');
                return;
            }

            let data = document.getElementById('dataAgenda').value;
            let horario = document.getElementById('horarioAgenda').value;
            if (!data || !horario) {
                alert('Selecione data e horário');
                return;
            }
            let dados = JSON.parse(sessionStorage.getItem('dadosCastracao') || '{}');
            let agendamentos = JSON.parse(localStorage.getItem('agendamentos_arca') || '[]');
            agendamentos.push({
                id: Date.now(),
                data: data,
                horario: horario,
                tutor: dados.tutor || { nome: 'Não informado' },
                pet: dados.pet || { nome: 'Não informado' }
            });
            localStorage.setItem('agendamentos_arca', JSON.stringify(agendamentos));
            window.location.href = '../Login_castração/castracao-finalizado.html';
        });
    }

    if (window.location.pathname.includes('../Login_castração/castracao-finalizado.html')) {
        let span = document.getElementById('protocolo');
        if (span) span.innerText = gerarProtocolo();
    }
});