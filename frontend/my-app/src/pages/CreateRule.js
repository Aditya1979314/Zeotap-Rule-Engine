import { useState } from "react";
import { Button } from "../components/Button";
import { Textarea } from "../components/Textarea";




export function CreateRule(){
const [rule,setrule] = useState();

async function onsubmithandler(){
    const rulestring = rule.trim();
    const response = await fetch('http://localhost:3000/createRule',{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            rule:rulestring
        })
    });

    const result = await response.json();
    alert(result.msg);
}

    return(
        <div className=" min-h-full flex flex-col gap-1 justify-center items-center p-1">
            <div className=" flex flex-col gap-4 h-full w-3/4">
           <Textarea onchange={(e)=>{setrule(e.target.value)}}/>
           <div className="self-center">
            <div className="w-20 h-auto">
           <Button label={'Publish'} onclick={onsubmithandler}/>
            </div>
           </div>
            </div>
        </div>
    )
}