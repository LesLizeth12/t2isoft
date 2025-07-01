const preferenciaRepository = require('../repositories/PreferenciaRepository');

class PreferenciaService{
    getAllPreferencias(){
        return preferenciaRepository.findAll();
    }
    getPreferenciaById(id){
        return preferenciaRepository.findById(id);
    }
    createPreferencia(preferenciaData){
        return preferenciaRepository.create(preferenciaData);
    }
    updatePreferencia(id, preferenciaData){
        return preferenciaRepository.update(id, preferenciaData);
    }
    deletePreferencia(id){
        return preferenciaRepository.delete(id);
    }
    restorePreferencia(id){
        return preferenciaRepository.restore(id);
    }
}
module.exports=new PreferenciaService();