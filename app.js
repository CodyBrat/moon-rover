const express = require('express');
const morgan = require('morgan');

const app= express();
app.use(express.json());
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.status(200).json({
        status:'success',
        message: 'Welcome to the API',
    });
});

app.post('/api/rovers',(req,res)=>{
    try{
        const { input }=req.body;
        if(!input ||typeof input!=='string'){
            return res.status(400).json({
                status:'fail',
                message:'Input is required',
            })
        }
        const parsed = parseInput(input);
        const results = [];
        const occupiedPositions = new Set();

        parsed.rovers.forEach(r=>occupiedPositions.add(`${r.x},${r.y}`))

        for (rover of parsed.rovers){
            occupiedPositions.delete(`${rover.x},${rover.y}`)
            const result= runRover(rover,parsed.plateau, occupiedPositions)
            results.push(`${result.x} ${result.y} ${result.facing}`)

            occupiedPositions.add(`${result.x},${result.y}`)
        }
        return res.status(200).json({
            status:'success',
            data: results,
        })
    }catch(error){
        return res.status(400).json({
            status:'fail',
            message: error.message,
        })
    }
})
app.use((req,res)=>{
    res.status(404).json({
        status:'fail',
        message:'Route not found',
    })
})

module.exports = app;