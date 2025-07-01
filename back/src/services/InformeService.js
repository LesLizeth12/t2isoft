const informeRepository = require('../repositories/InformeRepository');

class InformeService{
    getAllInformes(){
        return informeRepository.findAll();
    }
    getInformeById(id){
        return informeRepository.findById(id);
    }
    createInforme(informeData){
        return informeRepository.create(informeData);
    }
    updateInforme(id, informeData){
        return informeRepository.update(id, informeData);
    }
    deleteInforme(id){
        return informeRepository.delete(id);
    }
    restoreInforme(id){
        return informeRepository.restore(id);
    }
}
module.exports=new InformeService();