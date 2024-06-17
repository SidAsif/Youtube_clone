import axios from "axios";

const MAIN_URL = "https://youtube-v31.p.rapidapi.com";

const API_KEY = "904837f8cbmshcdcead1204b5726p1152a3jsn4ed61785b3fe";

const options = (params) => ({
  params: {
    maxResults: 50,
  },
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
});

export const ApiFetch = async (url, params = {}) => {
  try {
    const { data } = await axios.get(`${MAIN_URL}/${url}`, options(params));
    return data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error for handling elsewhere
  }
};
