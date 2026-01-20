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
    deleteInvoice,
    type FacturaResponseType,
} from '@/queries/transacciones/facturas'

type DeleteInvoiceDialogProps = {
    invoice: FacturaResponseType
}

export function DeleteInvoiceDialog({
    invoice,
}: Readonly<DeleteInvoiceDialogProps>) {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (data: FacturaResponseType) =>
            deleteInvoice({ data: { data } }),
        onSuccess: () => {
            toast.success('Factura borrada correctamente')
            queryClient.invalidateQueries({
                queryKey: ['facturas'],
            })
        },
        onError: (error) => {
            console.error('error', error)
            toast.error('Error al borrar la factura', {
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
                    <AlertDialogTitle>Borrar factura</AlertDialogTitle>
                    <AlertDialogDescription>
                        Está seguro que desea borrar la factura{' '}
                        {invoice.invoice_number} del proveedor{' '}
                        {invoice.supplier.name} para la obra{' '}
                        {invoice.project.name}? Esta acción no se puede
                        deshacer.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => mutation.mutate(invoice)}>
                        Borrar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
