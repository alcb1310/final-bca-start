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
import { Field, FieldGroup, FieldSet } from '@/components/ui/field'
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
            parent_id: '',
        } satisfies BudgetItemCreateType as BudgetItemCreateType,
        validators: {
            onSubmit: budgetItemCreateSchema,
        },
        onSubmit: ({ value }) => {
            console.log(value)
        },
    })

    const options = [{ value: '', label: 'Sin padre' }]

    return (
        <Drawer direction='right'>
            <DrawerTrigger asChild>
                <Button variant='default' size='sm'>
                    <PlusIcon size={10} />
                    Crear Partida
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
                        <DrawerTitle>Crear Partida</DrawerTitle>
                        <DrawerDescription>
                            Crea una partida presupuestaria con la información
                            requerida.
                        </DrawerDescription>
                    </DrawerHeader>
                    <FieldGroup className='my-5 px-4'>
                        <FieldSet>
                            <form.AppField name='code'>
                                {(field) => (
                                    <field.TextField
                                        label='Código'
                                        placeholder='Ingrese el código del proyecto'
                                        name='code'
                                    />
                                )}
                            </form.AppField>
                            <form.AppField name='name'>
                                {(field) => (
                                    <field.TextField
                                        label='Nombre'
                                        placeholder='Ingrese el nombre del proyecto'
                                        name='name'
                                    />
                                )}
                            </form.AppField>
                            <form.AppField name='parent_id'>
                                {(field) => (
                                    <field.SelectField
                                        name='parent_id'
                                        label='Partida Padre'
                                        options={options}
                                    />
                                )}
                            </form.AppField>
                            <form.AppField name='accumulate'>
                                {(field) => (
                                    <field.SwitchField
                                        label='Acumula'
                                        name='accumulate'
                                    />
                                )}
                            </form.AppField>
                        </FieldSet>
                    </FieldGroup>
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
