import { Link, useLocation, useMatch } from 'react-router-dom'
import '../../../assets/css/header.css'

export const Header: React.FC = () => {
    const isRoot = useMatch('/') != null ? 'active' : ''
    const isFilter = useMatch('filter') != null ? 'active' : ''
    const isBackground = useMatch('background') != null ? 'active' : ''
    const isSticker = useMatch('sticker') != null ? 'active' : ''
    const loc = useLocation()
    // const currentLocation = loc.pathname
    // console.log(currentLocation)
    // const prevLoc = loc.state

    return (
        <nav className="header flex justify-center items-center h-20 ml-80 px-4 py-4 bg-gray-800">
            <ul className="flex justify-center navigation items-center">
                <li>
                    <Link to={'/'} state={loc.pathname} className={`text-gray-200 hover:text-gray-400 text-2xl font-normal roboto flex items-center ${isRoot}`}>
                        FRAME
                    </Link>
                </li>
                <li>
                    <Link to={'/filter'} state={loc.pathname} className={`text-gray-200 hover:text-gray-400 text-2xl font-normal roboto flex items-center ${isFilter}`}>
                        FILTER
                    </Link>
                </li>
                <li>
                    <Link to={'/background'} state={loc.pathname} className={`text-gray-200 hover:text-gray-400 text-2xl font-normal roboto flex items-center ${isBackground}`}>
                        BACKGROUND
                    </Link>
                </li>
                <li>
                    <Link to={'/sticker'} state={loc.pathname} className={`text-gray-200 hover:text-gray-400 text-2xl font-normal roboto flex items-center ${isSticker}`}>
                        STICKER
                    </Link>
                </li>
                <li>
                    <Link to={'/preview'} className={`text-gray-200 hover:text-gray-400 text-2xl font-normal roboto flex items-center`}>
                        PREVIEW
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
