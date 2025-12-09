import { LogOutIcon, UserIcon } from 'lucide-react'
import { Button } from '../ui/button'

export default function TopBar() {
    return (
        <nav className='flex justify-between items-center p-4'>
            <h2 className='text-text-xl font-bold'>
                Sistema Control Presupuestario
            </h2>
            <div>
                <Button variant='ghost' size='icon'>
                    <UserIcon />
                </Button>
                <Button variant='ghost' size='icon'>
                    <LogOutIcon />
                </Button>
            </div>
        </nav>
    )
}
