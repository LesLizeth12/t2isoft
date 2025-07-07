const express = require('express');
const usuarioService=require('../services/UsuarioService');
const router=express.Router();

router.get('/',async(req,res)=>{
    const usuarios=await usuarioService.getAllUsuarios();
    res.json(usuarios);
});

router.get('/:Id/',async(req,res)=>{
    const usuario=await usuarioService.getUsuarioById(req.params.Id);
    if(usuario){
        res.json(usuario);
    }else{
        res.status(404).json({message:'usuario no found'});
    }
});

router.post('/',async(req,res)=>{
    const newUsuario=await usuarioService.createUsuario(req.body);
    res.status(201).json(newUsuario);
});

router.put('/:Id',async(req,res)=>{
    const updateUsuario=await usuarioService.updateUsuario(req.params.Id,req.body);
    if(updateUsuario)
        res.status(201).json(updateUsuario);
    else
    res.status(404).json({message:'Usuario not updated'});
});

router.delete('/:Id',async(req,res)=>{
    const deletedUsuario=await usuarioService.deleteUsuario(req.params.Id);
    if(deletedUsuario){
        res.status(204).send();
    }else{
        res.status(404).json({message:'Usuario dont delete'});
    }
});

router.put('/restore/:Id',async(req,res)=>{
    const restoredUsuario=await usuarioService.restoreUsuario(req.params.Id);
    if(restoredUsuario){
        res.status(204).send();
    }else{
        res.status(404).json({message:'Usuario dont restore'});
    }
});

router.get('/getusername/:usuarioNom/',async(req,res)=>{
    const venta=await usuarioService.getUserByUsername(req.params.usuarioNom);
    if(venta){
        res.json(venta);
    }else{
        res.status(404).json({message:'Usuario no found'});
    }
});

module.exports=router;