import {
  MutateFunction,
  MutationKey,
  useMutation,
  useMutationState,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

interface MutationResponse {
  status: number;
  data: string;
}

export const useMutationData = (
  mutationKey: MutationKey,
  mutationFn: MutateFunction<MutationResponse>,
  queryKey?: string,
  onSuccess?: () => void
) => {
  const client = useQueryClient();

  const { mutate, isPending } = useMutation<MutationResponse>({
    mutationKey,
    mutationFn,
    onSuccess(data) {
      if (onSuccess) onSuccess();

      return toast(
        data?.status === 200 || data?.status === 201 ? "Success" : "Error",
        {
          description: data?.data,
        }
      );
    },
    onSettled: async () => {
      return await client.invalidateQueries({
        queryKey: [queryKey],
        exact: true,
      });
    },
  });

  return { mutate, isPending };
};

export const useMutationDataState = (mutationKey: MutationKey) => {
  const data = useMutationState({
    filters: {mutationKey},
    select: (mutation) => {
      return {
        variables: mutation.state.variables as any,
        status: mutation.state.status
      }
    }
  })
  const latestVaraibles = data[data.length -1]
  return { latestVaraibles }
}