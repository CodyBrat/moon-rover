const express = require('express');
const morgan = require('morgan');
const { parseInput } = require('./src/parser');
const { validate } = require('./src/validator');
const { runRover } = require('./src/rover');
const { version } = require('node:os');
const { OutputFileType } = require('typescript');

const app= express();
app.use(express.json());
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.status(200).json({
        status:'ok',
        message: 'Moon Rover API',
        version: '1.0.0',
    });
});

app.post('/api/rovers',(req,res)=>{
    try{
        const { input }=req.body;
        if(!input ||typeof input!=='string'){
            return res.status(400).json({
                 success:false, 
                 error:'Request body must have an "input" string field' 
                })
        }
        const parsed = parseInput(input);
        validate(parsed);
        const results = [];
        const occupiedPositions = new Set();

        parsed.rovers.forEach(r=>occupiedPositions.add(`${r.x},${r.y}`))

        for (const rover of parsed.rovers){
            occupiedPositions.delete(`${rover.x},${rover.y}`)
            const result= runRover(rover,parsed.plateau, occupiedPositions)
            results.push(`${result.x} ${result.y} ${result.facing}`)

            occupiedPositions.add(`${result.x},${result.y}`)
        }
        return res.status(200).json({
            success:true,
            output: results,
        })
    }catch(error){
        return res.status(400).json({
            success:false,
            message: error.message,
        })
    }
})
app.use((req,res)=>{
    res.status(404).json({
        success:false,
        message:'Route not found',
    })
})

module.exports = app;