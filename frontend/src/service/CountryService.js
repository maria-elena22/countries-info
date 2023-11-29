const BASE_URL = process.env.REACT_APP_API_URL;

export const getCountryByName = async (countryName) => {
  const url = `${BASE_URL}${countryName}`;
  const response = await fetch(url);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error);
  }

  return result;
};