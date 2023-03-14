import { StickerCanvas } from '../../../molecules'

export const StickerContent: React.FC = () => {
    return (
        <div className="relative bg-slate-300 ml-80 p-6 h-screen flex justify-center items-center">
            <div className="relative flex justify-center items-center pr-16 pb-16 mb-20 ">
                <div className="flex items-center">
                    <StickerCanvas />
                </div>
            </div>
        </div>
    )
}
