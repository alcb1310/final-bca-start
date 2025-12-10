import { createFileRoute, Outlet } from '@tanstack/react-router'
import SideBar from '@/components/nav/SideBar'
import TopBar from '@/components/nav/TopBar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { authMiddleware } from '@/middleware/auth'

export const Route = createFileRoute('/_authed')({
    component: RouteComponent,
    server: {
        middleware: [authMiddleware],
    },
})

function RouteComponent() {
    return (
        <SidebarProvider>
            <SideBar />
            <SidebarInset>
                <TopBar />
                <main className='px-4'>
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
