import { useContext } from 'react'
import { Overlay } from '../components/organisms/overlay'
import { FrameSidebar } from '../components/organisms/sidebar/frame'
import { AppContext, type AppContextData } from '../context'

export const Home: React.FC = () => {
    const context = useContext(AppContext) as AppContextData
    return (
        <>
            <FrameSidebar />
            {context.overlayToggle ? <Overlay /> : null}
        </>
    )
}
