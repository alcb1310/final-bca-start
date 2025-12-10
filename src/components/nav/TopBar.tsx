import { authClient } from '@/utils/auth-client'
import { useNavigate } from '@tanstack/react-router'
import { LogOutIcon, UserIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '../ui/button'

export default function TopBar() {
    const navigate = useNavigate()
    async function handleLogout() {
        await authClient.signOut(
            {},
            {
                onSuccess: () => {
                    navigate({ to: '/login' })
                },
                onError: (error) => {
                    toast.error('Error al cerrar sesión', {
                        richColors: true,
                        position: 'top-center',
                    })

                    console.error(error)
                },
            },
        )
    }

    return (
        <nav className='flex justify-between items-center p-4'>
            <h3 className='text-xl font-bold'>
                Sistema Control Presupuestario
            </h3>
            <div>
                <Button variant='ghost' size='icon'>
                    <UserIcon />
                </Button>
                <Button variant='ghost' size='icon' onClick={handleLogout}>
                    <LogOutIcon />
                </Button>
            </div>
        </nav>
    )
}
