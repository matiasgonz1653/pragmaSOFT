console.log("Iniciando..");
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const {loaderSeries} = require('./src/loader/loader.js')


// Syncing all the models at once.

conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, async () => {
    
    //await loaderSeries();

    console.log("listening...");
  });
});