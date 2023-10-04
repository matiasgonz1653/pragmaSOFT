const serie = require('../../series.json')
const { Serie } = require('../db');

const loaderSeries = async () => { 
    try {
        serie.forEach(async (s) => {
            console.log("serie ",s)
            await Serie.findOrCreate({
                where: {
                    name: s.name,
                    description: s.description,
                    date: s.date,
                    stars: s.stars,
                    gender: s.gender,
                    price: s.price,
                    atp: s.atp,
                    state: s.state
                },
            });
        });
        console.log('Series cargados en la DB')
    }
    catch (error) {
        console.log('Error en la carga de Series a la DB')
    }
}

module.exports = {
    loaderSeries
}