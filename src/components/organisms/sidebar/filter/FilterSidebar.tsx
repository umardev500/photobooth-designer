import { useContext, useRef } from 'react'
import { AppContext, type AppContextData } from '../../../../context'

export const FilterSidebar: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const context = useContext(AppContext) as AppContextData

    const handleFilter = (e: any) => {
        const filterName = e.target.dataset.filter as string
        const filterIndex = context.filters.findIndex((val) => val.name === filterName)
        context.setCurrentFilter(filterIndex)
    }

    return (
        <div className="w-80 bg-gray-800 fixed left-0 top-0 bottom-0 px-6">
            <div className="h-24 flex justify-center py-3">
                {/* <img className="w-16" src="vite.svg" alt="" /> */}
                <img className="w-28 h-10 mt-4 object-contain" src="logo-white.png" alt="" />
            </div>

            <div className="flex mb-4 justify-end mt-1.5">
                <input ref={inputRef} className="hidden" type="file" id="file-input" multiple accept="image/*" />
                <button className="text-base roboto bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-medium">Custom Filter</button>
            </div>

            <div className="flex flex-wrap gap-4 image-list mt-8">
                {context.filters.map((val, i) => (
                    <div key={i} className="w-full sm:w-1/2">
                        <img
                            data-filter={val.name}
                            onClick={handleFilter}
                            className="cursor-pointer border border-gray-600 h-40 w-full object-cover rounded-sm"
                            draggable
                            src={val.value}
                            alt="image-list"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
