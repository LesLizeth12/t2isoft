const usuarioRepository = require('../repositories/UsuarioRepository');

class UsuarioService{
    getAllUsuarios(){
        return usuarioRepository.findAll();
    }
    getUsuarioById(id){
        return usuarioRepository.findById(id);
    }
    createUsuario(usuarioData){
        return usuarioRepository.create(usuarioData);
    }
    updateUsuario(id, usuarioData){
        return usuarioRepository.update(id, usuarioData);
    }
    deleteUsuario(id){
        return usuarioRepository.delete(id);
    }
    restoreUsuario(id){
        return usuarioRepository.restore(id);
    }
    getUserByUsername(usuarioNom){
        return usuarioRepository.findByUsername(usuarioNom);
    }
}
module.exports=new UsuarioService();