const zonaTuristicaRepository = require('../repositories/ZonaTuristicaRepository');

class ZonaTuristicaService{
    getAllZonaTuristicas(){
        return zonaTuristicaRepository.findAll();
    }
    getZonaTuristicaById(id){
        return zonaTuristicaRepository.findById(id);
    }
    createZonaTuristica(zonaTuristicaData){
        return zonaTuristicaRepository.create(zonaTuristicaData);
    }
    updateZonaTuristica(id, zonaTuristicaData){
        return zonaTuristicaRepository.update(id, zonaTuristicaData);
    }
    deleteZonaTuristica(id){
        return zonaTuristicaRepository.delete(id);
    }
    restoreZonaTuristica(id){
        return zonaTuristicaRepository.restore(id);
    }
}
module.exports=new ZonaTuristicaService();