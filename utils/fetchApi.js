import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com'


// function to fetch data from API 

export const fetchApi = async (url) =>{
    const { data } = await axios.get((url), {
        headers: {
            'x-rapidapi-host' : 'bayut.p.rapidapi.com',
            'x-rapidapi-key' : 'd9e38e4a4amsh97747d5c154a21ep1fc490jsn3014c0ec7175'
          }
    });

    return data;
}