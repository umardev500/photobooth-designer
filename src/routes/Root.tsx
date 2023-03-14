import React from 'react'
import { Outlet, useMatch } from 'react-router-dom'
import { Header, MainContent } from '../components/organisms'

export const Root: React.FC = () => {
    const isPreview = useMatch('/preview')

    return (
        <div className="min-h-screen">
            {isPreview == null ? <Header /> : null}
            <MainContent />
            {isPreview == null ? <Outlet /> : null}
        </div>
    )
}
