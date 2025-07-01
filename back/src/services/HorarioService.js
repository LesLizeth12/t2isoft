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
}
module.exports=new HorarioService();