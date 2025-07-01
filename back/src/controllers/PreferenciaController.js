const express = require('express');
const preferenciaService=require('../services/PreferenciaService');
const router=express.Router();

router.get('/',async(req,res)=>{
    const preferencias=await preferenciaService.getAllPreferencias();
    res.json(preferencias);
});

router.get('/:id/',async(req,res)=>{
    const preferencia=await preferenciaService.getPreferenciaById(req.params.id);
    if(preferencia){
        res.json(preferencia);
    }else{
        res.status(404).json({message:'preferencia no found'});
    }
});

router.post('/',async(req,res)=>{
    const newPreferencia=await preferenciaService.createPreferencia(req.body);
    res.status(201).json(newPreferencia);
});

router.put('/:id',async(req,res)=>{
    const updatePreferencia=await preferenciaService.updatePreferencia(req.params.id,req.body);
    if(updatePreferencia)
        res.status(201).json(updatePreferencia);
    else
    res.status(404).json({message:'Preferencia not updated'});
});

router.delete('/:id',async(req,res)=>{
    const deletedPreferencia=await preferenciaService.deletePreferencia(req.params.id);
    if(deletedPreferencia){
        res.status(204).send();
    }else{
        res.status(404).json({message:'Preferencia dont delete'});
    }
});

router.put('/restore/:id',async(req,res)=>{
    const restoredPreferencia=await preferenciaService.restorePreferencia(req.params.id);
    if(restoredPreferencia){
        res.status(204).send();
    }else{
        res.status(404).json({message:'Preferencia dont restore'});
    }
});

module.exports=router;