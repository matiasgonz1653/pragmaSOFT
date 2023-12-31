const { Router } = require("express");
const router = Router();
const { 
    getAllSeries, 
    getDetailsSeries, 
    updSerie,
    createSerie,
    deleteSerie } = require("../controller/series");

//obtener todas las series
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

//obtener la serie por el id ingresado
router.get("/series/:id", async (req, res) => {
    const { id } = req.params;
    console.log("id de param",id)
    const serieId = await getDetailsSeries(id);

    if (id) {
        return res.status(200).send(serieId)
    }
    return res.status(404).send("Serie no encontrada");
});

//editar solamente la serie por su serieId
router.put('/series/:id', async (req, res, next) => {
    let {id} = req.params
    let serie = req.body;
    try {
        const serie_Upd = await updSerie(id,serie);
        res.status(200).json(serie_Upd);
    } catch (error) {
        next(error);
    } 
})

//guardar serie 
router.post("/serie", async (req, res) => {
    let serie = req.body;
    try {
        const serie_Post = await createSerie(serie);
        res.json(serie_Post);
    } catch (error) {
        next(error);
    }
});


//eliminar solamente la serie por su id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        respusta = await deleteSerie(id)
        res.status(200).send(respusta)
    } catch (error) {
        return(error);
    }
});

module.exports = router;
