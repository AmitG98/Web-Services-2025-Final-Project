import { useQuery } from "@tanstack/react-query";
import { getExtraProgramInfo } from "../api/program";

export const useExtraProgramInfo = (type, id) => {
  return useQuery({
    queryKey: ["extraInfo", type, id],
    queryFn: () => getExtraProgramInfo(type, id),
    enabled: !!type && !!id,
  });
};
