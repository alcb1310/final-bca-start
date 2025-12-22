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
import { Field, FieldGroup, FieldSet } from '@/components/ui/field'
import { useAppForm } from '@/hooks/formHook'
import {
    type BudgetItemEditType,
    budgetItemEditSchema,
} from '@/queries/parametros/partidas'

interface UpdateItemProps {
    item: BudgetItemEditType
}

export default function UpdateItem({ item }: Readonly<UpdateItemProps>) {
    const form = useAppForm({
        defaultValues: item,
        validators: {
            onSubmit: budgetItemEditSchema,
        },
        onSubmit: ({ value }) => {
            console.log(value)
        },
    })

    return (
        <Drawer direction='right'>
            <DrawerTrigger asChild>
                <Button variant='ghost' size='icon-sm'>
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
                        <DrawerTitle>Editar Partida</DrawerTitle>
                        <DrawerDescription>
                            Editar partida con la información proporcionada
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
