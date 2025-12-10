import { Link } from '@tanstack/react-router'
import { ChevronDownIcon, UserIcon } from 'lucide-react'
import { Button } from '../ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export default function UserMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon'>
                    <div className='flex gap-0 items-center'>
                        <UserIcon />
                        <ChevronDownIcon />
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link to='/usuarios/perfil'>Mi Perfil</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Administrar</DropdownMenuItem>
                    <DropdownMenuItem>Contrseña</DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
