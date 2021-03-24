const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Map = require('../models/map.js');
const config = require('../config');
const data = require('../data.json');
const router = express.Router();

function saveEl(els,index) {
    if(els.length<=index){
        console.log('dfsdfsdfsdfdsfdsfsdf')
        return 'end';
    }
    const el = els[index]
    const map = new Map({
        NeighID: el.properties.NeighID,
        type: el.type,
        properties: el.properties,
        geometry:el.geometry
    })

    Map.find({NeighID: el.properties.NeighID}).exec()
    .then(rs=>{
        if(rs.length){
            console.log(rs.length)
            saveEl(els,index+1)
        }else{
            console.log('dfdsfs')
            map.save(function(err){
                if(err) return console.log(err)
                saveEl(els,index+1)
            });
        }
    })
}

router.get('/importdata_save',async(req,res) => {
    saveEl(data,0)
    res.json({success:'dfs'})
})

router.get('/', async (req, res) => {
    Map.find().select('type properties geometry -_id').exec()
        .then(maps =>{
            res.json(maps)
        })
});
router.post('/',async(req,res) => {
    console.log(req.body.properties.NeighName)
    const map = new Map({
        NeighID: req.body.properties.NeighID,
        type: req.body.type,
        properties: req.body.properties,
        geometry:req.body.geometry
    })

    Map.find({NeighID: req.body.properties.NeighID}).exec()
    .then(rs=>{
        if(rs.length){
            res.json({status:'found data'});
        }else{
            map.save(function(err){
                if(err) return err
                res.json({ status: 'success' });
            });
        }
    })
    .catch(err=>{
        res.json(err)
    })
    
})

module.exports = router;