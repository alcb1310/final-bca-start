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
                        <p>
                            Esta seguro que desea borrar el material{' '}
                            {rubroMaterial.material_name} del rubro{' '}
                            {rubroMaterial.item_name}?
                        </p>
                        <br />
                        <p className='text-destructive text-lg'>
                            Esta acción no se puede deshacer.
                        </p>
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
