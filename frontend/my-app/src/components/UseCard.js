import { Button } from "./Button";




export function UseCard({ruletext,onclick}){
    return(
        <div className="bg-[#171B1D] min-h-1/3 p-2">
            <p className="text-white">{ruletext}</p>
            <div className="flex justify-end">
                <Button onclick={onclick} label={'Use'} />
            </div>
        </div>
    )
}