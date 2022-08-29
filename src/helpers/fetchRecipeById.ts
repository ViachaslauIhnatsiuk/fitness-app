import { API_KEY, BASE_URL } from '../store/constants';
import { IRecipeInfo } from '../models/modelRecipeById';

const fetchRecipeByID = async (id: number) => {
  const response = await fetch(`${BASE_URL}/${id}/information?apiKey=${API_KEY}`);
  return (await response.json()) as IRecipeInfo;
};

export { fetchRecipeByID };
