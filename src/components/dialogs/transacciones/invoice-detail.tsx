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
    borraDetalles,
    type DetalleResponseType,
} from '@/queries/transacciones/detalle'

type DeteailDeleteDialogProps = {
    row: DetalleResponseType
}

export function DeleteInvoiceDetailDialog({
    row,
}: Readonly<DeteailDeleteDialogProps>) {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (data: { invoice_id: string; budget_item_id: string }) =>
            borraDetalles({ data: { data } }),
        onSuccess: () => {
            toast.success('Detalle borrado correctamente')
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ['factura', row.invoice.id],
                }),
                queryClient.invalidateQueries({
                    queryKey: ['detalle', row.invoice.id],
                }),
            ])
        },
        onError: (error) => {
            console.error('error', error)
            toast.error('Error al borrar el detalle', {
                richColors: true,
                position: 'top-center',
            })
        },
    })

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant='ghost'
                    size={'icon-sm'}
                    className='text-destructive'
                >
                    <TrashIcon />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Borrar Detalle</AlertDialogTitle>
                    <AlertDialogDescription>
                        <p>
                            Está seguro que desea borrar el detalle{' '}
                            {row.budget_item.name} de la factura{' '}
                            {row.invoice.invoice_number} del proveedor{' '}
                            {row.supplier.name}?
                        </p>
                        <br />
                        <p className='text-destructive text-lg'>
                            Esta acción no se puede deshacer
                        </p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() =>
                            mutation.mutate({
                                invoice_id: row.invoice.id,
                                budget_item_id: row.budget_item.id,
                            })
                        }
                    >
                        Borrar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
