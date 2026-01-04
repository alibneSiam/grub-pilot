import ProteinPicker from "./ProteinPicker"
import Snack from "./Snack"

const MealPicker = () => {
    return (
        <div className="py-4">
            <ProteinPicker/>
            <br />
            <br />
            <Snack />
            <br />
            <br />
            <button className="relative inline-block p-4
                before:block before:absolute before:-inset-1
                before:-skew-y-2 before:bg-orange-400 hover:cursor-pointer
                before:transition-all before:duration-800 before:ease-out
                hover:before:skew-y-0 hover:before:bg-orange-600 w-[90%] 
                text-black hover:text- font-semibold">
                 <span className="relative">
                    Update Meal Preferance
                </span>
            </button>
        </div>      
    )
}

export default MealPicker