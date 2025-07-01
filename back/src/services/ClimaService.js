const climaRepository = require('../repositories/ClimaRepository');

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