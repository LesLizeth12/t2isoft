const express = require('express');
const zonaTuristicaService=require('../services/ZonaTuristicaService');
const router=express.Router();

router.get('/',async(req,res)=>{
    const zonaTuristicas=await zonaTuristicaService.getAllZonaTuristicas();
    res.json(zonaTuristicas);
});

router.get('/:Id/',async(req,res)=>{
    const zonaTuristica=await zonaTuristicaService.getZonaTuristicaById(req.params.Id);
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

router.put('/:Id',async(req,res)=>{
    const updateZonaTuristica=await zonaTuristicaService.updateZonaTuristica(req.params.Id,req.body);
    if(updateZonaTuristica)
        res.status(201).json(updateZonaTuristica);
    else
    res.status(404).json({message:'ZonaTuristica not updated'});
});

router.delete('/:Id',async(req,res)=>{
    const deletedZonaTuristica=await zonaTuristicaService.deleteZonaTuristica(req.params.Id);
    if(deletedZonaTuristica){
        res.status(204).send();
    }else{
        res.status(404).json({message:'ZonaTuristica dont delete'});
    }
});

router.get('/estacion/:estacionId',async(req,res)=>{
    try {
        const result=await zonaTuristicaService.getZonasByEstacion(req.params.estacionId);
        res.json(result);
    } catch (error) {
        if(error,message==='Estacion not found'){ //=== : evalua tipo de dato
            res.status(404).json({error:error.message});
        }else{
            res.status(500).json({error:error.message});
        }
    }
});

router.put('/restore/:Id',async(req,res)=>{
    const restoredZonaTuristica=await zonaTuristicaService.restoreZonaTuristica(req.params.Id);
    if(restoredZonaTuristica){
        res.status(204).send();
    }else{
        res.status(404).json({message:'ZonaTuristica dont restore'});
    }
});

module.exports=router;