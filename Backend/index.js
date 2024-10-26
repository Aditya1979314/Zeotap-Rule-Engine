const peg = require("pegjs");
const fs = require("fs");
const express = require('express');
const Rule = require('./db.js')
const {combineRules,evaluateAst} = require('./utils.js')
const mongoose = require('mongoose');
const cors = require('cors');
 require('dotenv').config();


mongoose.connect(process.env.db_url).then(()=>{
    console.log('database connected');
}).catch(()=>{
    console.log("some error occured while conncecting to database")
})

const app = express();
const grammar = fs.readFileSync("rules.pegjs", "utf-8");
const parser = peg.generate(grammar);

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    return res.status(200).json({"msg":"hi there"})
})

app.post('/createrule',async (req,res)=>{
const {rule} = req.body;
try{
    const ast = parser.parse(rule);
    await Rule.create({
        rule,
        ast
    })
    return res.status(200).json({"msg":"rule created"});
}catch(err){
    return res.status(503).json({"msg":"some error occured"});
}
})


app.post('/combinerule',async (req,res)=>{
    const {rules,operators} = req.body;

    const combinedString = combineRules(rules,operators);
    try{
        if(combinedString){
            const ast = parser.parse(combinedString);
            await Rule.create({
                rule:combinedString,
                ast:ast
            });
        
            return res.status(200).json({"msg":"rule combined"});
        }else{
            return res.status(403).json({"msg":"opertor array should be one less than the rules array"});
        }
    }catch(err){
        return res.status(503).json({"msg":"some error occured"});
    }

})

app.post('/evaluaterule',async (req,res)=>{
const {userdata} = req.body;
try{
const rule = await Rule.findOne({ismain:true});
const result = evaluateAst(rule.ast,userdata);

return res.status(200).json({"msg":result})

}catch(err){
    return res.status(503).json({"msg":"some error occured"});
}
})

app.get('/rules',async (req,res)=>{
    try{
        const rules = await Rule.find({});
        return res.status(200).json({rules});
    }catch(err){
        return res.status(503).json({"msg":"some error occured"});
    }
})

app.get('/mainrule',async (req,res)=>{
try{
const mainrule = await Rule.findOne({ismain:true});
if(mainrule){
    return res.status(200).json({"mainrule":mainrule});
}else{
    return res.status(200).json({"msg":"Select a rule to use"});
}
}catch(err){
    return res.status(503).json({"msg":"some error occured"});
}
})

app.patch('/createmainrule',async (req,res)=>{
    const {id,previd} = req.body;
    try{
        await Rule.updateOne({_id:id},{
            ismain:true
        });
        await Rule.updateOne({_id:previd},{
            ismain:false
        })
        return res.status(200).json({"msg":"main rule selected"});
    }catch(err){
        return res.status(503).json({"msg":"some error occured"});
    }
})

app.listen(3000,()=>{
    console.log("server connected");
})