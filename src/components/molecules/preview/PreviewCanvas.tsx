import { fabric } from 'fabric'
import React, { useEffect, useRef, useState } from 'react'

const drawFrameCanvas = (canvas: fabric.Canvas, xSpace: number, topSpace: number) => {
    const canvasW = canvas.width ?? 0
    const canvasH = canvas.height ?? 0
    const logo = new Image()
    logo.src = 'logo-black.png'

    // const color = '#1f2937'
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
    })

    canvas.add(background)

    // add image from previous page parsed
    fabric.Image.fromURL('bill.png', (img) => {
        const xOffset = xSpace / 2
        img.left = xOffset
        img.top = topSpace

        canvas.add(img)
    })

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

export const PreviewCanvas: React.FC = () => {
    const [canvasWidth] = useState(400)
    const [canvasHeight] = useState(550)
    const drawingRef = useRef<HTMLCanvasElement>(null)
    const frameRef = useRef<HTMLCanvasElement>(null)
    const drawingContainerRef = useRef<HTMLDivElement>(null)

    const frameTopSpace = 20
    const frameBottomSpace = 75
    const frameXSpace = 40

    const frameW = canvasWidth + frameXSpace
    const frameH = canvasHeight + (frameTopSpace + frameBottomSpace)

    useEffect(() => {
        const frameCanvas = new fabric.Canvas('frame', {
            // backgroundColor: '#1f2937',
            backgroundColor: '#fff',
        })
        drawFrameCanvas(frameCanvas, frameXSpace, frameTopSpace)
    }, [])

    return (
        <div className="relative flex bg-green-200 justify-center" style={{ width: frameW, height: frameH }}>
            <div ref={drawingContainerRef} className="relative" style={{ width: canvasWidth, height: canvasHeight, zIndex: 1, marginTop: frameTopSpace }}>
                <canvas ref={drawingRef} id="drawing-area"></canvas>
            </div>
            <div className="absolute">
                <canvas ref={frameRef} id="frame" width={frameW} height={frameH}></canvas>
            </div>
        </div>
    )
}
