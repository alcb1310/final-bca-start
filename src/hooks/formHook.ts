import { createFormHook, createFormHookContexts } from '@tanstack/react-form'

export const { fieldContext, formContext, useFormContext, useFieldContext } =
    createFormHookContexts()

export const { useAppForm } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {},
    formComponents: {},
})
