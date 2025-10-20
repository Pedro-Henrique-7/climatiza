'use strict'

const API_KEY = '2b79b176f76e46fa995161109252010'
const URL_BASE = 'http://api.weatherapi.com/v1'
const GOOD_AIQ =    'A qualidade do ar é considerada excelente'
const MODERATED_AIQ = 'A qualidade do ar é moderada'
const UNHEALTHY_SENSITIVE_AIQ = 'A qualidade do ar começa a se deteriorar. Pessoas com asma, doenças cardíacas, idosos e crianças podem apresentar sintomas como tosse, irritação nos olhos e falta de ar'
const UNHEALTHY_AIQ = 'A qualidade do ar está ruim para toda a população.'
const VERY_UNHEALTHY_AIQ ='Este nível representa uma situação de alerta de saúde.'
const HARD_AIQ = 'A qualidade do ar está em níveis de emergência. Toda a população corre riscos graves à saúde.'


const btnLoc = document.getElementById('local')
btnLoc.addEventListener('click',pegarLocalizacao)

const btnSearch = document.getElementById('lupa')

btnSearch.addEventListener('click', buscarClimaPesquisa)
//função que pega a localização atual e envia como parametro na função armazenarLocalizacao
function pegarLocalizacao(){
    if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(armazenarLocalizacao)

    }  
}

//função que armazena a latitude e longitudo e concatena e envia como parametro da função buscarClimaAtual
function armazenarLocalizacao(position){
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude

    let urlParamLongitudeLatitude = `${latitude},${longitude}`


    mostrarDadosLoc(urlParamLongitudeLatitude)
   
}

async function buscarClima(localizacao) {

    let urlParams = new URLSearchParams()
    urlParams.append('q', localizacao)
    urlParams.append('key', API_KEY)

    let urlBase = `${URL_BASE}/current.json`
    let fetchUrl = `${urlBase}?aqi=yes&${urlParams.toString()}`
    let response = await fetch(fetchUrl)
    let dados = await response.json()
    return dados
}

async function mostrarDadosLoc(localizacao){

    

    const loc = await buscarClima(localizacao)
    const cardTemp = document.getElementById('card')
    const cardQualidade = document.getElementById('card-qualidade')
    const cardTermal = document.getElementById('termal-sensation')
    
    cardTemp.replaceChildren()
    cardTermal.replaceChildren()
    cardQualidade.replaceChildren()

    let termal = document.createElement('h2')
    let termalTitle = document.createElement('h1')
    termalTitle.textContent = 'Sensação Termica'
    termal.textContent = loc['current'].feelslike_c

    cardTermal.appendChild(termalTitle)
    cardTermal.appendChild(termal)

    let icon = document.createElement('img')
    icon.src = loc['current'].condition.icon
    cardTemp.appendChild(icon)   

    let temperatura = document.createElement('h3')
    temperatura.textContent = loc['current'].temp_c
    cardTemp.appendChild(temperatura)


    let cidade = document.createElement('h2')
    cidade.textContent = loc['location'].name
    card.appendChild(cidade)


    let qualidade = document.createElement('h3')
    let qualidadeDesc = document.createElement('p') 
    let img = document.createElement('img')
    img.src = '/assets/qualidadedoaricon.png'

    qualidade.textContent = loc.current.air_quality["us-epa-index"]

    
    if(loc.current.air_quality['us-epa-index'] = 1){
        qualidadeDesc.textContent = GOOD_AIQ
    } else if (loc.current.air_quality['us-epa-index'] = 2){
        qualidadeDesc.textContent =  MODERATED_AIQ
    }else if (loc.current.air_quality['us-epa-index'] = 3){
        qualidadeDesc.textContent = UNHEALTHY_SENSITIVE_AIQ
    }else if(loc.current.air_quality['us-epa-index'] = 4){
        qualidadeDesc.textContent = UNHEALTHY_AIQ
    }else if(loc.current.air_quality['us-epa-index'] = 5){
        qualidadeDesc.textContent = VERY_UNHEALTHY_AIQ
    }else{
        qualidadeDesc.textContent = HARD_AIQ
    }

    cardQualidade.appendChild(qualidade)
    cardQualidade.appendChild(qualidadeDesc)
    cardQualidade.appendChild(img)


}

async function buscarClimaPesquisa() {

    let loc = document.getElementById('search').value

    mostrarDadosLoc(loc)
}

