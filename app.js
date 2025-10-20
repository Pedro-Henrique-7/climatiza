'use strict'

const API_KEY = '2b79b176f76e46fa995161109252010'
const URL_BASE = 'http://api.weatherapi.com/v1'

const urlParams = new URLSearchParams()
const btnLoc = document.getElementById('local')
btnLoc.addEventListener('click',pegarLocalizacao)


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

  
   mostrarDadosLocAtual(urlParamLongitudeLatitude)

}

async function buscarClimaLocAtual (localizacao) {
    urlParams.append('q', localizacao)
    urlParams.append('key', API_KEY)

    const urlBase = `${URL_BASE}/current.json`
    const fetchUrl = `${urlBase}?aqi=yes&${urlParams.toString()}`
    const response = await fetch(fetchUrl)
    const dados = await response.json()
    return dados
}

async function mostrarDadosLocAtual (localizacao){

    const loc = await buscarClimaLocAtual(localizacao)
    const cardTemp = document.getElementById('card')

    let icon = document.createElement('img')
    const cardMinMax = document.getElementById('card-min-max')
    const cardQualidade = document.getElementById('card-qualidade')
    let temperatura = document.createElement('h3')
    let cidade = document.createElement('h2')
    let min = document.createElement('h2')
    let max = document.createElement('h2')
    let qualidade = document.createElement('h3')
    cidade.textContent = loc['location'].name
    card.appendChild(cidade)

    temperatura.textContent = loc['current'].temp_c
    cardTemp.appendChild(temperatura)

    icon.src = loc['current'].condition.icon
    cardTemp.appendChild(icon)    
    qualidade.textContent = loc.current.air_quality["us-epa-index"]

    cardQualidade.appendChild(qualidade)
}
