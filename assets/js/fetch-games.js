const apiKey = "";
const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&ordering=-added`;

async function fetchGames() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Chọn container để thêm các item game
    const gamesContainer = document.getElementById("games-container");

    // Lặp qua danh sách game và tạo HTML
    data.results.slice(0, 8).forEach((game) => {
      // Lấy 8 game đầu tiên
      const gameItem = document.createElement("div");
      gameItem.classList.add("col-lg-3", "col-sm-6");
      const gameImg = game.background_image || "../images/img-not-found.png";
      gameItem.innerHTML = `
            <div class="item">
            <div class="image-container">
              <img src="${gameImg}" alt="${game.name}">
            </div>
            <div class="content">
              <h4>${game.name}<br><span>${
        game.genres.map((g) => g.name).join(", ") || "Unknown Genre"
      }</span></h4>
              <ul>
                <li><i class="fa fa-star"></i> ${game.rating || "N/A"}</li>
                <li><i class="fa fa-download"></i> ${
                  game.added || "N/A"
                } Downloads</li>
                
              </ul>
            </div>
          </div>
          `;
      gamesContainer.appendChild(gameItem);
    });
  } catch (error) {
    console.error("Error fetching games:", error);
  }
}

fetchGames();
