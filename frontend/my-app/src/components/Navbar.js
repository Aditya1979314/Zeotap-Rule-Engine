import { Link } from "react-router-dom";





export function Navbar(){
    return (
        <div className="flex justify-center items-center">
            <div className="text-white flex w-1/3 p-3 items-center justify-around font-semibold">
            <Link to='/create' className="hover:text-[#2F8D46] cursor-pointer">Create</Link>
            <Link to='/combine' className="hover:text-[#2F8D46] cursor-pointer">Combine</Link>
            <Link to='/use' className="hover:text-[#2F8D46] cursor-pointer">Use</Link>
            <Link to='/user' className="hover:text-[#2F8D46] cursor-pointer">User</Link>
            </div>
        </div>
    )
}