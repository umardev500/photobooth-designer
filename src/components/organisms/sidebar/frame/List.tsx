import React from 'react'
import { FixedSizeList } from 'react-window'

interface Props {
    containerHeight: number
    images: string[]
    onClick: (i: number) => void
}

export const List = React.memo(({ containerHeight, images, onClick }: Props) => {
    if (containerHeight > 0) {
        console.log('render child')

        const Row = () => (
            <div className="grid grid-cols-2 gap-4 pr-2.5">
                {images.map((val, i) => (
                    <img
                        key={i}
                        onClick={() => {
                            onClick(i)
                        }}
                        data-type="main"
                        className="border border-gray-600 h-40 w-full object-cover rounded-sm"
                        draggable
                        src={val}
                        alt="image-list"
                    />
                ))}
            </div>
        )

        return (
            <FixedSizeList height={containerHeight} itemCount={1} itemSize={35} width={'100%'}>
                {Row}
            </FixedSizeList>
        )
    }

    return null
})
