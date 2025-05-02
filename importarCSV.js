require('dotenv').config(); // Cargar variables desde .env

const fs = require('fs');
const path = require('path');
const csvtojson = require('csvtojson');
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

const archivosCSV = [
  { archivo: 'Clínicas veterinarias en España.csv', colección: 'clinicas' },
  { archivo: 'Guarderías caninas y felinas en España.csv', colección: 'guarderias' },
  { archivo: 'Parques pet-friendly en España.csv', colección: 'parques' },
  { archivo: 'Repostería Canina en España.csv', colección: 'reposteria' },
  { archivo: '1695112749_wp_geodir_gd_place_detail.csv', colección: 'wp_places' }
];

async function importarDatos() {
  try {
    await client.connect();
    const db = client.db();

    for (const { archivo, colección } of archivosCSV) {
      const ruta = path.join(__dirname, archivo);
      const datos = await csvtojson().fromFile(ruta);
      const resultado = await db.collection(colección).insertMany(datos);
      console.log(`👌 Importados ${resultado.insertedCount} documentos en '${colección}'`);
    }

  } catch (error) {
    console.error('✖️ Error al importar datos:', error);
  } finally {
    await client.close();
  }
}

importarDatos();
