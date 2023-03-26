import { type Canvas } from 'fabric/fabric-impl'
import React, { useMemo, useState } from 'react'
import { Toaster } from 'react-hot-toast'

export const AppContext = React.createContext({})

interface Props {
    children?: React.ReactNode
}

export interface FilterType {
    name: string
    value?: string
}

export interface AppContextData {
    color: string
    setColor: React.Dispatch<React.SetStateAction<string>>
    drawingCanvas?: fabric.Canvas
    setDrawingCanvas: React.Dispatch<React.SetStateAction<Canvas | undefined>>
    frameCanvas?: fabric.Canvas
    setFrameCanvas: React.Dispatch<React.SetStateAction<Canvas | undefined>>
    done: boolean
    setDone: React.Dispatch<React.SetStateAction<boolean>>
    filters: FilterType[]
    setCurrentFilter: React.Dispatch<React.SetStateAction<number>>
    currentFilter: number
    setCurrentImage: React.Dispatch<React.SetStateAction<number>>
    currentImage: number
    images: string[]
    setImages: React.Dispatch<React.SetStateAction<string[]>>
    imagesFull: string[]
    setImagesFull: React.Dispatch<React.SetStateAction<string[]>>
    currentPreview: number
    setCurrentPreview: React.Dispatch<React.SetStateAction<number>>
    overlayToggle: boolean
    setOverlayToggle: React.Dispatch<React.SetStateAction<boolean>>
    stickers: string[]
    setStickers: React.Dispatch<React.SetStateAction<string[]>>
}

export const AppProvider: React.FC<Props> = ({ children }) => {
    const [done, setDone] = useState<boolean>(false)
    const [color, setColor] = useState<string>('#fff')
    const [drawingCanvas, setDrawingCanvas] = useState<fabric.Canvas>()
    const [frameCanvas, setFrameCanvas] = useState<fabric.Canvas>()
    const [filters] = useState<FilterType[]>([
        {
            name: 'full-color',
            value: 'filters/full-color.png',
        },
        {
            name: 'monochrome',
            value: 'filters/monochrome.png',
        },
    ])
    const [currentFilter, setCurrentFilter] = useState<number>(0)
    // const [images, setImages] = useState<string[]>(['sharp6.JPG'])
    const [imagesFull, setImagesFull] = useState<string[]>([])
    const [images, setImages] = useState<string[]>([
        'photo.jpg',
        'sharp6.JPG',
        'flower2.jpg',
        'flower.png',
        'flower3.jpg',
        'flower4.jpg',
        'flower5.jpg',
        'sharp6.JPG',
        'photo.jpg',
        'flower2.jpg',
        'flower.png',
    ])
    const [currentImage, setCurrentImage] = useState<number>(0)
    const [currentPreview, setCurrentPreview] = useState<number>(0)
    const [overlayToggle, setOverlayToggle] = useState<boolean>(false)
    const [stickers, setStickers] = useState<string[]>([])

    const data = useMemo<AppContextData>(() => {
        return {
            imagesFull,
            setImagesFull,
            stickers,
            setStickers,
            overlayToggle,
            setOverlayToggle,
            currentPreview,
            setCurrentPreview,
            images,
            setImages,
            currentImage,
            setCurrentImage,
            color,
            setColor,
            drawingCanvas,
            setDrawingCanvas,
            frameCanvas,
            setFrameCanvas,
            done,
            setDone,
            filters,
            currentFilter,
            setCurrentFilter,
        }
    }, [color, drawingCanvas, frameCanvas, done, currentFilter, currentImage, images, currentPreview, overlayToggle, stickers])

    return (
        <AppContext.Provider value={data}>
            <Toaster />
            {children}
        </AppContext.Provider>
    )
}
