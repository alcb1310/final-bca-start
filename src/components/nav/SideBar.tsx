import { Link } from '@tanstack/react-router'
import {
    BanknoteArrowDownIcon,
    BrickWallIcon,
    CableIcon,
    ChartBarStackedIcon,
    ChartCandlestickIcon,
    ChartSplineIcon,
    ClipboardClockIcon,
    CreditCardIcon,
    FolderKanbanIcon,
    FolderOpenIcon,
    LayoutListIcon,
    type LucideProps,
    ScaleIcon,
    ShellIcon,
    ShoppingBasketIcon,
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
            { title: 'Cierre mensual', path: '#', icon: ChartCandlestickIcon },
        ],
    },
    {
        title: 'Reportes',
        items: [
            { title: 'Actual', path: '#', icon: FolderOpenIcon },
            { title: 'Cuadre', path: '#', icon: ScaleIcon },
            {
                title: 'Gastado por Partida',
                path: '#',
                icon: BanknoteArrowDownIcon,
            },
            { title: 'Histórico', path: '#', icon: ClipboardClockIcon },
        ],
    },
    {
        title: 'Parámetros',
        items: [
            {
                title: 'Partidas',
                path: '/parametros/partidas',
                icon: LayoutListIcon,
            },
            { title: 'Categorias', path: '#', icon: ChartBarStackedIcon },
            { title: 'Materiales', path: '#', icon: BrickWallIcon },
            {
                title: 'Proyectos',
                path: '/parametros/proyectos',
                icon: FolderKanbanIcon,
            },
            {
                title: 'Proveedores',
                path: '/parametros/proveedores',
                icon: CableIcon,
            },
            { title: 'Rubros', path: '#', icon: ShoppingBasketIcon },
        ],
    },
    {
        title: 'Analisis',
        items: [
            { title: 'Cantidades', path: '#', icon: ShellIcon },
            { title: 'Analisis', path: '#', icon: ChartSplineIcon },
        ],
    },
]

export default function SideBar() {
    return (
        <Sidebar>
            <SidebarHeader className='flex justify-center items-center text-2xl font-bold'>
                <Link to='/dashboard'>BCA</Link>
            </SidebarHeader>
            <SidebarContent>
                {menu.map((men) => (
                    <SidebarGroup key={men.title}>
                        <SidebarGroupLabel className='bg-primary text-primary-foreground'>
                            {men.title}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {men.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            size='sm'
                                            className='text-primary'
                                            asChild
                                        >
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
