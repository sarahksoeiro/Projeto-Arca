let map;
let marker;

// Inicializa mapa
function iniciarMapa(lat, lng){

    map = L.map('map').setView([lat, lng], 15);

    // Camada do mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Marker inicial
    marker = L.marker([lat, lng], {
        draggable: true
    }).addTo(map);

    // Buscar endereço inicial
    buscarEndereco(lat, lng);

    // Quando mover pin
    marker.on('dragend', function(e){

        const pos = marker.getLatLng();

        buscarEndereco(pos.lat, pos.lng);
    });

    // Clique no mapa
    map.on('click', function(e){

        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        marker.setLatLng([lat, lng]);

        buscarEndereco(lat, lng);
    });
}

// Buscar endereço pelas coordenadas
async function buscarEndereco(lat, lng){

    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

    try{

        const response = await fetch(url);

        const data = await response.json();

        console.log(data);

        document.getElementById('cep').value =
            data.address.postcode || '';

        document.getElementById('bairro').value =
            data.address.suburb || data.address.neighbourhood || '';

        document.getElementById('rua').value =
            data.address.road || '';

        document.getElementById('numero').value =
            data.address.house_number || '';

    }catch(error){

        console.log("Erro ao buscar endereço");
    }
}

// Pega localização da pessoa
navigator.geolocation.getCurrentPosition(

    (position) => {

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        iniciarMapa(lat, lng);
    },

    () => {

        // fallback Serra ES
        iniciarMapa(-20.1286, -40.3078);
    }
);




//CAROSSEL DE NOTÍCIAS






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