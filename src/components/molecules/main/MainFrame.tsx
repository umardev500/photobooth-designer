import { fabric } from 'fabric'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext, type AppContextData } from '../../../context'
import { DrawImage } from '../../../helper'
fabric.textureSize = 8192

const drawImageOnCanvas = (canvas: fabric.Canvas, w: number, h: number, source: string): fabric.Canvas => {
    const defaultImage = new Image()
    defaultImage.src = 'uploads/real-2.jpg' + `?${Date.now()}`

    let mainImage: fabric.Image
    defaultImage.onload = () => {
        const img = DrawImage(canvas, defaultImage, w, h)

        mainImage = img
    }

    canvas.on('drop', function (e: fabric.IEvent<MouseEvent>) {
        const event = e.e as DragEvent
        const theDragImageStr = event.dataTransfer?.getData('text/html') ?? ''
        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = theDragImageStr
        const theDrageImageElem = tempDiv.querySelector('img') as HTMLImageElement
        const imgURL = theDrageImageElem.dataset.url ?? ''
        const imgType = theDrageImageElem?.dataset.type ?? ''
        const newImage = new Image()
        newImage.src = imgURL

        if (imgType === 'sticker') {
            const stickerImg = new fabric.Image(theDrageImageElem)
            mainImage.selectable = false
            canvas.setActiveObject(stickerImg)
            canvas.add(stickerImg)
        }

        if (imgType === 'main') {
            canvas.clear()
            newImage.onload = () => {
                const img = DrawImage(canvas, newImage, w, h)

                mainImage = img
            }
        }
    })

    return canvas
}

const drawFrameCanvas = (canvas: fabric.Canvas) => {
    const canvasW = canvas.width ?? 0
    const canvasH = canvas.height ?? 0
    const logo = new Image()
    logo.src = 'logo-black.png'

    const color = '#fff'
    const background = new fabric.Rect({
        left: 0,
        top: 0,
        width: canvas.width,
        height: canvas.height,
        fill: color,
        lockMovementX: true,
        lockMovementY: true,
        hasControls: false,
        hasBorders: false,
        selectable: false,
        name: 'bg',
    })

    canvas.add(background)

    logo.onload = () => {
        const img = new fabric.Image(logo)
        const imgW = img.width ?? 0
        const imgH = img.height ?? 0
        const imageToFrame = 20
        const scale = 0.7
        img.scale(scale)

        const scaledImgW = imgW * scale
        const scaledImgH = imgH * scale

        img.set({
            top: canvasH - (scaledImgH + imageToFrame),
            left: canvasW / 2 - scaledImgW / 2,
        })

        canvas.add(img)
    }
}

export const MainFrame: React.FC = () => {
    const [canvasWidth] = useState(400)
    const [canvasHeight] = useState(550)
    const drawingRef = useRef<HTMLCanvasElement>(null)
    const frameRef = useRef<HTMLCanvasElement>(null)
    const drawingContainerRef = useRef<HTMLDivElement>(null)
    const imgW = canvasWidth
    const imgH = canvasHeight

    const frameTopSpace = 20
    const frameBottomSpace = 75
    const frameXSpace = 40

    const context = useContext(AppContext) as AppContextData

    useEffect(() => {
        const canvas = new fabric.Canvas('drawing-area', {
            width: canvasWidth,
            height: canvasHeight,
        })

        const currentImageIndex = context.currentImage
        const currentImageLink = context.imagesFull[currentImageIndex]

        drawImageOnCanvas(canvas, imgW, imgH, currentImageLink)
        context.setDrawingCanvas(canvas)

        const deleteBtn = document.querySelector('#delete') as HTMLButtonElement

        // frame
        const canvasFrame = new fabric.Canvas('frame', {
            // backgroundColor: '#1f2937',
            backgroundColor: '#fff',
        })
        drawFrameCanvas(canvasFrame)
        context.setFrameCanvas(canvasFrame)

        const deleteHandler = (e: MouseEvent) => {
            const drawedImage = canvasFrame.getObjects()[2]
            if (drawedImage !== undefined) {
                canvasFrame.remove(drawedImage)
                const drawingContainer = drawingContainerRef.current
                if (drawingContainer != null) drawingContainer.style.zIndex = '1'
            }
            canvas.clear()
            canvas.renderAll()
        }
        deleteBtn.addEventListener('click', deleteHandler)

        return () => {
            deleteBtn.removeEventListener('click', deleteHandler)
            canvas.dispose()
            canvasFrame.dispose()
        }
    }, [context.currentImage, context.images])

    // listening for filter change
    useEffect(() => {
        const filterIndex = context.currentFilter
        const currentFilter = context.filters[filterIndex]
        const filter = currentFilter.name

        if (context.drawingCanvas !== null) {
            if (filter === 'monochrome') {
                context.drawingCanvas?.forEachObject((each) => {
                    const newEl = each as fabric.Image
                    newEl.filters?.push(new fabric.Image.filters.Grayscale())
                    newEl.applyFilters()
                    context.drawingCanvas?.renderAll()
                })
            }
            if (filter === 'full-color') {
                context.drawingCanvas?.forEachObject((each) => {
                    const newEl = each as fabric.Image
                    if (newEl.filters != null) newEl.filters.length = 0
                    newEl.applyFilters()
                    context.drawingCanvas?.renderAll()
                })
            }
        }
    }, [context.currentFilter])

    // listening for color change
    useEffect(() => {
        if (context.frameCanvas !== null) {
            const objs = context.frameCanvas?.getObjects() ?? []
            for (let i = 0; i < objs.length; i++) {
                const name = objs[i].name
                if (name === 'bg') {
                    objs[i].set('fill', context.color)
                    context.frameCanvas?.renderAll()
                    break
                }
            }
        }
    }, [context.color])

    // listening for done
    useEffect(() => {
        if (context.done) {
            const drawingContainer = drawingContainerRef.current
            if (drawingContainer != null) drawingContainer.style.zIndex = '-1'
        }
    }, [context.done])

    return (
        <>
            <div className="relative flex bg-green-200 px-4 justify-center" style={{ width: canvasWidth + frameXSpace, height: canvasHeight + (frameTopSpace + frameBottomSpace) }}>
                <div ref={drawingContainerRef} className="relative" style={{ width: canvasWidth, height: canvasHeight, zIndex: 1, marginTop: frameTopSpace }}>
                    <canvas ref={drawingRef} id="drawing-area"></canvas>
                </div>
                <button id="delete" className="outline-none absolute z-20 right-8 top-8 delete-button">
                    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M30.625 8.72091C25.7688 8.23966 20.8833 7.99175 16.0125 7.99175C13.125 7.99175 10.2375 8.13758 7.35 8.42925L4.375 8.72091M12.3958 7.248L12.7167 5.33758C12.95 3.95216 13.125 2.91675 15.5896 2.91675H19.4104C21.875 2.91675 22.0646 4.0105 22.2833 5.35216L22.6042 7.248M27.4896 13.3292L26.5417 28.0147C26.3813 30.3042 26.25 32.0834 22.1813 32.0834H12.8188C8.75 32.0834 8.61875 30.3042 8.45833 28.0147L7.51042 13.3292M15.0646 24.0626H19.9208M13.8542 18.2292H21.1458"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <div className="absolute">
                    <canvas ref={frameRef} id="frame" width={canvasWidth + frameXSpace} height={canvasHeight + (frameTopSpace + frameBottomSpace)}></canvas>
                </div>
            </div>
        </>
    )
}
