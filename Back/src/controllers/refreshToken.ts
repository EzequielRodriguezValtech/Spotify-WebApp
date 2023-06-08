import axios from 'axios';

export const refreshToken = async (refreshToken: string, clientId: string, clientSecret: string): Promise<string> => {
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      params: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
      },
    });

    const { access_token } = response.data;

    return access_token;
  } catch (error) {
    console.error('Error al renovar el token de acceso:', error);
    throw new Error('Error al renovar el token de acceso');
  }
};