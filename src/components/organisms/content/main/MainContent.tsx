import { fabric } from 'fabric'
import { useContext, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useMatch, useNavigate } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import { AppContext, type AppContextData } from '../../../../context'
import { Arrow } from '../../../atoms'
import { MainFrame } from '../../../molecules'

export const MainContent: React.FC = () => {
    const rotateRef = useRef<HTMLInputElement>(null)
    const isRoot = useMatch('/') !== null
    const isPreview = useMatch('/preview') !== null
    const isFilter = useMatch('/filter') !== null
    const context = useContext(AppContext) as AppContextData
    const [result, setResult] = useState<string>('bill.png')
    const componentRef = useRef<HTMLImageElement>(null)

    const frameTopSpace = 20
    const frameXSpace = 40

    const handleDone = () => {
        const drawing = context.drawingCanvas
        const frame = context.frameCanvas
        const dataURL = drawing?.toDataURL() ?? ''

        const resultImage = new Image()
        resultImage.src = dataURL

        const doDone = async (): Promise<any> => {
            const img = new fabric.Image(resultImage)
            // draw result image to frame canvas
            if (frame !== null) {
                img.left = frameXSpace / 2
                img.top = frameTopSpace
                img.set({ lockMovementX: true, lockMovementY: true })
                frame?.add(img)
            }

            frame?.renderAll()
            context.setDone(true)
            const resultDataURL = frame?.toDataURL() ?? ''
            setResult(resultDataURL)

            await Promise.resolve()
        }

        resultImage.onload = () => {
            drawing?.clear()

            toast
                .promise(
                    doDone(),
                    {
                        error: 'Something went wrong',
                        loading: 'Loading...',
                        success: 'All done!',
                    },
                    { className: 'roboto' }
                )
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    const handlePrevFilter = () => {
        let currentFilter = context.currentFilter
        if (currentFilter > 0) {
            currentFilter -= 1
        }

        const newFilter = context.filters[currentFilter]
        const lastIndex = context.filters.indexOf(newFilter)
        context.setCurrentFilter(lastIndex)
    }

    const handleNextFilter = () => {
        let currentFilter = context.currentFilter
        if (currentFilter + 1 < context.filters.length) {
            currentFilter += 1
        }

        const newFilter = context.filters[currentFilter]
        const lastIndex = context.filters.indexOf(newFilter)
        context.setCurrentFilter(lastIndex)
    }

    const handleNextImage = () => {
        let currentImage = context.currentImage
        const images = context.imagesFull
        if (currentImage + 1 < images.length) {
            currentImage += 1
        }

        const newImage = images[currentImage]
        const lastIndex = images.indexOf(newImage)
        context.setCurrentImage(lastIndex)
        context.setCurrentFilter(0)
    }

    const handlePrevImage = () => {
        let currentImage = context.currentImage
        const images = context.imagesFull
        if (currentImage > 0) {
            currentImage -= 1
        }

        const newImage = images[currentImage]
        const lastIndex = images.indexOf(newImage)
        context.setCurrentImage(lastIndex)
        context.setCurrentFilter(0)
    }

    const selectPrevHandler = (): (() => void) => {
        if (isFilter) return handlePrevFilter
        if (isRoot) return handlePrevImage

        return () => {
            console.log('default')
        }
    }

    const selectNextHandler = (): (() => void) => {
        if (isFilter) return handleNextFilter
        if (isRoot) return handleNextImage

        return () => {
            console.log('default')
        }
    }

    const navigate = useNavigate()
    const handleBack = () => {
        navigate(-1)
    }

    return (
        <div className={`relative bg-slate-300 ${!isPreview ? 'ml-80' : ''} p-6 h-screen flex justify-center items-center`}>
            <div className={`relative flex justify-center items-center mb-32 `}>
                <div className="flex items-center">
                    {!isPreview ? <Arrow onClick={selectPrevHandler()} left className="mr-6 text-slate-400 hover:text-slate-500 cursor-pointer" w={35} h={54} /> : null}
                    <MainFrame />
                    {!isPreview ? <Arrow onClick={selectNextHandler()} className="ml-6 text-slate-400 hover:text-slate-500 cursor-pointer" w={35} h={54} /> : null}
                </div>
                {isRoot ? (
                    <>
                        {/* rotate */}
                        <div className="absolute bottom-0 left-0 right-0 rotate-slider">
                            <input id="rotation" ref={rotateRef} type="range" name="slider" className="slider-range" min="-180" max="180" defaultValue={0} />
                            <div className="rotate-text roboto font-medium text-gray-700 absolute">Rotate</div>
                        </div>
                        {/* zoom */}
                        <div className="absolute z-10 zoom-slider flex justify-center">
                            <input type="range" name="slider" id="zoom" className="slider-range" min="0" max="500" defaultValue={0} />
                            <div className="zoom-text roboto font-medium text-gray-700 absolute">Zoom</div>
                        </div>
                    </>
                ) : null}
            </div>

            {isPreview ? (
                <>
                    <img className="absolute -z-20" ref={componentRef} id="img-result" src={result} alt="result" />
                    <div className="absolute bottom-16 flex items-center justify-center gap-10">
                        {/* Done */}
                        <div onClick={handleDone} id="done" className="flex justify-center items-center flex-col cursor-pointer">
                            <div className="text-gray-200 w-20 h-20 bg-slate-600 hover:bg-slate-700 rounded-full flex items-center justify-center">
                                <svg width="31" height="24" viewBox="0 0 31 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.3272 16.9893L26.2016 1.11491C26.6949 0.621636 27.3227 0.375 28.085 0.375C28.8474 0.375 29.4752 0.621636 29.9684 1.11491C30.4617 1.60818 30.7083 2.23598 30.7083 2.99832C30.7083 3.76065 30.4617 4.38845 29.9684 4.88173L12.2106 22.6396C11.6725 23.1777 11.0447 23.4467 10.3272 23.4467C9.60969 23.4467 8.98189 23.1777 8.44377 22.6396L1.44825 15.6441C0.954979 15.1508 0.708344 14.523 0.708344 13.7606C0.708344 12.9983 0.954979 12.3705 1.44825 11.8772C1.94153 11.384 2.56933 11.1373 3.33166 11.1373C4.09399 11.1373 4.7218 11.384 5.21507 11.8772L10.3272 16.9893Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                            <span className="mt-4 roboto font-medium text-slate-700">DONE</span>
                        </div>
                        {/* Print */}
                        <div onClick={handlePrint} className="flex justify-center items-center flex-col cursor-pointer">
                            <div className="text-gray-200 w-20 h-20 bg-slate-600 hover:bg-slate-700 rounded-full flex items-center justify-center">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M11.6667 8.33333C11.6667 5.56667 13.9 3.33333 16.6667 3.33333H23.3333C26.1 3.33333 28.3333 5.56667 28.3333 8.33333C28.3333 9.25 27.5833 10 26.6667 10H13.3333C12.4167 10 11.6667 9.25 11.6667 8.33333ZM29.5833 25C29.5833 25.6833 29.0167 26.25 28.3333 26.25H26.6667V31.6667C26.6667 34.4333 24.4333 36.6667 21.6667 36.6667H18.3333C15.5667 36.6667 13.3333 34.4333 13.3333 31.6667V26.25H11.6667C10.9833 26.25 10.4167 25.6833 10.4167 25C10.4167 24.3167 10.9833 23.75 11.6667 23.75H28.3333C29.0167 23.75 29.5833 24.3167 29.5833 25Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M30 11.6667H10C6.66667 11.6667 5 13.3333 5 16.6667V25C5 28.3333 6.66667 30 10 30H10.625C11.2 30 11.6667 29.5333 11.6667 28.9583C11.6667 28.3833 11.185 27.9333 10.6467 27.73C10.0915 27.5203 9.61293 27.147 9.27429 26.6596C8.93566 26.1722 8.75284 25.5935 8.75 25C8.75 23.4 10.0667 22.0833 11.6667 22.0833H28.3333C29.9333 22.0833 31.25 23.4 31.25 25C31.2472 25.5935 31.0643 26.1722 30.7257 26.6596C30.3871 27.147 29.9085 27.5203 29.3533 27.73C28.815 27.9333 28.3333 28.3833 28.3333 28.9583C28.3333 29.5333 28.8 30 29.375 30H30C33.3333 30 35 28.3333 35 25V16.6667C35 13.3333 33.3333 11.6667 30 11.6667ZM16.6667 19.5833H11.6667C10.9833 19.5833 10.4167 19.0167 10.4167 18.3333C10.4167 17.65 10.9833 17.0833 11.6667 17.0833H16.6667C17.35 17.0833 17.9167 17.65 17.9167 18.3333C17.9167 19.0167 17.35 19.5833 16.6667 19.5833Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                            <span className="mt-4 roboto font-medium text-slate-700">PRINT</span>
                        </div>
                    </div>
                    <div className="absolute flex items-center top-10 left-10 cursor-pointer">
                        <div onClick={handleBack} className="text-slate-500 hover:text-slate-600">
                            <svg width="35" height="35" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.77234 5.43585L3.20817 11L8.77234 16.5642M18.7915 11H3.364"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        <span className="text-lg ml-8 text-slate-700 roboto">Preview</span>
                    </div>
                </>
            ) : null}
        </div>
    )
}
