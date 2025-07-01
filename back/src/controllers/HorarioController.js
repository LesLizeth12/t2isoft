const express = require('express');
const horarioService=require('../services/HorarioService');
const router=express.Router();

router.get('/',async(req,res)=>{
    const horarios=await horarioService.getAllHorarios();
    res.json(horarios);
});

router.get('/:id/',async(req,res)=>{
    const horario=await horarioService.getHorarioById(req.params.id);
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

router.put('/:id',async(req,res)=>{
    const updateHorario=await horarioService.updateHorario(req.params.id,req.body);
    if(updateHorario)
        res.status(201).json(updateHorario);
    else
    res.status(404).json({message:'Horario not updated'});
});

router.delete('/:id',async(req,res)=>{
    const deletedHorario=await horarioService.deleteHorario(req.params.id);
    if(deletedHorario){
        res.status(204).send();
    }else{
        res.status(404).json({message:'Horario dont delete'});
    }
});

router.put('/restore/:id',async(req,res)=>{
    const restoredHorario=await horarioService.restoreHorario(req.params.id);
    if(restoredHorario){
        res.status(204).send();
    }else{
        res.status(404).json({message:'Horario dont restore'});
    }
});

module.exports=router;