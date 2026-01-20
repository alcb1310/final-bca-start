import { TrashIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import type { FacturaResponseType } from '@/queries/transacciones/facturas'

type DeleteInvoiceDialogProps = {
    invoice: FacturaResponseType
}

export function DeleteInvoiceDialog({
    invoice,
}: Readonly<DeleteInvoiceDialogProps>) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant='ghost'
                    size={'icon-sm'}
                    className='text-destructive'
                >
                    <TrashIcon />
                </Button>
            </DialogTrigger>
            <DialogContent></DialogContent>
        </Dialog>
    )
}
