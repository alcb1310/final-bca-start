import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CreateProjectDrawer() {
    return (
        <Button variant='ghost' className='mb-3'>
            <PlusIcon size={10} />
            Crear Proyecto
        </Button>
    )
}
