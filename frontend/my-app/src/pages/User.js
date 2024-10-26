import { useState } from "react"
import { Button } from "../components/Button";




export function User(){
const[age,setage] = useState();
const[department,setdepartment] = useState();
const[experience,setexperience] = useState();
const[salary,setsalary] = useState();


async function onclickhandler(){
    const response = await fetch('http://localhost:3000/evaluaterule',{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            "userdata":{
            age:age,
            department:department,
            experience:experience,
            salary:salary
            }
        })
    });
    const result = await response.json();
    if(result.msg === true){
        alert("User is eligible")
    }else if(result.msg === false){
        alert("User is not eligible")
    }else{
        alert(result.msg)
    }
}

    return(
        <div className=" h-full flex justify-center items-center">
            <div className="bg-[#171B1D] flex flex-col items-center gap-3 w-1/3 p-8">
            <div>
                <p className="text-white font-semibold mb-1">Age:</p>
                <input placeholder="Enter age" className="px-4 py-2 rounded" type="number" onChange={(e)=>{
                    setage(e.target.value)
                }}/>
            </div>
            <div>
            <p className="text-white font-semibold mb-1">Department:</p>
                <input placeholder="Enter Department"  className="px-4 py-2 rounded" type="text" onChange={(e)=>{
                    setdepartment(e.target.value)
                }}/>
            </div>
            <div>
                <p className="text-white font-semibold mb-1">Experience:</p>
                <input placeholder="Enter experience"  className="px-4 py-2 rounded" type="number" onChange={(e)=>{
                    setexperience(e.target.value)
                }}/>
            </div>
            <div> 
                <p className="text-white font-semibold mb-1">Salary:</p>
                <input placeholder="Enter salary"  className="px-4 py-2 rounded" type="number" onChange={(e)=>{
                    setsalary(e.target.value)
                }}/>
            </div>
            <Button label={"Submit"} onclick={onclickhandler}/>
            </div>
        </div>
    )
}