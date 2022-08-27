import { RecipesRequestConfig } from '../store/slices/recipes/model';

function getMixedQueries(config: RecipesRequestConfig) {
  const queries = Object.keys(config).map((key) => {
    const value = config[key as keyof typeof config];
    if (value) {
      return `${key}=${value}`;
    }
    return null;
  });
  return queries.filter((query) => query).join('&');
}

export { getMixedQueries };
