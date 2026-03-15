document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            renderApp(data);
        })
        .catch(error => console.error('Error loading data:', error));
});

// Global function for tab switching
window.switchTab = function(tabId) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(el => {
        el.classList.remove('active');
    });
    // Remove active class from all nav buttons
    document.querySelectorAll('.nav-btn').forEach(el => {
        el.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabId).classList.add('active');
    // Highlight selected nav button
    document.querySelector(`button[onclick="switchTab('${tabId}')"]`).classList.add('active');
};

function renderApp(data) {
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="app-container">
            
            <!-- Navigation Menu -->
            <nav class="navbar">
                <div class="nav-brand">VS.</div>
                <div class="nav-links">
                    <button class="neo-btn nav-btn active" onclick="switchTab('home')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                        <span class="nav-text">Home</span>
                    </button>
                    <button class="neo-btn nav-btn" onclick="switchTab('about')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        <span class="nav-text">About & Skills</span>
                    </button>
                    <button class="neo-btn nav-btn" onclick="switchTab('work')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-briefcase"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                        <span class="nav-text">Experience & Projects</span>
                    </button>
                    <button class="neo-btn nav-btn" onclick="switchTab('extra')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                        <span class="nav-text">More</span>
                    </button>
                </div>
            </nav>

            <main class="main-content">
                
                <!-- TAB 1: HOME -->
                <div id="home" class="tab-content active">
                    <div class="hero-grid">
                        <div class="hero-text">
                            <h1>${data.personal.name}</h1>
                            <span class="neo-badge">${data.personal.title}</span>
                            <p class="summary-text" style="margin-top: 24px;">
                                Welcome to my portfolio. I build scalable systems and intelligent applications.
                            </p>
                            <div class="hero-contact">
                                <a href="mailto:${data.personal.email}" class="neo-btn bg-pink">Email Me</a>
                                <a href="https://${data.personal.linkedin}" target="_blank" class="neo-btn bg-blue">LinkedIn</a>
                                <a href="https://${data.personal.github}" target="_blank" class="neo-btn bg-yellow">GitHub</a>
                            </div>
                        </div>
                        <div class="hero-image-container neo-box neo-box-hover">
                            <!-- Using profile.jpg. If not found, falls back to a placeholder -->
                            <img src="image.jpg" alt="${data.personal.name}" onerror="this.src='https://api.dicebear.com/9.x/notionists/svg?seed=Vansh&backgroundColor=bae1ff'">
                        </div>
                    </div>

                    <div class="home-section">
                        <h2 class="section-title">About Me</h2>
                        <div class="neo-box bg-orange neo-box-hover">
                            <p class="summary-text">${data.summary}</p>
                        </div>
                    </div>

                    <div class="home-section">
                        <h2 class="section-title">Key Skills</h2>
                        <div class="skills-grid">
                            ${data.skills.slice(0, 4).map(skill => `
                                <div class="neo-box ${skill.color} neo-box-hover skill-card">
                                    <h3>${skill.title}</h3>
                                    <div class="skill-tags">
                                        ${skill.items.map(item => `<span class="skill-tag">${item}</span>`).join('')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="home-section">
                        <h2 class="section-title">Recent Projects</h2>
                        <div class="projects-grid">
                            ${data.projects.slice(0, 2).map(proj => `
                                <div class="neo-box ${proj.color} neo-box-hover proj-card">
                                    <h3>${proj.name}</h3>
                                    <span class="neo-badge bg-white" style="margin-bottom: 16px;">${proj.type}</span>
                                    <div class="proj-tech">
                                        ${proj.tech.map(t => `<span class="skill-tag">${t}</span>`).join('')}
                                    </div>
                                    <ul class="bullet-list">
                                        ${proj.points.map(point => `<li><span class="bullet-icon">✦</span> ${point}</li>`).join('')}
                                    </ul>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- TAB 2: ABOUT & SKILLS -->
                <div id="about" class="tab-content">
                    <div class="about-grid">
                        <div class="about-left">
                            <h2 class="section-title">About Me</h2>
                            <div class="neo-box bg-orange neo-box-hover" style="margin-bottom: 32px;">
                                <p class="summary-text">${data.summary}</p>
                            </div>
                            
                            <h2 class="section-title">Education</h2>
                            <div class="neo-box bg-white neo-box-hover">
                                <h3 style="font-size: 1.5rem; margin-bottom: 8px;">${data.education.degree}</h3>
                                <p style="font-family: var(--font-mono); font-weight: bold; margin-bottom: 16px;">${data.education.major}</p>
                                <span class="neo-badge bg-yellow">${data.education.years}</span>
                                <p style="font-weight: 700; margin-top: 24px; font-size: 1.1rem;">${data.education.university}</p>
                                <span class="neo-badge bg-black" style="margin-top: 12px;">CGPA: ${data.education.cgpa}</span>
                            </div>
                        </div>
                        
                        <div class="about-right">
                            <h2 class="section-title">Skills</h2>
                            <div class="skills-grid">
                                ${data.skills.map(skill => `
                                    <div class="neo-box ${skill.color} neo-box-hover skill-card">
                                        <h3>${skill.title}</h3>
                                        <div class="skill-tags">
                                            ${skill.items.map(item => `<span class="skill-tag">${item}</span>`).join('')}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- TAB 3: EXPERIENCE & PROJECTS -->
                <div id="work" class="tab-content">
                    <div class="work-grid">
                        <section>
                            <h2 class="section-title">Experience</h2>
                            ${data.experience.map(exp => `
                                <div class="neo-box bg-white neo-box-hover exp-card">
                                    <div class="exp-header">
                                        <h3>${exp.role}</h3>
                                        <span class="neo-badge bg-green">${exp.duration}</span>
                                    </div>
                                    <ul class="bullet-list">
                                        ${exp.points.map(point => `<li><span class="bullet-icon">→</span> ${point}</li>`).join('')}
                                    </ul>
                                </div>
                            `).join('')}
                        </section>
                        
                        <section>
                            <h2 class="section-title">Projects</h2>
                            <div class="projects-grid">
                                ${data.projects.map(proj => `
                                    <div class="neo-box ${proj.color} neo-box-hover proj-card">
                                        <h3>${proj.name}</h3>
                                        <span class="neo-badge bg-white" style="margin-bottom: 16px;">${proj.type}</span>
                                        <div class="proj-tech">
                                            ${proj.tech.map(t => `<span class="skill-tag">${t}</span>`).join('')}
                                        </div>
                                        <ul class="bullet-list">
                                            ${proj.points.map(point => `<li><span class="bullet-icon">✦</span> ${point}</li>`).join('')}
                                        </ul>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    </div>
                </div>

                <!-- TAB 4: EXTRA -->
                <div id="extra" class="tab-content">
                    <div class="extra-grid">
                        <section>
                            <h2 class="section-title">Certifications</h2>
                            <ul class="cert-list">
                                ${data.certifications.map(cert => `
                                    <li class="neo-box-hover">${cert}</li>
                                `).join('')}
                            </ul>
                        </section>
                        
                        <section>
                            <h2 class="section-title">Leadership</h2>
                            <div class="neo-box bg-purple neo-box-hover">
                                <h3 style="font-size: 1.8rem; margin-bottom: 16px;">${data.leadership.role}</h3>
                                <span class="neo-badge bg-white" style="margin-bottom: 24px;">${data.leadership.club}</span>
                                <ul class="bullet-list">
                                    ${data.leadership.points.map(point => `<li><span class="bullet-icon">#</span> ${point}</li>`).join('')}
                                </ul>
                            </div>
                        </section>
                    </div>
                </div>

            </main>

            <footer class="footer">
                <p>© ${new Date().getFullYear()} | ${data.personal.name}. All Rights Reserved.</p>
            </footer>
        </div>
    `;
}
