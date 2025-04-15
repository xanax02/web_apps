import FormGnerator from "@/components/global/form-generator"
import Loader from "@/components/global/loader"
import { Button } from "@/components/ui/button"
import { useCreateWorkspace } from "@/hooks/useCreateWorkspace"

const WorkspaceFrom = () => {

    const {errors, isPending, onFormSubmit, register} = useCreateWorkspace()

    return <form onSubmit={onFormSubmit} className="flex flex-col gap-y-3">
        <FormGnerator
            register={register}
            name="name"
            placeholder="Create a new Workspace"
            label="Workspace name"
            errors={errors}
            inputType="input"
            type="text"
        />
        <Button
            className="text-sm w-full mt-2"
            type="submit"
            disabled={isPending}
        >
            <Loader state={isPending}>Create Workspace</Loader>
        </Button>
    </form>
}

export default WorkspaceFrom