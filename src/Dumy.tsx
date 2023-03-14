import { useEffect } from 'react'
import { fabric } from 'fabric'

export const Dumy: React.FC = () => {
    useEffect(() => {
        const image = new Image()
        image.src = 'bill.jpeg'
        const canvas = new fabric.Canvas('drawing-canvas', {
            width: 800,
            height: 800,
            backgroundColor: '#eee',
        })

        image.onload = () => {
            const img = new fabric.Image(image)
            img.rotate(90)
            canvas.add(img)
        }
    }, [])

    return (
        <div className="flex justify-center mt-4">
            <canvas id="drawing-canvas"></canvas>
        </div>
    )
}
