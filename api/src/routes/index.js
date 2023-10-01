const { Router } = require("express");
const { Serie } = require("../db");
const { getAllSeries, getDetailsSeries} = require("../controller/series");
const router = Router();


router.get("/series", async function (req, res) {
    const { name } = req.query;
    const seriesTotal = await getAllSeries();

    if (name) {
        const serieName = seriesTotal.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
        serieName.length ? res.status(200).send(serieName) : res.status(400).send("no se encontro la serie");
    } else {
        res.status(200).send(seriesTotal);
    }
})


router.get("/series/:id", async (req, res) => {
    const { id } = req.params;
    const allSerie = await getDetailsSeries();

    if (id) {
        let serieId = await allSerie.filter((obj) => obj.id == id);
        serieId.length
        ? res.status(200).send(serieId)
        : res.status(404).send("Serie no encontrada");
    }
});

router.post("/serie", async (req, res) => {
    let {
        name,
        description,
        date,
        stars,
        gender,
        price,
        atp,
        state,
    } = req.body;

    await Serie.create({
        name,
        description,
        date,
        stars,
        gender,
        price,
        atp,
        state,
        createdAtDb,
    });
    });

    
    res.status(200).send("Serie creada! :D");

module.exports = router;
