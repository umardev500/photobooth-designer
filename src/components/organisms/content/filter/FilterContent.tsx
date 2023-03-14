import { Arrow } from '../../../atoms'
import { FilterCanvas } from '../../../molecules'

export const FilterContent: React.FC = () => {
    return (
        <div className="relative bg-slate-300 ml-80 p-6 h-screen flex justify-center items-center">
            <div className="relative flex justify-center items-center pr-16 pb-16 mb-20 ">
                <div className="flex items-center">
                    <Arrow left className="mr-6 text-slate-400 hover:text-slate-500 cursor-pointer" w={35} h={54} />
                    <FilterCanvas />
                    <Arrow className="ml-6 text-slate-400 hover:text-slate-500 cursor-pointer" w={35} h={54} />
                </div>
            </div>
        </div>
    )
}
