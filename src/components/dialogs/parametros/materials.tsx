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
    deleteMaterial,
    type MaterialResponseType,
} from '@/queries/parametros/materiales'

interface DeleteMaterialProps {
    material: MaterialResponseType
}

export function DeleteMaterial({ material }: Readonly<DeleteMaterialProps>) {
    const queryClient = useQueryClient()
    const mutate = useMutation({
        mutationFn: (data: MaterialResponseType) =>
            deleteMaterial({ data: { data } }),
        onSuccess: () => {
            toast.success('Material borrado correctamente')
            queryClient.invalidateQueries({
                queryKey: ['materiales'],
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
                        Está seguro que desea borrar el material {material.name}{' '}
                        con código {material.code}? Esta acción no se puede
                        deshacer
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => mutate.mutate(material)}>
                        Borrar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
