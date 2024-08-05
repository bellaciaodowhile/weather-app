/* eslint-disable no-unreachable */
const API_KEY = 'fc42f7d699209e725ca5d94b9f9f50f7';
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;
const textCapitalize = (text) => {
    if (text.length > 0) {
        return text.trim().split(' ').map(word => word.at(0).toUpperCase() + word.slice(1, word.length)).join(' ');
    }
}
const diff = (temp) => {
    const numbers = String(parseInt(temp - 273.15)).split('').map(el => `<span class="number">${el}</span>`);
    const res = numbers.join('');
    return res;
}
const getMode = (icon) => {
    return icon.includes('d') ? 'day' : 'night';
}
const getDescription = (description) => {
    switch (description) {
        case 'clear sky':
            return 'cielo limpio';
        case 'few clouds':
            return 'pocas nubes';
        case 'scattered clouds':
            return 'nubes dispersas';
        case 'broken clouds':
            return 'nubes rotas';
        case 'shower rain':
            return 'aguacero'
        case 'rain':
            return 'lluvia';
        case 'thunderstorm':
            return 'tormenta';
        case 'snow':
            return 'nieve';
        case 'mist':
            return 'neblina';
        default:
            return description;
    }
}

const timeAnimation = (before, after) => {
    if (before == '') return
    if (before != after) {
        const timeImg = document.querySelector('.time__img');
        timeImg.classList.add('time__img--out')
        setTimeout(() => {
            timeImg.classList.remove('time__img--out')
            timeImg.classList.add('time__img--in')
        }, 1000);
        return true;
    }

    
}

export {
    API_KEY,
    BASE_URL,
    textCapitalize,
    diff,
    getMode,
    getDescription,
    timeAnimation
}