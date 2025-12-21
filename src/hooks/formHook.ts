import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { FormButton } from '@/components/form/Button'
import { SelectField } from '@/components/form/SelectField'
import { SwitchField } from '@/components/form/SwitchField'
import { TextField } from '@/components/form/TextField'

export const { fieldContext, formContext, useFormContext, useFieldContext } =
    createFormHookContexts()

export const { useAppForm } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
        SelectField,
        SwitchField,
        TextField,
    },
    formComponents: { FormButton },
})
