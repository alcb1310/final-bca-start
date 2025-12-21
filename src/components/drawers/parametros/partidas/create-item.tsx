import { PlusIcon } from 'lucide-react'
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
    type BudgetItemCreateType,
    budgetItemCreateSchema,
} from '@/queries/parametros/partidas'

export default function CreateItemDrawer() {
    const form = useAppForm({
        defaultValues: {
            code: '',
            name: '',
            accumulate: false,
            parent_id: null,
        } satisfies BudgetItemCreateType as BudgetItemCreateType,
        validators: {
            onSubmit: budgetItemCreateSchema,
        },
        onSubmit: ({ value }) => {
            console.log(value)
        },
    })

    return (
        <Drawer direction='right'>
            <DrawerTrigger asChild>
                <Button variant='default' size='sm'>
                    <PlusIcon size={10} />
                    Crear Partida
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Crear Partida</DrawerTitle>
                    <DrawerDescription>
                        Crea una partida presupuestaria con la información
                        requerida.
                    </DrawerDescription>
                </DrawerHeader>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}
                >
                    <DrawerFooter>
                        <Field orientation='horizontal'>
                            <form.AppForm>
                                <form.FormButton label='Guardar' />
                            </form.AppForm>
                            <DrawerClose asChild>
                                <Button variant='outline'>Cancel</Button>
                            </DrawerClose>
                        </Field>
                    </DrawerFooter>
                </form>
            </DrawerContent>
        </Drawer>
    )
}
