





export function Button({label,onclick}){
    return(
        <button onClick={onclick} className="bg-[#2F8D46] px-4 py-2 text-white rounded hover:bg-[#389D51]">{label}</button>
    )
}