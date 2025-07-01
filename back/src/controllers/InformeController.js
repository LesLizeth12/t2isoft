const express = require('express');
const informeService=require('../services/InformeService');
const router=express.Router();

router.get('/',async(req,res)=>{
    const informes=await informeService.getAllInformes();
    res.json(informes);
});

router.get('/:id/',async(req,res)=>{
    const informe=await informeService.getInformeById(req.params.id);
    if(informe){
        res.json(informe);
    }else{
        res.status(404).json({message:'informe no found'});
    }
});

router.post('/',async(req,res)=>{
    const newInforme=await informeService.createInforme(req.body);
    res.status(201).json(newInforme);
});

router.put('/:id',async(req,res)=>{
    const updateInforme=await informeService.updateInforme(req.params.id,req.body);
    if(updateInforme)
        res.status(201).json(updateInforme);
    else
    res.status(404).json({message:'Informe not updated'});
});

router.delete('/:id',async(req,res)=>{
    const deletedInforme=await informeService.deleteInforme(req.params.id);
    if(deletedInforme){
        res.status(204).send();
    }else{
        res.status(404).json({message:'Informe dont delete'});
    }
});

router.put('/restore/:id',async(req,res)=>{
    const restoredInforme=await informeService.restoreInforme(req.params.id);
    if(restoredInforme){
        res.status(204).send();
    }else{
        res.status(404).json({message:'Informe dont restore'});
    }
});

module.exports=router;