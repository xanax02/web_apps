import { useCreateWorkspace } from "@/hooks/useCreateWorkspace"

const WorkspaceFrom = () => {

    const {errors, isPending, onFormSubmit, register} = useCreateWorkspace()

    return <form onSubmit={onFormSubmit} className="flex flex-col gap-y-3">

    </form>
}

export default WorkspaceFrom