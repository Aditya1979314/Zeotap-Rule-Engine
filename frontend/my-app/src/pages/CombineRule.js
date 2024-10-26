import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { CheckCard } from "../components/CheckCard";






export function CombineRule(){
const[data,setdata] = useState();
const[rules,setrules] = useState([]);
const[operators,setoperator] = useState([]);

useEffect(()=>{
async function fetchdata(){
    const response = await fetch('http://localhost:3000/rules');
    const result = await response.json();
    const arr = result.rules.map((obj)=>{
     return {rule:obj.rule,id:obj._id}   
    });

    setdata(arr);
}
fetchdata()
})

async function onsubmithandler(){
let rulestringarr = [];

for(let i=0;i<rules.length;i++){
    for(let j=0;j<data.length;j++){
        if(data[j].id === rules[i]){
            rulestringarr.push(data[j].rule);
        }
    }
}
console.log(rulestringarr.length);
console.log(operators.length);
console.log(operators)
const response = await fetch('http://localhost:3000/combinerule',{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        rules:rulestringarr,
        operators:operators
    })
});

const result = await response.json();
if(result){
    alert(result.msg)
}
}

function checkboxhandler(e,id){
if(e.target.checked === true){
    setrules((prev)=>[...prev,id])
}else{
  setrules((prev)=>prev.filter((ruleid)=>ruleid !== id))
}
}

    return(
        <>
        <div className="h-full w-full flex justify-center gap-4">
            <div className="flex flex-col gap-2 items-center p-2">
            {data &&  
               data.map((obj,index)=>{
                return <CheckCard ruletext={obj.rule} index={index} onclick={(e)=>{
                    checkboxhandler(e,obj.id)
                }}/>
               })
            }
            </div>
            <div className="flex flex-col gap-2 p-4">
            <Button label={"Combine"} onclick={onsubmithandler}/>
            <input placeholder="AND,OR " className="px-4 py-2 " onChange={(e)=>{
                const operatorsarr = e.target.value.split(',');
                setoperator(operatorsarr)
            }}/>
            <div className="text-white font-semibold">Expressions array :</div>
            <div className="bg-white px-4 py-4">
                {rules.length > 0 && (<div>[
                    {rules.map((ruleid,index)=>
                        <span className="text-black font-light">{index+1} ,</span>
                    )}
                    ]
                    </div>)
                }
            </div>    
            </div>
        </div>
        </>
    )
}