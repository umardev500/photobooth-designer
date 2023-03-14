import { createBrowserRouter } from 'react-router-dom'
import { Background, Filter, Home, Preview, Sticker } from '../pages'
import { Root } from './Root'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/filter',
                element: <Filter />,
            },
            {
                path: '/background',
                element: <Background />,
            },
            {
                path: '/sticker',
                element: <Sticker />,
            },
            {
                path: '/preview',
                element: <Preview />,
            },
        ],
    },
])
