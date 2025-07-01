const tipoUsuarioRepository = require('../repositories/TipoUsuarioRepository');

class TipoUsuarioService{
    getAllTipoUsuarios(){
        return tipoUsuarioRepository.findAll();
    }
    getTipoUsuarioById(id){
        return tipoUsuarioRepository.findById(id);
    }
    createTipoUsuario(tipoUsuarioData){
        return tipoUsuarioRepository.create(tipoUsuarioData);
    }
    updateTipoUsuario(id, tipoUsuarioData){
        return tipoUsuarioRepository.update(id, tipoUsuarioData);
    }
    deleteTipoUsuario(id){
        return tipoUsuarioRepository.delete(id);
    }
    restoreTipoUsuario(id){
        return tipoUsuarioRepository.restore(id);
    }
}
module.exports=new TipoUsuarioService();