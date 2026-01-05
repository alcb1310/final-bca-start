import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TrashIcon } from 'lucide-react'
import { toast } from 'sonner'
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
import {
    deleteRubroMaterial,
    type RubroMaterialType,
} from '@/queries/parametros/rubros'

type DeleteRubroMaterialProps = {
    rubroMaterial: RubroMaterialType
}

export function DeleteRubroMaterial({
    rubroMaterial,
}: Readonly<DeleteRubroMaterialProps>) {
    const queryClient = useQueryClient()
    const mutate = useMutation({
        mutationFn: (data: RubroMaterialType) =>
            deleteRubroMaterial({ data: { data } }),
        onSuccess: () => {
            toast.success('Material borrado correctamente')
            queryClient.invalidateQueries({
                queryKey: ['rubro', rubroMaterial.item_id],
            })
        },
        onError: (error) => {
            console.error('error', error)
            toast.error('Error al borrar la categoría', {
                richColors: true,
                position: 'top-center',
            })
        },
    })

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
                    <AlertDialogAction
                        onClick={() => {
                            mutate.mutate(rubroMaterial)
                        }}
                    >
                        Borrar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
