import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AppProvider } from './context'
import './main.css'
import { router } from './routes/Router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <AppProvider>
        <RouterProvider router={router} />
    </AppProvider>
)
