const express = require('express');
const tipoUsuarioService=require('../services/TipoUsuarioService');
const router=express.Router();

router.get('/',async(req,res)=>{
    const tipoUsuarios=await tipoUsuarioService.getAllTipoUsuarios();
    res.json(tipoUsuarios);
});

router.get('/:id/',async(req,res)=>{
    const tipoUsuario=await tipoUsuarioService.getTipoUsuarioById(req.params.id);
    if(tipoUsuario){
        res.json(tipoUsuario);
    }else{
        res.status(404).json({message:'tipoUsuario no found'});
    }
});

router.post('/',async(req,res)=>{
    const newTipoUsuario=await tipoUsuarioService.createTipoUsuario(req.body);
    res.status(201).json(newTipoUsuario);
});

router.put('/:id',async(req,res)=>{
    const updateTipoUsuario=await tipoUsuarioService.updateTipoUsuario(req.params.id,req.body);
    if(updateTipoUsuario)
        res.status(201).json(updateTipoUsuario);
    else
    res.status(404).json({message:'TipoUsuario not updated'});
});

router.delete('/:id',async(req,res)=>{
    const deletedTipoUsuario=await tipoUsuarioService.deleteTipoUsuario(req.params.id);
    if(deletedTipoUsuario){
        res.status(204).send();
    }else{
        res.status(404).json({message:'TipoUsuario dont delete'});
    }
});

router.put('/restore/:id',async(req,res)=>{
    const restoredTipoUsuario=await tipoUsuarioService.restoreTipoUsuario(req.params.id);
    if(restoredTipoUsuario){
        res.status(204).send();
    }else{
        res.status(404).json({message:'TipoUsuario dont restore'});
    }
});

module.exports=router;