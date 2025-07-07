const express = require('express');
const horarioService=require('../services/HorarioService');
const router=express.Router();

router.get('/',async(req,res)=>{
    const horarios=await horarioService.getAllHorarios();
    res.json(horarios);
});

router.get('/:Id/',async(req,res)=>{
    const horario=await horarioService.getHorarioById(req.params.Id);
    if(horario){
        res.json(horario);
    }else{
        res.status(404).json({message:'horario no found'});
    }
});

router.post('/',async(req,res)=>{
    const newHorario=await horarioService.createHorario(req.body);
    res.status(201).json(newHorario);
});

router.put('/:Id',async(req,res)=>{
    const updateHorario=await horarioService.updateHorario(req.params.Id,req.body);
    if(updateHorario)
        res.status(201).json(updateHorario);
    else
    res.status(404).json({message:'Horario not updated'});
});

router.delete('/:Id',async(req,res)=>{
    const deletedHorario=await horarioService.deleteHorario(req.params.Id);
    if(deletedHorario){
        res.status(204).send();
    }else{
        res.status(404).json({message:'Horario dont delete'});
    }
});

router.get('/estacion/:estacionId',async(req,res)=>{
    try {
        const result=await horarioService.getHorariosByEstacion(req.params.estacionId);
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
    const restoredHorario=await horarioService.restoreHorario(req.params.Id);
    if(restoredHorario){
        res.status(204).send();
    }else{
        res.status(404).json({message:'Horario dont restore'});
    }
});

module.exports=router;