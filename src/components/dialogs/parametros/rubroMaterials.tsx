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
import type { RubroMaterialType } from '@/queries/parametros/rubros'

type DeleteRubroMaterialProps = {
    rubroMaterial: RubroMaterialType
}

export function DeleteRubroMaterial({
    rubroMaterial,
}: Readonly<DeleteRubroMaterialProps>) {
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
                        Esta seguro que desea borrar el material{' '}
                        <span className='font-bold text-destructive'>
                            {rubroMaterial.material_name}
                        </span>{' '}
                        del rubro{' '}
                        <span className='font-bold text-destructive'>
                            {rubroMaterial.item_name}
                        </span>
                        ?
                        <br />
                        Esta acción no se puede deshacer.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => { }}>
                        Borrar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
