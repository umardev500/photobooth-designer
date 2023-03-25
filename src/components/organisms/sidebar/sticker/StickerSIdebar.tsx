import { useCallback, useContext, useEffect, useRef } from 'react'
import { AppContext, type AppContextData } from '../../../../context'

export const StickerSidebar: React.FC = () => {
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
                                context.setStickers(dataUrls)
                            }
                        }
                    }
                }
            })
        }
    }, [])

    return (
        <div className="w-80 bg-gray-800 fixed flex flex-col left-0 top-0 bottom-0 pl-6">
            <div>
                <div className="h-24 flex justify-center py-3">
                    {/* <img className="w-16" src="vite.svg" alt="" /> */}
                    <img className="w-28 h-10 mt-4 object-contain" src="logo-white.png" alt="" />
                </div>

                <div className="flex mb-4 justify-end mt-1.5">
                    <input ref={inputRef} className="hidden" type="file" id="file-input" multiple accept="image/*" />
                    <button onClick={handleOpen} className="text-base roboto bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-medium">
                        Select Folder
                    </button>
                </div>
            </div>

            <div className="flex-1 mb-4 images-container overflow-y-auto pr-6">
                <div className="image-list gap-4 flex flex-wrap">
                    {context.stickers.length > 0
                        ? context.stickers.map((val, i) => (
                              <div key={i} className="w-full !bg-slate-700 h-36 flex justify-center sm:w-1/2">
                                  <img data-type="sticker" className="w-4/5 object-contain rounded-sm" draggable src={val} alt="image-list" />
                              </div>
                          ))
                        : [...Array(15)].map((_, i) => (
                              <div key={i} className="w-full !bg-slate-700 h-36 flex justify-center sm:w-1/2">
                                  <img data-type="sticker" className="w-4/5 object-contain rounded-sm" draggable src="sticker/flower.png" alt="image-list" />
                              </div>
                          ))}
                </div>
            </div>
        </div>
    )
}
