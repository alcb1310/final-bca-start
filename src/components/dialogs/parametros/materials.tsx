import { TrashIcon } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import type { MaterialResponseType } from '@/queries/parametros/materiales'

interface DeleteMaterialProps {
    material: MaterialResponseType
}

export function DeleteMaterial({ material }: Readonly<DeleteMaterialProps>) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant='ghost' size={'icon-sm'}>
                    <TrashIcon size={10} className='text-destructive' />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Borrar material</AlertDialogTitle>
                    <AlertDialogDescription>
                        Está seguro que desea borrar el material {material.name}{' '}
                        con código {material.code}? Esta acción no se puede
                        deshacer
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction>Borrar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
