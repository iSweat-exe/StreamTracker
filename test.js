// Configuration des informations d'authentification
const CLIENT_ID = 'CLIENT_ID';
const CLIENT_SECRET = 'CLIENT_SECRET';
let ACCESS_TOKEN = 'ACCESS_TOKEN';
let REFRESH_TOKEN = 'REFRESH_TOKEN';

const MAX_TITLE_LENGTH = 70;

// Éléments DOM
const loader = document.getElementById("loader");
const backgroundLayer = document.getElementById("backgroundLayer");
const titleElement = document.getElementById("Title");
const usernameElement = document.getElementById("streamerUsername");
const viewerCountElement = document.getElementById("viewerCount");
const gameElement = document.getElementById("game");
const thumbnailElement = document.getElementById("liveThumbnail");

// Fonction pour rafraîchir le token d'accès
async function refreshAccessToken() {
  const url = `https://id.twitch.tv/oauth2/token`;
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'refresh_token',
    refresh_token: REFRESH_TOKEN,
  });

  try {
    const response = await fetch(url, { method: 'POST', body: params });
    if (!response.ok) throw new Error(`Erreur: ${response.statusText}`);
    
    const data = await response.json();
    ACCESS_TOKEN = data.access_token;
    REFRESH_TOKEN = data.refresh_token;
    console.log('Token rafraîchi avec succès.');
  } catch (error) {
    console.error("Erreur lors du rafraîchissement du token :", error);
  }
}

async function fetchUserProfile(username) {
  const url = `https://api.twitch.tv/helix/users?login=${username}`;
  try {
    const response = await fetch(url, {
      headers: {
        "Client-ID": CLIENT_ID,
        "Authorization": `Bearer ${ACCESS_TOKEN}`,
      },
    });

    if (response.status === 401) {
      await refreshAccessToken();
      return fetchUserProfile(username); // Réessayer avec le nouveau token
    }

    if (!response.ok) throw new Error(`Erreur: ${response.statusText}`);
    const data = await response.json();
    if (data.data && data.data.length > 0) {
      return data.data[0].profile_image_url; // Retourner l'image de profil
    } else {
      throw new Error("Utilisateur non trouvé.");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du profil :", error);
  }
}

// Récupérer les infos du stream en direct
async function fetchLiveInfo(username) {
  const url = `https://api.twitch.tv/helix/streams?user_login=${username}`;
  try {
    const response = await fetch(url, {
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    if (response.status === 401) {
      await refreshAccessToken();
      return fetchLiveInfo(username); // Réessayer avec le nouveau token
    }

    if (!response.ok) throw new Error(`Erreur: ${response.statusText}`);

    const data = await response.json();
    const userProfileImage = await fetchUserProfile(username);
    const streamData = data.data.length > 0 ? data.data[0] : null;
    
    const sortedData = streamData ? {
      user_name: streamData.user_name,
      title: streamData.title,
      game_name: streamData.game_name,
      viewer_count: streamData.viewer_count,
      language: streamData.language,
      tags: streamData.tags || [],
      started_at: streamData.started_at,
      thumbnail_url: `https://static-cdn.jtvnw.net/previews-ttv/live_user_${streamData.user_name.toLowerCase()}-640x360.jpg`,
      profile_image_url: userProfileImage,
    } : {
      user_name: username,
      quality: "Hors ligne",
      profile_image_url: userProfileImage,
    };

    if (streamData) {
      const streamStartTime = new Date(sortedData.started_at);
      const streamDuration = new Date() - streamStartTime;
      const hours = Math.floor(streamDuration / (1000 * 60 * 60));
      const minutes = Math.floor((streamDuration % (1000 * 60 * 60)) / (1000 * 60));
      const durationString = `${hours}h${minutes}`;
      document.getElementById("streamTimer").textContent = durationString;

      populateUI(sortedData, true);
    } else {
      populateUI(sortedData, false);
    }
  } catch (error) {
    loader.classList.remove("active");
    console.error("Erreur lors de la récupération des infos du stream :", error);
  }
}

// Fonction pour tronquer le titre si nécessaire
function truncateTitle(title, isOnline) {
  return isOnline && title.length > MAX_TITLE_LENGTH ? title.substring(0, MAX_TITLE_LENGTH) + '...' : title;
}

// Mettre à jour l'interface utilisateur
function populateUI(data, isOnline) {
  const truncatedTitle = truncateTitle(data.title, isOnline);

  if (data.quality === "Hors ligne") {
    titleElement.textContent = "Hors Ligne";
    usernameElement.textContent = `${data.user_name} est hors ligne.`;
    viewerCountElement.textContent = "";
    gameElement.textContent = "";
    thumbnailElement.src = 'https://static-cdn.jtvnw.net/jtv_user_pictures/25d06dd4-d89c-4721-b3f9-587927aeff8d-channel_offline_image-1920x1080.jpeg';
    thumbnailElement.style.display = "block";
    thumbnailElement.onclick = null;

    const viewersTitle = document.getElementById("viewersTitle");
    const streamTimerTitle = document.getElementById("streamTimerTitle");
    viewersTitle.style.display = "none";
    streamTimerTitle.style.display = "none";

    const liveLink = document.getElementById("liveLink");
    liveLink.textContent = "Indisponible";
    liveLink.style.opacity = 0.75;

  } else {
    titleElement.textContent = truncatedTitle;
    usernameElement.textContent = data.user_name;
    viewerCountElement.textContent = data.viewer_count;
    gameElement.textContent = data.game_name;
    thumbnailElement.src = data.thumbnail_url;
    thumbnailElement.style.display = "block";
    thumbnailElement.onclick = () => window.open(`https://twitch.tv/${data.user_name}`, "_blank");

    const viewersTitle = document.getElementById("viewersTitle");
    const streamTimerTitle = document.getElementById("streamTimerTitle");
    viewersTitle.style.display = "inline";
    streamTimerTitle.style.display = "inline";

    const liveLink = document.getElementById("liveLink");
    liveLink.textContent = "Rejoindre le stream";
    liveLink.onclick = () => window.open(`https://twitch.tv/${data.user_name}`, "_blank");
    liveLink.style.opacity = 1;
  }

  backgroundLayer.style.backgroundImage = "linear-gradient(to right, #000000, #000000)";
  loader.classList.remove("active");
}

// Initialiser l'affichage pour un streamer donné
fetchLiveInfo("Squeezie");
