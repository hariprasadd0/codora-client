import { getProjectById } from '@/modules/projects/api/projectApi';

export interface BreadcrumbConfig<T> {
  fetchFn: (id: string) => Promise<T>;
  nameKey: keyof T;
}

export const breadcrumbConfig: Record<
  string,
  BreadcrumbConfig<{ project: string }>
> = {
  projects: {
    fetchFn: (id)=>getProjectById(id),
    nameKey: 'project',
  },
  // task: {
  //   fetchFn: getTaskById,
  //   nameKey: 'name',
  // },
  // product: {
  //   fetchFn: getProductById,
  //   nameKey: 'name',
  // },
};
