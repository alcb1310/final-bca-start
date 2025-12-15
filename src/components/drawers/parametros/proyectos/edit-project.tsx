import { PencilIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import type { ProjectResponseType } from '@/queries/parametros/projects'

interface EditProjectDraserProps {
    project: ProjectResponseType
}

export default function EditProjectDraser({
    project,
}: Readonly<EditProjectDraserProps>) {
    return (
        <Drawer direction='right'>
            <DrawerTrigger asChild>
                <Button variant='ghost' size='icon-sm'>
                    <PencilIcon className='text-warning' size={16} />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Editar Proyecto</DrawerTitle>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    )
}
