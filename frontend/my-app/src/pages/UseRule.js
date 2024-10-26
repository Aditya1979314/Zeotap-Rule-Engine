import { useEffect, useState } from "react";
import { UseCard } from "../components/UseCard"
import { UseMainCard } from "../components/UseMainCard"






export function UseRule(){
const [data,setdata] = useState([]);
const [mainrule,setmainrule] = useState({id:null,rule:null});

useEffect(()=>{
async function fetchdata(){
    try{
        const response = await fetch('http://localhost:3000/rules');
        const result = await response.json();
        const arr = result.rules.map((obj)=>{
         return {rule:obj.rule,id:obj._id}   
        });
    
        setdata(arr);
        
        const resp = await fetch('http://localhost:3000/mainrule');
        const resu  = await resp.json();
        if(resu.mainrule){
            const obj = {
                rule:resu.mainrule.rule,
                id:resu.mainrule._id
            }
            setmainrule(obj)
        }else{

            setmainrule({
                id:null,
                rule:resu.msg
            })
        }
    }catch(err){
        console.log("some error occured"+err)
    }
}
fetchdata();
},[])

async function onclickhandler(id){
    if(!mainrule.id){
        let previd = id;
    }
        const response = await fetch('http://localhost:3000/createmainrule',{
            method:'PATCH',
            headers:{
                "Content-Type":"application/json" 
                 },
            body: JSON.stringify({
                id:id,
                previd:mainrule.id
            })
        })
        const result = await response.json();
        if(result.msg === "main rule selected"){
            const newmainrule = data.find(item => item.id === id);
            setmainrule(newmainrule)
        }
}

    return(
        <div className="flex flex-col items-center h-full">
            <div className="w-1/2 h-1/4 m-2">
            {mainrule && <UseMainCard ruletext={mainrule.rule} />}
            </div>
            <div className="border border-t-1 border-gray-50 w-1/2 m-2"></div>
        <div className="h-full w-1/2 flex justify-center p-4">
            <div className="flex flex-col gap-2">
                {data.map((obj)=>{
                    return <UseCard ruletext={obj.rule} onclick={()=>{
                        return onclickhandler(obj.id)
                    }}/>
                })}
            </div>
        </div>
        </div>
    )
}