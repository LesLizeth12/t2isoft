const climaRepository = require('../repositories/ClimaRepository');

const estacionRepository = require('../repositories/EstacionRepository'); // Usa tu repo real

const estadosClima = ['Soleado', 'Nublado', 'Lluvia', 'Tormenta', 'Niebla', 'Viento'];

async function generarTemperaturas() {
    const tempMin = Math.floor(Math.random() * 10) + 15; // 15 - 24
    const tempMax = tempMin + Math.floor(Math.random() * 6) + 4; // min+4 hasta min+9
    const tempActual = Math.floor(Math.random() * (tempMax - tempMin + 1)) + tempMin;
    const estado = estadosClima[Math.floor(Math.random() * estadosClima.length)];
    return { tempMin, tempMax, tempActual, estado };
}

async function actualizarClimasMensuales() {
    const hoy = moment();
    const diasMes = 31;

    const estaciones = await estacionRepository.findAll(); // ✅ Obtener estaciones reales

    for (const estacion of estaciones) {
        for (let dia = 1; dia <= diasMes; dia++) {
            const fecha = hoy.clone().startOf('month').date(dia).format('YYYY-MM-DD');
            const climaExistente = await climaRepository.findByEstacionAndFecha(estacion.id, fecha);

            const { tempMin, tempMax, tempActual, estado } = await generarTemperaturas();

            const climaData = {
                climaEstId: estacion.id,
                climaFec: fecha,
                climaTempMin: tempMin,
                climaTempMax: tempMax,
                climaTempActual: tempActual,
                climaEstado: estado,
                estado: 1
            };

            if (climaExistente) {
                await climaRepository.update(climaExistente.id, climaData);
            } else {
                await climaRepository.create(climaData);
            }
        }
    }

    console.log('✅ Clima actualizado con datos reales de estaciones.');
}

// 🕒 Ejecutar cada 10 segundos
setInterval(() => {
    actualizarClimasMensuales().catch(console.error);
}, 10000);

class ClimaService{
    getAllClimas(){
        return climaRepository.findAll();
    }
    getClimaById(id){
        return climaRepository.findById(id);
    }
    createClima(climaData){
        return climaRepository.create(climaData);
    }
    updateClima(id, climaData){
        return climaRepository.update(id, climaData);
    }
    deleteClima(id){
        return climaRepository.delete(id);
    }
    restoreClima(id){
        return climaRepository.restore(id);
    }

    
}
module.exports=new ClimaService();