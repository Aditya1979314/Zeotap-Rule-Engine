



export function CheckCard({ruletext,onclick,index}){
    return(
        <div className="bg-[#171B1D] w-4/5 min-h-1/5 p-2">
            <input type="checkbox" className="accent-[#2F8D46]" onClick={onclick}/>
            <p className="text-white">{ruletext}</p>
        </div>
    )
}