import { initUserPanel } from './user.js';
import { initAdminPanel } from './admin.js';

document.addEventListener('DOMContentLoaded', () => {
    initSelectScreen();
});

export function initSelectScreen() {
    const content = document.getElementById('content');
    const userName = localStorage.getItem('myUser');
    content.classList.add('hidden');
    setTimeout(() => {
        content.innerHTML = `
            <h1>Welcome ${userName ? userName : ''} <br><span style="font-size: 40px">To Movie Heaven</span></h1>
            
            <div class="selectScreen">
                <button id="userBtn">User Zone</button>
                <button id="adminBtn">Admin Panel</button>
            </div>    
        `;
        document.getElementById('userBtn').addEventListener('click', initUserScreen);
        document.getElementById('adminBtn').addEventListener('click', initAdminScreen);
        content.classList.remove('hidden');
    }, 500);
}


function initUserScreen() {
    const content = document.getElementById('content');
    content.classList.add('hidden');
    setTimeout(() => {
        content.innerHTML = `
            <nav>
                <button id="backToSelectScreenBtn">Back to Select Screen</button>
            </nav>
            <div id="userContent"></div>
        `;
    document.getElementById('backToSelectScreenBtn').addEventListener('click', initSelectScreen);

        initUserPanel();
        content.classList.remove('hidden');
    }, 300);
}

function initAdminScreen() {
    const content = document.getElementById('content');
    content.classList.add('hidden');
    setTimeout(() => {
        content.innerHTML = `
            <nav>
                <button id="backToSelectScreenBtn">Back to Select Screen</button>
            </nav>
            <div id="adminContent"></div>
        `;
        document.getElementById('backToSelectScreenBtn').addEventListener('click', initSelectScreen);

        initAdminPanel();
        content.classList.remove('hidden');
    }, 300);
}

