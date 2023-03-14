import React, { useContext, useEffect, useRef } from 'react'
import { AppContext, type AppContextData } from '../../../context'
import { Arrow } from '../../atoms'

export const Overlay: React.FC = () => {
    const previewImgRef = useRef<HTMLImageElement>(null)
    const context = useContext(AppContext) as AppContextData

    useEffect(() => {
        let wheel = 1
        const previewImage = previewImgRef.current
        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY < 0) {
                // user scrolled up
                wheel += 20
            } else if (e.deltaY > 0 && wheel > 1) {
                // user scrolled down
                wheel -= 20
            }

            wheel = parseFloat(wheel.toFixed(2))

            if (previewImage != null) {
                previewImage.style.width = `${400 + wheel}px`
                previewImage.style.height = `${550 + wheel}px`
            }
        }

        window.addEventListener('wheel', handleWheel)

        return () => {
            window.removeEventListener('wheel', handleWheel)
        }
    }, [])

    const handlePrev = () => {
        let currentIndex = context.currentPreview
        const images = context.images
        if (currentIndex > 0) {
            currentIndex -= 1
        }

        const newImage = images[currentIndex]
        const lastIndex = images.indexOf(newImage)
        context.setCurrentPreview(lastIndex)
    }
    const handleNext = () => {
        let currentIndex = context.currentPreview
        const images = context.images
        if (currentIndex + 1 < images.length) {
            currentIndex += 1
        }

        const newImage = images[currentIndex]
        const lastIndex = images.indexOf(newImage)
        context.setCurrentPreview(lastIndex)
    }

    const handleClose = () => {
        context.setOverlayToggle(false)
    }

    const currentPreviewIndex = context.currentPreview
    const currentImage = context.images[currentPreviewIndex]

    return (
        <div className="absolute flex justify-center top-0 right-0 bottom-0 left-0 z-10">
            <div className="z-20 m-auto flex items-center">
                <Arrow onClick={handlePrev} left className="mr-6 text-gray-400 hover:text-gray-500 cursor-pointer" />
                <img className="object-cover preview-image" ref={previewImgRef} id="preview-image" src={currentImage} alt="image" />
                <Arrow onClick={handleNext} className="ml-6 text-gray-400 hover:text-gray-500 cursor-pointer" />
            </div>
            <div onClick={handleClose} className="absolute overlay top-0 right-0 bottom-0 left-0 -z-20"></div>
        </div>
    )
}
