const express = require('express');
const zonaTuristicaService=require('../services/ZonaTuristicaService');
const router=express.Router();

router.get('/',async(req,res)=>{
    const zonaTuristicas=await zonaTuristicaService.getAllZonaTuristicas();
    res.json(zonaTuristicas);
});

router.get('/:id/',async(req,res)=>{
    const zonaTuristica=await zonaTuristicaService.getZonaTuristicaById(req.params.id);
    if(zonaTuristica){
        res.json(zonaTuristica);
    }else{
        res.status(404).json({message:'zonaTuristica no found'});
    }
});

router.post('/',async(req,res)=>{
    const newZonaTuristica=await zonaTuristicaService.createZonaTuristica(req.body);
    res.status(201).json(newZonaTuristica);
});

router.put('/:id',async(req,res)=>{
    const updateZonaTuristica=await zonaTuristicaService.updateZonaTuristica(req.params.id,req.body);
    if(updateZonaTuristica)
        res.status(201).json(updateZonaTuristica);
    else
    res.status(404).json({message:'ZonaTuristica not updated'});
});

router.delete('/:id',async(req,res)=>{
    const deletedZonaTuristica=await zonaTuristicaService.deleteZonaTuristica(req.params.id);
    if(deletedZonaTuristica){
        res.status(204).send();
    }else{
        res.status(404).json({message:'ZonaTuristica dont delete'});
    }
});

router.put('/restore/:id',async(req,res)=>{
    const restoredZonaTuristica=await zonaTuristicaService.restoreZonaTuristica(req.params.id);
    if(restoredZonaTuristica){
        res.status(204).send();
    }else{
        res.status(404).json({message:'ZonaTuristica dont restore'});
    }
});

module.exports=router;