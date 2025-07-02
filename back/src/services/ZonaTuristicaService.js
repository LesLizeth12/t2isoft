const zonaTuristicaRepository = require('../repositories/ZonaTuristicaRepository');

class ZonaTuristicaService {
  getAllZonaTuristicas() {
    return zonaTuristicaRepository.findAll();
  }
  getZonaTuristicaById(id) {
    return zonaTuristicaRepository.findById(id);
  }
  createZonaTuristica(zonaTuristicaData) {
    return zonaTuristicaRepository.create(zonaTuristicaData);
  }
  updateZonaTuristica(id, zonaTuristicaData) {
    return zonaTuristicaRepository.update(id, zonaTuristicaData);
  }
  deleteZonaTuristica(id) {
    return zonaTuristicaRepository.delete(id);
  }
  restoreZonaTuristica(id) {
    return zonaTuristicaRepository.restore(id);
  }
  async getZonasByEstacion(estacionId) {
    const estacion = await zonaTuristicaRepository.findById(estacionId);
    if (!estacion) {
      throw new Error("Estacion not found");
      return;
    }
    const z = await zonaTuristicaRepository.findZonasByIdEstacion(
      estacionId
    );
    const zonabyestacion = {
      data: {
        ...estacion,
        zonas: z,
      },
    };
    return zonabyestacion;
  }
}
module.exports = new ZonaTuristicaService();