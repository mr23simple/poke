async function checkLoginStatus() {
    try {
        const response = await fetch('/api/check-auth-status'); // Assuming this endpoint exists
        if (!response.ok) {
            // If the response is not OK, assume not logged in or an error occurred
            return { loggedIn: false };
        }
        const data = await response.json();
        return data; // Expects { loggedIn: true/false, username: "..." }
    } catch (error) {
        console.error('Error checking login status:', error);
        return { loggedIn: false }; // Assume not logged in on error
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('loadHeader.js: DOMContentLoaded fired.');
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        console.log('loadHeader.js: header-placeholder found.');
        try {
            console.log('loadHeader.js: Fetching /components/header.html...');
            const response = await fetch('/components/header.html');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const headerHtml = await response.text();
            console.log('loadHeader.js: header.html fetched successfully. Injecting HTML...');
            headerPlaceholder.innerHTML = headerHtml;
            console.log('loadHeader.js: HTML injected. Starting dynamic link visibility logic.');

            const mainTitle = document.getElementById('main-title');
            const navHome = document.getElementById('nav-home');
            const navLogin = document.getElementById('nav-login');
            const navRegister = document.getElementById('nav-register');
            const navDashboard = document.getElementById('nav-dashboard');
            const navLogout = document.getElementById('nav-logout');

            // Helper to set link visibility
            const setLinkVisibility = (home = false, login = false, register = false, dashboard = false, logout = false) => {
                if (navHome) navHome.parentElement.style.display = home ? 'block' : 'none';
                if (navLogin) navLogin.parentElement.style.display = login ? 'block' : 'none';
                if (navRegister) navRegister.parentElement.style.display = register ? 'block' : 'none';
                if (navDashboard) navDashboard.parentElement.style.display = dashboard ? 'block' : 'none';
                if (navLogout) navLogout.parentElement.style.display = logout ? 'block' : 'none';
            };

            const path = window.location.pathname;
            const authStatus = await checkLoginStatus();

            // Determine background color based on login status and team
            const body = document.body;
            body.classList.remove('default-bg', 'team-valor-bg', 'team-mystic-bg', 'team-instinct-bg');

            if (authStatus.loggedIn && authStatus.team) {
                switch (authStatus.team) {
                    case 1: // Team Mystic
                        body.classList.add('team-mystic-bg');
                        break;
                    case 2: // Team Valor
                        body.classList.add('team-valor-bg');
                        break;
                    case 3: // Team Instinct
                        body.classList.add('team-instinct-bg');
                        break;
                    default:
                        body.classList.add('default-bg');
                        break;
                }
            } else {
                body.classList.add('default-bg');
            }

            if (path === '/' || path.includes('index.html')) {
                mainTitle.textContent = 'Pokémon GO Player Dashboard';
                if (authStatus.loggedIn) {
                    setLinkVisibility(false, false, false, true, true); // Dashboard, Logout
                } else {
                    setLinkVisibility(false, true, true, false, false); // Login, Register
                }
            } else if (path.includes('login.html')) {
                mainTitle.textContent = 'Login';
                setLinkVisibility(true, false, true, false, false); // Home, Register
            } else if (path.includes('register.html')) {
                mainTitle.textContent = 'Register';
                setLinkVisibility(true, true, false, false, false); // Home, Login
            } else if (path.includes('/me') || path.includes('private.html')) {
                mainTitle.textContent = authStatus.loggedIn ? authStatus.username : 'My Profile';
                setLinkVisibility(true, false, false, false, true); // Home, Logout
            }
            console.log('loadHeader.js: Dynamic link visibility logic completed.');
        } catch (error) {
            console.error('loadHeader.js: Failed to load header:', error);
        }
    } else {
        console.error('loadHeader.js: header-placeholder not found!');
    }
});
