import { BackgroundCanvas } from '../../../molecules'

export const BackgroundContent: React.FC = () => {
    return (
        <div className="relative bg-slate-300 ml-80 p-6 h-screen flex justify-center items-center">
            <div className="relative flex justify-center items-center mb-20 ">
                <div className="flex items-center">
                    <BackgroundCanvas />
                </div>
            </div>
        </div>
    )
}
