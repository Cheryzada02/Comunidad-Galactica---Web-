// script.js

// URL de tu API del bot (Render)
const BOT_API_URL = 'https://cg-galactusbot.onrender.com/api/stats';

// Función para obtener y actualizar estadísticas del servidor
async function fetchDiscordStats() {
    try {
        const response = await fetch(BOT_API_URL);
        if (!response.ok) throw new Error('Failed to fetch stats');

        const data = await response.json();

        // Actualizar los elementos en el HTML
        const playersEl = document.getElementById('players');
        const totalEl = document.getElementById('totalMembers');
        const botsEl = document.getElementById('bots');

        if (playersEl) playersEl.textContent = data.onlineMembers ?? 0;
        if (totalEl) totalEl.textContent = data.totalMembers ?? 0;
        if (botsEl) botsEl.textContent = data.activeBots ?? 0;

    } catch (error) {
        console.error('Error fetching Discord stats:', error);
        // Valores por defecto si falla la API
        document.getElementById('players')?.textContent = '-';
        document.getElementById('totalMembers')?.textContent = '-';
        document.getElementById('bots')?.textContent = '-';
    }
}

// Ejecutar al cargar la página
fetchDiscordStats();

// Actualizar automáticamente cada 15 segundos
setInterval(fetchDiscordStats, 15000);

// Smooth scroll para los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});
