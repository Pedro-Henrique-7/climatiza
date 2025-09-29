'use strict'

const API_KEY = '7db57ac09fad4f669e4170726252909'
const URL_BASE = 'http://api.weatherapi.com/v1'

const urlParams = new URLSearchParams()

const btnLoc = document.getElementById('local')
btnLoc.addEventListener('click',pegarLocalizacao) 

function pegarLocalizacao()
{
    if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(armazenarLocalizacao)
       
    }  
}

function armazenarLocalizacao(position){

    let latitude = position.coords.latitude
    let longitude = position.coords.longitude

    let urlParamLongitudeLatitude = `${latitude},${longitude}`

    buscarClimaAtual(urlParamLongitudeLatitude)


}

async function buscarClimaAtual (localizacao) {
    urlParams.append('q', localizacao)
    urlParams.append('key', API_KEY)

    const urlBase = `${URL_BASE}/current.json`
    const fetchUrl = `${urlBase}?${urlParams.toString()}`
    const response = await fetch(fetchUrl)
    const dados = await response.json()
}

// buscarClimaAtual('London')



