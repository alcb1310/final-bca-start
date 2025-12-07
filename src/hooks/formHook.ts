import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { FormButton } from '@/components/form/Button'
import { TextField } from '@/components/form/TextField'

export const { fieldContext, formContext, useFormContext, useFieldContext } =
    createFormHookContexts()

export const { useAppForm } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: { TextField },
    formComponents: { FormButton },
})
