const express = require('express');
const estacionService=require('../services/EstacionService');
const router=express.Router();

router.get('/',async(req,res)=>{
    const estacions=await estacionService.getAllEstacions();
    res.json(estacions);
});

router.get('/:Id/',async(req,res)=>{
    const estacion=await estacionService.getEstacionById(req.params.Id);
    if(estacion){
        res.json(estacion);
    }else{
        res.status(404).json({message:'estacion no found'});
    }
});

router.post('/',async(req,res)=>{
    const newEstacion=await estacionService.createEstacion(req.body);
    res.status(201).json(newEstacion);
});

router.put('/:Id',async(req,res)=>{
    const updateEstacion=await estacionService.updateEstacion(req.params.Id,req.body);
    if(updateEstacion)
        res.status(201).json(updateEstacion);
    else
    res.status(404).json({message:'Estacion not updated'});
});

router.delete('/:Id',async(req,res)=>{
    const deletedEstacion=await estacionService.deleteEstacion(req.params.Id);
    if(deletedEstacion){
        res.status(204).send();
    }else{
        res.status(404).json({message:'Estacion dont delete'});
    }
});

router.put('/restore/:Id',async(req,res)=>{
    const restoredEstacion=await estacionService.restoreEstacion(req.params.Id);
    if(restoredEstacion){
        res.status(204).send();
    }else{
        res.status(404).json({message:'Estacion dont restore'});
    }
});

module.exports=router;