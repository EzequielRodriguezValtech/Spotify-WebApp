import axios from "axios";


export async function getSongsFromSpotify(accessToken: string | undefined, url: string, limit:number, body?:any) {
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        limit: limit, 
      },
    });
  };


  export async function getRecommendedSongsTracks(songsId: string[],limit:number, accessToken: string | undefined ): Promise<any> {
    const res = await fetch(`https://api.spotify.com/v1/recommendations?limit=${limit}&seed_tracks=${songsId.join(',')}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });
  
    return await res.json();
  }

  export async function fetchWebApi(
    endpoint: string,
    method: string,
    token: string,
    body?: Record<string, any>
  ) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
      body: JSON.stringify(body),
    });
    return await res.json();
  }
  

