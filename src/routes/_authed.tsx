import { createFileRoute, Outlet } from '@tanstack/react-router'
import SideBar from '@/components/nav/SideBar'
import TopBar from '@/components/nav/TopBar'
import { authMiddleware } from '@/middleware/auth'

export const Route = createFileRoute('/_authed')({
    component: RouteComponent,
    server: {
        middleware: [authMiddleware],
    },
})

function RouteComponent() {
    return (
        <div className='flex gap-3'>
            <SideBar />
            <div className='flex flex-col h-screen gap-4'>
                <TopBar />
                <Outlet />
            </div>
        </div>
    )
}
