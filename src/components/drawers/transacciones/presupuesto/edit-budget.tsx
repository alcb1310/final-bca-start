import { PencilIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import { Field } from '@/components/ui/field'
import { useAppForm } from '@/hooks/formHook'
import {
    type BudgetEditType,
    editBudgetSchema,
} from '@/queries/transacciones/presupuesto'

type EditBudgetDrawerProps = {
    budget: BudgetEditType
}

export function EditBudgetDrawer({ budget }: Readonly<EditBudgetDrawerProps>) {
    const form = useAppForm({
        defaultValues: budget,
        validators: {
            // @ts-expect-error
            onSubmit: editBudgetSchema,
        },
        onSubmit: ({ value }) => {
            console.log(value)
        },
    })

    return (
        <Drawer direction='right'>
            <DrawerTrigger asChild>
                <Button variant='ghost' size={'icon-sm'}>
                    <PencilIcon size={10} className='text-warning' />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}
                >
                    <DrawerHeader>
                        <DrawerTitle>Editar Presupuesto</DrawerTitle>
                        <DrawerDescription>
                            Edita un presupuesto con la información
                            proporcionada.
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Field orientation={'horizontal'}>
                            <DrawerClose asChild>
                                <Button variant='outline'>Cerrar</Button>
                            </DrawerClose>
                        </Field>
                    </DrawerFooter>
                </form>
            </DrawerContent>
        </Drawer>
    )
}
