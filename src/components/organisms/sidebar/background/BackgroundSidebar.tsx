import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { TwitterPicker, type ColorResult } from 'react-color'
import { AppContext, type AppContextData } from '../../../../context'

export const BackgroundSidebar: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [images, setImages] = useState<string[]>([])

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
                                setImages(dataUrls)
                            }
                        }
                    }
                }
            })
        }
    }, [])

    const handleChangeColor = useCallback((e: ColorResult) => {
        context.setColor(e.hex)
    }, [])

    return (
        <div className="w-80 bg-gray-800 fixed left-0 top-0 bottom-0 px-6">
            <div className="h-24 flex justify-center py-3">
                <img className="w-28 h-10 mt-4 object-contain" src="logo-white.png" alt="" />
            </div>

            {/* Color picker */}
            <div className="">
                <TwitterPicker color={context.color} onChangeComplete={handleChangeColor} />
            </div>

            <div className="flex mb-4 justify-end mt-6">
                <input ref={inputRef} className="hidden" type="file" id="file-input" multiple accept="image/*" />
                <button
                    style={{ fontFamily: 'lobster two' }}
                    onClick={handleOpen}
                    className="text-xl w-fulls bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-medium"
                >
                    Browse Frame
                </button>
            </div>

            <div className="flex flex-wrap gap-4 image-list mt-5">
                {images.length > 0
                    ? images.map((val, i) => (
                          <div key={i} className="w-full sm:w-1/2">
                              <img className="border border-gray-600 h-40 w-full object-cover rounded-sm" draggable src={val} alt="image-list" />
                          </div>
                      ))
                    : [...Array(5)].map((_, i) => (
                          <div key={i} className="w-full sm:w-1/2">
                              <img className="border border-gray-600 h-40 w-full object-cover rounded-sm" draggable src="flower.png" alt="image-list" />
                          </div>
                      ))}
            </div>
        </div>
    )
}
