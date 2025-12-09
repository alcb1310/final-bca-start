/// <reference types="vite/client" />
import {
    createRootRoute,
    HeadContent,
    Outlet,
    Scripts,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { Toaster } from '@/components/ui/sonner'

import appCss from '../styles.css?url'
import { SidebarProvider } from '@/components/ui/sidebar'

export const Route = createRootRoute({
    head: () => ({
        meta: [
            { charSet: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            { title: 'Budget Control Application' },
        ],
        links: [{ rel: 'stylesheet', href: appCss }],
    }),
    component: RootComponent,
})

function RootComponent() {
    return (
        <RootDocument>
            <Outlet />
        </RootDocument>
    )
}

function RootDocument({ children }: { children: ReactNode }) {
    return (
        <html lang='en'>
            <head>
                <HeadContent />
            </head>
            <body>
                <SidebarProvider>{children}</SidebarProvider>
                <Scripts />
                <Toaster position='bottom-right' />
            </body>
        </html>
    )
}
