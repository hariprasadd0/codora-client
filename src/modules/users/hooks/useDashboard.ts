import {useQuery} from "@tanstack/react-query";
import {getRecentActivity} from "@/modules/users/api/userApi.ts";

export const useRecent = () => {
    return useQuery({
        queryKey:['recent-activity'],
        queryFn:()=> getRecentActivity(),
        refetchOnWindowFocus:false,
    });
}