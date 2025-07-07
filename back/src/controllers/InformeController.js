const express = require('express');
const informeService=require('../services/InformeService');
const router=express.Router();

router.get('/',async(req,res)=>{
    const informes=await informeService.getAllInformes();
    res.json(informes);
});

router.get('/:Id/',async(req,res)=>{
    const informe=await informeService.getInformeById(req.params.Id);
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

router.put('/:Id',async(req,res)=>{
    const updateInforme=await informeService.updateInforme(req.params.Id,req.body);
    if(updateInforme)
        res.status(201).json(updateInforme);
    else
    res.status(404).json({message:'Informe not updated'});
});

router.delete('/:Id',async(req,res)=>{
    const deletedInforme=await informeService.deleteInforme(req.params.Id);
    if(deletedInforme){
        res.status(204).send();
    }else{
        res.status(404).json({message:'Informe dont delete'});
    }
});

router.put('/restore/:Id',async(req,res)=>{
    const restoredInforme=await informeService.restoreInforme(req.params.Id);
    if(restoredInforme){
        res.status(204).send();
    }else{
        res.status(404).json({message:'Informe dont restore'});
    }
});

module.exports=router;