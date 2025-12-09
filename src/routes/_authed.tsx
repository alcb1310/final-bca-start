import { createFileRoute, Outlet } from '@tanstack/react-router'
import SideBar from '@/components/nav/SideBar'
import TopBar from '@/components/nav/TopBar'
import { authMiddleware } from '@/middleware/auth'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

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
                <main>
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
