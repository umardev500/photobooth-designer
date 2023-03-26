import { fabric } from 'fabric'
export const DrawImage = (canvas: fabric.Canvas, theImage: HTMLImageElement, w: number, h: number): fabric.Image => {
    const img = new fabric.Image(theImage)
    const imgW = img.width ?? 0
    const imgH = img.height ?? 0
    const scaleX = w / imgW
    const scaleY = h / imgH
    const scaleFactor = Math.max(scaleX, scaleY)

    img.scale(scaleFactor)
    const scaledW = imgW * scaleFactor
    const xOffset = Math.min((w - scaledW) / 2, 0)
    img.left = xOffset

    img.set({ hasBorders: false, hasControls: false })

    canvas.add(img)

    // rotation
    const rotation = document.querySelector('#rotation') as HTMLInputElement
    const zoom = document.querySelector('#zoom') as HTMLInputElement
    if (rotation !== null && zoom !== null) {
        rotation.addEventListener('input', () => {
            const value = parseInt(rotation.value)
            img.rotate(value)

            canvas.renderAll()
        })

        let newScale = scaleFactor
        let prevValue = parseFloat(zoom.value) / 100
        zoom.addEventListener('input', () => {
            let value = parseFloat(zoom.value)
            value = value / 100

            const diff = Math.abs(value - prevValue)
            const scaleFactor = 1 + diff * 0.1 // adjust this factor as needed

            if (value < prevValue) {
                newScale /= scaleFactor // decrease newScale by factor based on difference
            } else {
                newScale *= scaleFactor // increase newScale by factor based on difference
            }
            prevValue = value // update previous value to current value

            img.scale(newScale)
            canvas.renderAll()
        })
    }

    return img
}
