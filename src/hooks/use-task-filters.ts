import { parseAsArrayOf, parseAsString, parseAsStringEnum, useQueryStates } from 'nuqs';

import { TaskStatus } from '^/types';

export const useTaskFilters = () => {
  return useQueryStates({
    status: parseAsStringEnum(Object.values(TaskStatus)),
    developers: parseAsArrayOf(parseAsString),
    search: parseAsString,
  });
};
