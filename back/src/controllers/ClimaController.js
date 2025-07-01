const express = require('express');
const climaService=require('../services/ClimaService');
const router=express.Router();

router.get('/',async(req,res)=>{
    const climas=await climaService.getAllClimas();
    res.json(climas);
});

router.get('/:id/',async(req,res)=>{
    const clima=await climaService.getClimaById(req.params.id);
    if(clima){
        res.json(clima);
    }else{
        res.status(404).json({message:'clima no found'});
    }
});

router.post('/',async(req,res)=>{
    const newClima=await climaService.createClima(req.body);
    res.status(201).json(newClima);
});

router.put('/:id',async(req,res)=>{
    const updateClima=await climaService.updateClima(req.params.id,req.body);
    if(updateClima)
        res.status(201).json(updateClima);
    else
    res.status(404).json({message:'Clima not updated'});
});

router.delete('/:id',async(req,res)=>{
    const deletedClima=await climaService.deleteClima(req.params.id);
    if(deletedClima){
        res.status(204).send();
    }else{
        res.status(404).json({message:'Clima dont delete'});
    }
});

router.put('/restore/:id',async(req,res)=>{
    const restoredClima=await climaService.restoreClima(req.params.id);
    if(restoredClima){
        res.status(204).send();
    }else{
        res.status(404).json({message:'Clima dont restore'});
    }
});

module.exports=router;