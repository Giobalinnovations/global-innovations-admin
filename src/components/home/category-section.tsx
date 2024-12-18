'use client';
import useQueryGet from '@/hooks/useQuery';
import CategoryCardWithoutImg from '../category-card-without-img';
import apiEndpoint from '@/services/apiEndpoint';
import { CategoryProps } from '../navigation-list-category';

export default function CategorySection() {
  const { data, isPending, isError, error, isSuccess } = useQueryGet({
    apiEndpointUrl: apiEndpoint.CATEGORY,
    queryKey: 'getAllCategory',
  });
  if (isPending) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  if (isSuccess) {
    const category = data?.data?.data ?? [];

    return (
      <>
        {category.length > 0
          ? category.map((category: CategoryProps) => (
              <CategoryCardWithoutImg key={category._id} category={category} />
            ))
          : 'no category found'}
      </>
    );
  }
}
