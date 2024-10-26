const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
    rule:{
        type:String,
        required:true
    },
    ast:{
        type:mongoose.Schema.Types.Mixed,
        required:true
    },
    ismain:{
        type:Boolean,
        default:false
    }
});

const Rule = mongoose.model("Rule",ruleSchema);

module.exports = Rule