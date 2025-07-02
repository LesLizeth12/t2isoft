const horarioRepository = require('../repositories/HorarioRepository');

class HorarioService{
    getAllHorarios(){
        return horarioRepository.findAll();
    }
    getHorarioById(id){
        return horarioRepository.findById(id);
    }
    createHorario(horarioData){
        return horarioRepository.create(horarioData);
    }
    updateHorario(id, horarioData){
        return horarioRepository.update(id, horarioData);
    }
    deleteHorario(id){
        return horarioRepository.delete(id);
    }
    restoreHorario(id){
        return horarioRepository.restore(id);
    }

    async getHorariosByEstacion(estacionId) {
        const estacion = await horarioRepository.findById(estacionId);
        if (!estacion) {
          throw new Error("Estacion not found");
          return;
        }
        const z = await horarioRepository.findHorariosByIdEstacion(
          estacionId
        );
        const horariobyestacion = {
          data: {
            ...estacion,
            horarios: z,
          },
        };
        return horariobyestacion;
      }
}
module.exports=new HorarioService();