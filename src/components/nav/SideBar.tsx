import { Link } from '@tanstack/react-router'
import {
    CreditCardIcon,
    FolderOpenIcon,
    type LucideProps,
    ShoppingCartIcon,
} from 'lucide-react'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from '@/components/ui/sidebar'
import type { FileRoutesByTo } from '@/routeTree.gen'

type MenuItem = {
    title: string
    // TODO: remove the '#' option
    path: keyof FileRoutesByTo | '#'
    icon?: ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >
}

type Menu = {
    title: string
    items: MenuItem[]
}

const menu: Menu[] = [
    {
        title: 'Transacciones',
        items: [
            { title: 'Presupuesto', path: '#', icon: ShoppingCartIcon },
            { title: 'Facturas', path: '#', icon: CreditCardIcon },
        ],
    },
    {
        title: 'Reportes',
        items: [{ title: 'Actual', path: '#', icon: FolderOpenIcon }],
    },
]

export default function SideBar() {
    return (
        <Sidebar>
            <SidebarHeader className='flex justify-center items-center text-2xl font-bold'>
                <Link to='/dashboard'>BCA</Link>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
                {menu.map((men) => (
                    <SidebarGroup key={men.title}>
                        <SidebarGroupLabel>{men.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {men.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link to={item.path}>
                                                <div className='flex gap-4 justify-center'>
                                                    {item.icon && (
                                                        <item.icon size={16} />
                                                    )}
                                                    <span>{item.title}</span>
                                                </div>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
        </Sidebar>
    )
}
