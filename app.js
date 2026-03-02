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
        

    }catch(error){
        
    }
})