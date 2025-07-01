const estacionRepository = require('../repositories/EstacionRepository');

class EstacionService{
    getAllEstacions(){
        return estacionRepository.findAll();
    }
    getEstacionById(id){
        return estacionRepository.findById(id);
    }
    createEstacion(estacionData){
        return estacionRepository.create(estacionData);
    }
    updateEstacion(id, estacionData){
        return estacionRepository.update(id, estacionData);
    }
    deleteEstacion(id){
        return estacionRepository.delete(id);
    }
    restoreEstacion(id){
        return estacionRepository.restore(id);
    }
}
module.exports=new EstacionService();