
import { createWorkspace } from "@/server-actions/workspace"
import { useMutationData } from "./useMutationData"
import useZodForm from "./useZodFrom"
import { worksapceSchema } from "@/types/schema"

export const useCreateWorkspace = () => {

    const {mutate, isPending} = useMutationData(
        ['create-workspace'],
        //@ts-ignore
        (data: {name: string}) => createWorkspace(data?.name),
        'user-workspaces'
    )

    const {errors, onFormSubmit, register} = useZodForm(worksapceSchema, mutate)

    return { errors, onFormSubmit, register, isPending};
}