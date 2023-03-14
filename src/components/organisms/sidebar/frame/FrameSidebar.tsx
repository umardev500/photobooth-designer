import { useCallback, useContext, useEffect, useRef } from 'react'
import { AppContext, type AppContextData } from '../../../../context'

export const FrameSidebar: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const context = useContext(AppContext) as AppContextData

    const handleOpen = useCallback(() => {
        const input = inputRef.current
        if (input != null) {
            input.click()
        }
    }, [])

    useEffect(() => {
        const input = inputRef.current as HTMLInputElement
        if (input != null) {
            input?.addEventListener('change', (e: Event) => {
                const files = (e.target as HTMLInputElement).files as FileList
                const filesLen = files?.length ?? 0

                if (filesLen > 0) {
                    const dataUrls: string[] = []
                    for (let i = 0; i < filesLen; i++) {
                        const file = files[i]
                        const reader = new FileReader()
                        reader.readAsDataURL(file)

                        reader.onload = (eReader) => {
                            const dataURL = eReader.target?.result as string
                            dataUrls.push(dataURL)

                            if (dataUrls.length === filesLen) {
                                context.setImages(dataUrls)
                            }
                        }
                    }
                }
            })
        }
    }, [])

    const handleClick = (index: number) => {
        context.setOverlayToggle(true)
        context.setCurrentPreview(index)
    }

    return (
        <div className="w-80 bg-gray-800 fixed left-0 top-0 bottom-0 px-6">
            <div className="h-24 flex justify-center py-3">
                {/* <img className="w-16" src="vite.svg" alt="" /> */}
                <img className="w-28 h-10 mt-4 object-contain" src="logo-white.png" alt="" />
            </div>

            <div className="flex mb-4 justify-end mt-1.5">
                <input ref={inputRef} className="hidden" type="file" id="file-input" multiple accept="image/*" />
                <button
                    style={{ fontFamily: 'lobster two' }}
                    onClick={handleOpen}
                    className="text-xl w-fulls bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-medium"
                >
                    Select Folder
                </button>
            </div>

            <div className="flex flex-wrap gap-4 image-list mt-8">
                {context.images.map((val, i) => (
                    <div key={i} className="w-full sm:w-1/2">
                        <img
                            onClick={() => {
                                handleClick(i)
                            }}
                            data-type="main"
                            className="border border-gray-600 h-40 w-full object-cover rounded-sm"
                            draggable
                            src={val}
                            alt="image-list"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
