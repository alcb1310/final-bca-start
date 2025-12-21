import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CreateItemDrawer() {
    return (
        <div>
            <Button variant='default' size='sm'>
                <PlusIcon size={10} />
                Crear Partida
            </Button>
        </div>
    )
}
