// VARIÁVEIS DO CARROSSEL
let slideAtual = 0;
const totalSlides = 3;

// FUNÇÃO PARA MUDAR SLIDE
function mudarSlide(direcao) {
    slideAtual += direcao;
    
    if (slideAtual >= totalSlides) {
        slideAtual = 0;
    } else if (slideAtual < 0) {
        slideAtual = totalSlides - 1;
    }
    
    atualizarCarrossel();
}

// FUNÇÃO PARA IR PARA UM SLIDE ESPECÍFICO
function irSlide(index) {
    slideAtual = index;
    atualizarCarrossel();
}

// FUNÇÃO PARA ATUALIZAR O CARROSSEL
function atualizarCarrossel() {
    const imagens = document.querySelector('.imagens');
    const deslocamento = -slideAtual * 100;
    imagens.style.transform = `translateX(${deslocamento}%)`;
    
    // ATUALIZA INDICADORES
    const indicadores = document.querySelectorAll('.indic');
    indicadores.forEach((indic, index) => {
        indic.classList.remove('ativo');
        if (index === slideAtual) {
            indic.classList.add('ativo');
        }
    });
}

// BASE DE DADOS DE ANIMAIS - INFORMAÇÕES CADASTRADAS
let animaisDb = [
    { 
        id: 1, 
        nome: 'Lua', 
        tipo: 'Cão', 
        raca: 'Pinscher', 
        idade: 2, 
        sexo: 'Fêmea', 
        porte: 'Pequeno', 
        descricao: 'Lua é uma cachorrinha doce e carinhosa.', 
        fotos: ['../Ong/Imagens/lua.jpeg', '../Ong/Imagens/lua2.jpeg', '../Ong/Imagens/lua3.jpeg', '../Ong/Imagens/lua4.jpeg'],
        vacinado: true,
        castrado: false
    },
    { 
        id: 2, 
        nome: 'Bolt', 
        tipo: 'Cão', 
        raca: 'Labrador', 
        idade: 3, 
        sexo: 'Macho', 
        porte: 'Grande', 
        descricao: 'Bolt é energético e ama brincar.', 
        fotos: ['../Ong/Imagens/bolt.jpeg', '../Ong/Imagens/bolt2.jpeg', '../Ong/Imagens/bolt3.jpeg', '../Ong/Imagens/bolt4.jpeg'],
        vacinado: true,
        castrado: true
    },
    { 
        id: 3, 
        nome: 'Mel', 
        tipo: 'Gato', 
        raca: 'Siamês', 
        idade: 1, 
        sexo: 'Fêmea', 
        porte: 'Pequeno', 
        descricao: 'Mel é muito calma e gosta de dormir.', 
        fotos: ['../Ong/Imagens/mel.jpeg', '../Ong/Imagens/mel1.jpeg', '../Ong/Imagens/mel3.jpeg', '../Ong/Imagens/mel3.jpeg'],
        vacinado: false,
        castrado: false
    },
    { 
        id: 4, 
        nome: 'Chico', 
        tipo: 'Gato', 
        raca: 'SRD', 
        idade: 4, 
        sexo: 'Macho', 
        porte: 'Pequeno', 
        descricao: 'Chico é um gato muito esperto.', 
        fotos: ['../Ong/Imagens/chico.jpeg', '../Ong/Imagens/chico2.jpeg', '../Ong/Imagens/chico3.jpeg', '../Ong/Imagens/chico4.jpeg'],
        vacinado: true,
        castrado: false
    },
    { 
        id: 5, 
        nome: 'Pipoca', 
        tipo: 'Cachorro', 
        raca: 'SRD', 
        idade: 2, 
        sexo: 'Fêmea', 
        porte: 'Médio', 
        descricao: 'Pipoca é muito agitada e alegre.', 
        fotos: ['../Ong/Imagens/pipoca.jpeg', '../Ong/Imagens/pipoca2.jpeg', '../Ong/Imagens/pipoca3.jpeg', '../Ong/Imagens/pipoca4.jpeg'],
        vacinado: true,
        castrado: true
    },
    { 
        id: 6, 
        nome: 'Mia', 
        tipo: 'Gato', 
        raca: 'Angorá', 
        idade: 5, 
        sexo: 'Fêmea', 
        porte: 'Pequeno', 
        descricao: 'Mia é elegante e adora carinho.', 
        fotos: ['../Ong/Imagens/mia..jpeg', '../Ong/Imagens/mia2.jpeg', '../Ong/Imagens/mia3.jpeg', '../Ong/Imagens/mia4.jpeg'],
        vacinado: true,
        castrado: true
    },
];

const dadosSalvos = localStorage.getItem("animaisDb");

if (dadosSalvos) {
    animaisDb = JSON.parse(dadosSalvos);
}

// VARIÁVEL PARA ARMAZENAR ANIMAL SELECIONADO
let animalSelecionado = null;

// FUNÇÃO PARA TROCAR DE PÁGINA
function irPara(pagina) {
    // Remove a classe ativa de todas as páginas
    const paginas = document.querySelectorAll('.pagina');
    paginas.forEach(p => p.classList.remove('ativa'));
    
    // Tenta encontrar a página selecionada
    const paginaSelecionada = document.getElementById(pagina);
    
    if (paginaSelecionada) {
        // DETETIVE: Verifica se o JS ainda está tropeçando no formulário antigo!
        if (paginaSelecionada.tagName === 'SELECT') {
            alert("ERRO: O navegador ainda está carregando a versão velha do site e achou o select do formulário! Limpe o cache apertando Ctrl + F5.");
            return;
        }
        
        paginaSelecionada.classList.add('ativa');
        
        // Se é a página de meus animais, carrega o grid
        if (pagina === 'meus-animais') {
            carregarMeusAnimais();
        }
        // Se é a página de castração, carrega os pets
        if (pagina === 'castracao') {
            carregarPetsParaCastracao();
            irParaStep1Castracao(); // Força a abrir no primeiro passo
        }
        // Se é a página de agenda, carrega a agenda
        if (pagina === 'agenda') {
            carregarAgenda();
        }
    } else {
        // DETETIVE: Se ele não achar nada com esse ID no HTML
        alert("ERRO CÓDIGO: A página com ID '" + pagina + "' não existe no seu arquivo HTML. Verifique se você não apagou a seção sem querer!");
    }
}

// FUNÇÃO PARA CARREGAR FOTO NO CADASTRO
function carregarFoto(event) {
    const arquivo = event.target.files[0];
    if (arquivo) {
        const leitor = new FileReader();
        leitor.onload = function(e) {
            const areaFoto = document.getElementById('areaFoto');
            areaFoto.innerHTML = `<img src="${e.target.result}" alt="Foto do animal">`;
        };
        leitor.readAsDataURL(arquivo);
    }
}

// FUNÇÃO PARA ENVIAR CADASTRO
function enviarCadastro() {
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const tipo = document.getElementById('tipo').value;
    const raca = document.getElementById('raca').value;
    const sexo = document.querySelector('input[name="sexo"]:checked')?.value;
    const porte = document.querySelector('input[name="porte"]:checked')?.value;
    const descricao = document.getElementById('descricao').value;
    const vacinacao = document.getElementById('vacinacao').value;
    const castracao = document.getElementById('statusCastracao').value;
   
    // VALIDAÇÃO
    if (!nome || !idade || tipo === 'Selecione...' || !raca || !sexo || !porte || !descricao || vacinacao === 'Selecione o status' || castracao === 'Selecione o status') {
        alert('⚠️ Preencha todos os campos obrigatórios!');
        return;
    }
    
    // CRIA NOVO ANIMAL
    const novoAnimal = {
        id: Date.now(),
        nome: nome,
        tipo: tipo,
        raca: raca,
        idade: parseInt(idade),
        sexo: sexo,
        porte: porte,
        descricao: descricao,
        vacinado: vacinacao === 'Vacinado',
        castrado: castracao === 'Castrado',
        fotos: [tipo === 'Cão' ? '🐕' : '🐱']
    };
    
    // ADICIONA À BASE DE DADOS 
    animaisDb.push(novoAnimal);

    salvarDados();
    
    // LIMPA O FORMULÁRIO
    document.getElementById('nome').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('tipo').value = 'Selecione...';
    document.getElementById('raca').value = '';
    document.querySelectorAll('input[name="sexo"]').forEach(r => r.checked = false);
    document.querySelectorAll('input[name="porte"]').forEach(r => r.checked = false);
    document.getElementById('descricao').value = '';
    document.getElementById('vacinacao').value = 'Selecione o status';
    document.getElementById('statusCastracao').value = 'Selecione o status';
    document.getElementById('areaFoto').innerHTML = '<span>Clique para adicionar foto</span>';
    
    // VAI PARA A PÁGINA DE CONFIRMAÇÃO
    irPara('confirmacao');
}

// FUNÇÃO AUXILIAR PARA RENDERIZAR FOTO (EMOJI OU IMAGEM)
function obterFotoHTML(foto) {
    // Verifica se é um emoji
    const isEmoji = /\p{Emoji}/u.test(foto) && foto.length <= 4;
    if (isEmoji) {
        return `<div style="font-size: 80px; display: flex; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%);">${foto}</div>`;
    }
    // Se for URL/caminho de imagem
    return `<img src="${foto}" alt="Foto do animal" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.parentElement.innerHTML='<div style=\\'font-size: 80px; display: flex; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%);\\'>🐾</div>'">`;
}

// FUNÇÃO PARA MONTAR O CARROSSEL DE FOTOS DOS DETALHES
function montarCarrosselDetalhes(fotos, animalId) {
    const slides = fotos.map(foto => `
        <div class="slideDetalhe">
            ${obterFotoHTML(foto)}
        </div>
    `).join('');

    const indicadores = fotos.map((_, i) => `
        <span class="indicDetalhe ${i === 0 ? 'ativo' : ''}" onclick="irSlideDetalhe(${i}, ${animalId})"></span>
    `).join('');

    return `
        <div class="carrosselDetalhe" id="carrosselDetalhe-${animalId}">
            <div class="slidesDetalhe" id="slidesDetalhe-${animalId}">
                ${slides}
            </div>
            ${fotos.length > 1 ? `
                <button class="setaDetalhe esqDetalhe" onclick="mudarSlideDetalhe(-1, ${animalId}, ${fotos.length})">‹</button>
                <button class="setaDetalhe dirDetalhe" onclick="mudarSlideDetalhe(1, ${animalId}, ${fotos.length})">›</button>
                <div class="indicadoresDetalhe">
                    ${indicadores}
                </div>
            ` : ''}
        </div>
    `;
}

// CONTROLES DO CARROSSEL DE DETALHES
const slideDetalheAtual = {};

function mudarSlideDetalhe(direcao, animalId, total) {
    if (slideDetalheAtual[animalId] === undefined) slideDetalheAtual[animalId] = 0;
    slideDetalheAtual[animalId] += direcao;
    if (slideDetalheAtual[animalId] >= total) slideDetalheAtual[animalId] = 0;
    if (slideDetalheAtual[animalId] < 0) slideDetalheAtual[animalId] = total - 1;
    atualizarCarrosselDetalhe(animalId, total);
}

function irSlideDetalhe(index, animalId) {
    const total = document.querySelectorAll(`#carrosselDetalhe-${animalId} .slideDetalhe`).length;
    slideDetalheAtual[animalId] = index;
    atualizarCarrosselDetalhe(animalId, total);
}

function atualizarCarrosselDetalhe(animalId, total) {
    const idx = slideDetalheAtual[animalId] || 0;
    const faixa = document.getElementById(`slidesDetalhe-${animalId}`);
    if (faixa) faixa.style.transform = `translateX(${-idx * 100}%)`;

    const indicadores = document.querySelectorAll(`#carrosselDetalhe-${animalId} .indicDetalhe`);
    indicadores.forEach((el, i) => {
        el.classList.toggle('ativo', i === idx);
    });
}

// FUNÇÃO PARA CARREGAR MEUS ANIMAIS
function carregarMeusAnimais(){
    const grid = document.getElementById('gridAnimais');
    grid.innerHTML = '';
    animaisDb.forEach((animal,index) => {
        const primeiraFoto = Array.isArray(animal.fotos) ? animal.fotos[0] : (animal.foto || '🐾');
        const fotoHTML = obterFotoHTML(primeiraFoto);
        grid.innerHTML += `
            <div class="cardGrid" onclick="abrirDetalhesAnimal(${animal.id})">
                <div class="fotoGrid">
                    ${fotoHTML}
                </div>
                <div class="nomeGrid">
                    <h3>${animal.nome}</h3>
                    <p>${animal.raca}</p>
                </div>
                <button class="botaoGrid">
                    Ver Detalhes
                </button>

                <button
                    onclick="event.stopPropagation();editarAnimal(${index})">
                     Editar
                </button>

                <button
                    onclick="event.stopPropagation();excluirAnimal(${index})">
                     Excluir
                </button>
            </div>
        `;
    });
}
function alternarToggle(btn) {
    btn.classList.toggle('on');
}


// FUNÇÃO PARA ABRIR DETALHES DO ANIMAL (RENOMEADA PARA EVITAR CONFLITO)
function abrirDetalhesAnimal(id){
    const animal = animaisDb.find(a => a.id == id);
    if (!animal) return;
    
    const area = document.getElementById('cardDetalhes');

    // Suporte a fotos (array) ou foto (string legada)
    const fotos = Array.isArray(animal.fotos) ? animal.fotos : [animal.foto || '🐾'];

    // Reseta slide para este animal
    slideDetalheAtual[id] = 0;
    
    const statusVacinacao = animal.vacinado ? '✅ Vacinado' : '❌ Não vacinado';
    const statusCastracao = animal.castrado ? '✅ Castrado' : '❌ Não castrado';

    area.innerHTML = `
        <div class="fotoDetalhes">
            ${montarCarrosselDetalhes(fotos, id)}
        </div>
        <div class="infoDetalhes">
            <h2>${animal.nome}</h2>
            <p><strong>Tipo:</strong> ${animal.tipo}</p>
            <p><strong>Raça:</strong> ${animal.raca}</p>
            <p><strong>Idade:</strong> ${animal.idade} anos</p>
            <p><strong>Sexo:</strong> ${animal.sexo}</p>
            <p><strong>Porte:</strong> ${animal.porte}</p>
            <p><strong>Vacinação:</strong> ${statusVacinacao}</p>
            <p><strong>Castração:</strong> ${statusCastracao}</p>
            <div class="descricao">${animal.descricao}</div>
        </div>
    `;
    irPara('detalhes');
}

// FUNÇÃO PARA ABRIR DETALHES DE PARCEIROS
function abrirDetalhes(parceiro) {
    alert('Mais informações sobre: ' + parceiro);
}

// FUNÇÃO AUXILIAR PARA ALERTA DE INDISPONÍVEL
function indisponivel() {
    alert('Esta funcionalidade ainda não está disponível.');
}

// ========= CASTRAÇÃO =========
function carregarPetsParaCastracao() {
    const select = document.getElementById('petCastracaoSelecionado');
    if (!select) return;
    select.innerHTML = '<option value="">Selecione seu pet...</option>';
    animaisDb.forEach(animal => {
        const option = document.createElement('option');
        option.value = animal.id;
        option.textContent = `${animal.nome} (${animal.tipo}, ${animal.sexo})`;
        select.appendChild(option);
    });
}

function irParaStep1Castracao() {
    document.querySelectorAll('.castracao-step').forEach(s => s.classList.remove('ativo'));
    document.getElementById('castracaoStep1').classList.add('ativo');
    window.scrollTo(0, 0);
}

function irParaStep2Castracao() {
    document.querySelectorAll('.castracao-step').forEach(s => s.classList.remove('ativo'));
    document.getElementById('castracaoStep2').classList.add('ativo');
    carregarPetsParaCastracao();
    window.scrollTo(0, 0);
}

function irParaStep3Castracao() {
    const nome = document.getElementById('tutorNome').value;
    const email = document.getElementById('tutorEmail').value;
    const telefone = document.getElementById('tutorTelefone').value;
    const pet = document.getElementById('petCastracaoSelecionado').value;

    if (!nome || !email || !telefone || !pet) {
        alert('⚠️ Preencha todos os campos obrigatórios!');
        return;
    }

    document.querySelectorAll('.castracao-step').forEach(s => s.classList.remove('ativo'));
    document.getElementById('castracaoStep3').classList.add('ativo');
    renderizarCalendarioCastracao();
    window.scrollTo(0, 0);
}

function renderizarCalendarioCastracao() {
    const container = document.getElementById('calendarioCastracao');
    if (!container) return;

    const hoje = new Date();
    const mes = hoje.getMonth();
    const ano = hoje.getFullYear();
    
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    
    const primeiro = new Date(ano, mes, 1);
    const ultimo = new Date(ano, mes + 1, 0);
    const diasMes = ultimo.getDate();
    const inicioSemana = primeiro.getDay();
    
    let html = `<h4>${meses[mes]} ${ano}</h4>`;
    html += '<div class="dias-semana">';
    diasSemana.forEach(dia => {
        html += `<div class="dia-semana-label">${dia}</div>`;
    });
    html += '</div><div class="dias-grid">';
    
    for (let i = 0; i < inicioSemana; i++) {
        html += '<div class="dia-vazio"></div>';
    }
    
    for (let dia = 1; dia <= diasMes; dia++) {
        const diaDate = new Date(ano, mes, dia);
        const ehPassado = diaDate < new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
        html += `<div class="dia-calendario ${ehPassado ? 'passado' : ''}" onclick="selecionarDataCastracao(event)"">${dia}</div>`;
    }
    
    html += '</div>';
    container.innerHTML = html;
}

function selecionarDataCastracao(event) {
    const dias = document.querySelectorAll('.dia-calendario:not(.passado)');
    dias.forEach(d => d.classList.remove('selecionado'));
    event.target.classList.add('selecionado'); // Agora o 'event' existe e não vai dar erro!
}

function finalizarAgendamentoCastracao() {
    const periodo = document.querySelector('input[name="periodoCastracao"]:checked')?.value;
    const duracao = document.querySelector('input[name="duracao"]:checked')?.value;
    const dataSelecionada = document.querySelector('.dia-calendario.selecionado');

    if (!periodo || !duracao || !dataSelecionada) {
        alert('⚠️ Selecione a data, período e duração!');
        return;
    }

    const codigoAgendamento = 'CAD' + new Date().getFullYear() + String(Math.random()).slice(2, 9);
    document.getElementById('codigoAgendamento').textContent = codigoAgendamento + '📋';

    // Adicionar o evento à agenda
    const pet = document.getElementById('petCastracaoSelecionado');
    const animal = animaisDb.find(a => a.id == pet.value);
    const novoEvento = {
        id: agendaEventos.length + 1,
        titulo: `Castração do(a) ${animal.nome}`,
        tipo: 'castracao',
        data: new Date().toISOString().split('T')[0],
        hora: '09:00',
        local: 'Clínica Veterinária Pet Care'
    };
    agendaEventos.push(novoEvento);

    document.querySelectorAll('.castracao-step').forEach(s => s.classList.remove('ativo'));
    document.getElementById('castracaoStep4').classList.add('ativo');
    window.scrollTo(0, 0);
}

// ========= AGENDA =========
let agendaEventos = [
    { id: 1, titulo: 'Adoção do Chico', tipo: 'adocao', data: '2026-06-15', hora: '14:30', local: 'Arca - Matriz' },
    { id: 2, titulo: 'Castração da Pipoca', tipo: 'castracao', data: '2026-06-20', hora: '09:00', local: 'Clínica Veterinária Pet Care' },
    { id: 3, titulo: 'Consulta de Rotina - Bolt', tipo: 'consulta', data: '2026-06-10', hora: '10:00', local: 'Veterinária Amiga' },
    { id: 4, titulo: 'Castração da Lua', tipo: 'castracao', data: '2026-06-25', hora: '08:30', local: 'Clínica Veterinária Pet Care' },
];

function carregarAgenda() {
    const hoje = new Date();
    const mesAtual = String(hoje.getMonth() + 1).padStart(2, '0');
    const anoAtual = hoje.getFullYear();
    
    renderizarCalendarioMini(anoAtual, parseInt(mesAtual));
    renderizarEventosAgenda('todos');
}

function renderizarCalendarioMini(ano, mes) {
    const container = document.getElementById('calendarioMini');
    if (!container) return;
    
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    
    const primeiro = new Date(ano, mes - 1, 1);
    const ultimo = new Date(ano, mes, 0);
    const diasMes = ultimo.getDate();
    const inicioSemana = primeiro.getDay();
    
    let html = `<div class="calendario"><h4>${meses[mes - 1]} ${ano}</h4>`;
    
    diasSemana.forEach(dia => {
        html += `<div class="dia-semana">${dia}</div>`;
    });
    
    for (let i = 0; i < inicioSemana; i++) {
        html += '<div class="dia vazio"></div>';
    }
    
    for (let dia = 1; dia <= diasMes; dia++) {
        const dataStr = `${ano}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
        const temEvento = agendaEventos.some(e => e.data === dataStr);
        html += `<div class="dia ${temEvento ? 'com-evento' : ''}">${dia}</div>`;
    }
    
    html += '</div>';
    container.innerHTML = html;
}

function renderizarEventosAgenda(tipo) {
    const container = document.getElementById('agendaEventos');
    if (!container) return;
    
    let eventos = agendaEventos;
    
    if (tipo !== 'todos') {
        eventos = agendaEventos.filter(e => e.tipo === tipo);
    }
    
    if (eventos.length === 0) {
        container.innerHTML = '<div class="sem-eventos">Nenhum evento agendado</div>';
        return;
    }
    
    const icones = { adocao: '🐾', castracao: '🩺', consulta: '🏥' };
    
    let html = '';
    eventos.forEach(evento => {
        const data = new Date(evento.data);
        const dataFormatada = data.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        
        html += `
            <div class="evento-card">
                <div class="evento-dia">
                    <span class="evento-icone">${icones[evento.tipo]}</span>
                    <span class="evento-data">${dataFormatada}</span>
                </div>
                <div class="evento-info">
                    <h4>${evento.titulo}</h4>
                    <p>⏰ ${evento.hora}</p>
                    <p>📍 ${evento.local}</p>
                </div>
                <button class="evento-btn" onclick="alert('Detalhes do agendamento para ${evento.titulo}')">Ver +</button>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function filtrarAgenda(tipo) {
    document.querySelectorAll('.filtro-btn').forEach(btn => btn.classList.remove('ativo'));
    event.target.classList.add('ativo');
    renderizarEventosAgenda(tipo);
}

// ========= FAQ =========
function abrirFaq(element) {
    const resposta = element.nextElementSibling;
    const item = element.parentElement;
    
    const abertoOutro = document.querySelector('.faq-item.aberto');
    if (abertoOutro && abertoOutro !== item) {
        abertoOutro.classList.remove('aberto');
    }
    
    item.classList.toggle('aberto');
}

function filtrarFaq() {
    const busca = document.getElementById('faqSearch').value.toLowerCase();
    const items = document.querySelectorAll('.faq-item');
    
    items.forEach(item => {
        const titulo = item.querySelector('.faq-titulo').textContent.toLowerCase();
        const resposta = item.querySelector('.faq-resposta').textContent.toLowerCase();
        
        if (titulo.includes(busca) || resposta.includes(busca)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// INICIALIZA A PÁGINA
document.addEventListener('DOMContentLoaded', function() {
    irPara('inicio');
    
    // Inicializa as abas de solicitações
    const abas = document.querySelectorAll('.aba');
    const grupos = document.querySelectorAll('.grupo');

    abas.forEach((aba) => {
        aba.addEventListener('click', () => {
            abas.forEach((item) => {
                item.classList.remove('ativa');
            });

            aba.classList.add('ativa');

            const tipo = aba.dataset.tipo;

            grupos.forEach((grupo) => {
                if(tipo === 'todos'){
                    grupo.style.display = 'block';
                }
                else{
                    if(grupo.dataset.tipo === tipo){
                        grupo.style.display = 'block';
                    }
                    else{
                        grupo.style.display = 'none';
                    }
                }
            });
        });
    });
});

document.querySelectorAll('.check-item').forEach(item => {
    item.addEventListener('click', function(e) {
        // Evita que clique duas vezes se clicar direto no texto
        e.preventDefault(); 
        
        const icone = this.querySelector('.check-icon');
        if (icone.textContent === '☐') {
            icone.textContent = '☑';
            icone.style.color = 'var(--verde-botao)'; // Fica verde quando marca
        } else {
            icone.textContent = '☐';
            icone.style.color = 'var(--verde-escuro)'; // Volta a cor original
        }
    });
});

function excluirAnimal(index){

    animaisDb.splice(index,1);

    salvarDados();

    carregarMeusAnimais();

    alert("Animal excluído!");
}

function editarAnimal(index){

    let novoNome = prompt(
        "Digite o novo nome:",
        animaisDb[index].nome
    );

    if(novoNome){

        animaisDb[index].nome = novoNome;

        salvarDados();

        carregarMeusAnimais();

        alert("Animal atualizado!");
    }
}

function salvarDados() {
    localStorage.setItem(
        "animaisDb",
        JSON.stringify(animaisDb)
    );
}