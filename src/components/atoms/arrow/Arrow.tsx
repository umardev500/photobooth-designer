interface Props {
    left?: boolean
    className?: string
    w?: number
    h?: number
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}

export const Arrow: React.FC<Props> = ({ left = false, className, w = 25, h = 44, onClick }) => {
    return (
        <div onClick={onClick} className={className}>
            {!left ? (
                <svg width={w} height={h} viewBox="0 0 25 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M22.2251 17.2465L16.0387 11.06L5.95821 0.979529C3.82278 -1.12449 0.179993 0.382866 0.179993 3.39759V40.5791C0.179993 43.5939 3.82278 45.1012 5.95821 42.9658L22.2251 26.6989C24.8316 24.1238 24.8316 19.8529 22.2251 17.2465Z"
                        fill="currentColor"
                    />
                </svg>
            ) : (
                <svg width={w} height={h} viewBox="0 0 25 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M18.3972 1.00126L8.31706 11.0814L2.13079 17.2363C0.878595 18.4904 0.175278 20.1902 0.175278 21.9624C0.175278 23.7346 0.878595 25.4343 2.13079 26.6884L18.3972 42.9549C20.5326 45.0903 24.1753 43.5515 24.1753 40.5683V3.38785C24.1753 0.373217 20.5326 -1.1341 18.3972 1.00126Z"
                        fill="currentColor"
                    />
                </svg>
            )}
        </div>
    )
}
