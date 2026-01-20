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
import type { FacturaResponseType } from '@/queries/transacciones/facturas'

type DeleteInvoiceDialogProps = {
    invoice: FacturaResponseType
}

export function DeleteInvoiceDialog({
    invoice,
}: Readonly<DeleteInvoiceDialogProps>) {
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
                    <AlertDialogAction>Borrar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
