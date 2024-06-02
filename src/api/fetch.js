// Fonction permettant les appels API
export async function fetchData(url) {
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        let errorMessage = `Erreur: ${response.status} ${response.statusText}`;
        switch (response.status) {
          case 400:
            errorMessage = 'Erreur 400: Mauvaise requête';
            break;
          case 401:
            errorMessage = 'Erreur 401: Non autorisé';
            break;
          case 403:
            errorMessage = 'Erreur 403: Accès refusé';
            break;
          case 404:
            errorMessage = 'Erreur 404: Non trouvé';
            break;
          case 500:
            errorMessage = 'Erreur 500: Erreur interne du serveur';
            break;
          case 502:
            errorMessage = 'Erreur 502: Mauvaise passerelle';
            break;
          case 503:
            errorMessage = 'Erreur 503: Service indisponible';
            break;
          case 504:
            errorMessage = 'Erreur 504: Temps de réponse écoulé';
            break;
          default:
            errorMessage = `Erreur ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }
  
      const data = await response.json();
      return data;
  
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      throw error;
    }
  }
  