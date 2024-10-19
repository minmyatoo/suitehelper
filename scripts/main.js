// Import all component initializers
import { initializeConverter } from './converter.js';
import { initializeApiMap } from './apiMap.js';
import { initializeObjectsBrowser } from './objectsBrowser.js';
import { initializeCodeSnippets } from './codeSnippets.js';
import { initializeRecordBrowser } from './recordBrowser.js';
import { initializeScriptGenerator } from './scriptGenerator.js';

import { initializeDeployment } from './deployment.js';
import { initializeFileExplorer } from './fileExplorer.js';


class SuiteHelperTool {
    constructor() {
        this.currentTheme = 'light';
        this.currentSection = null;
        this.initApp();
    }

    initApp() {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('DOM fully loaded and parsed');
            this.initializeMaterialize();
            this.setupNavigation();
            this.setupDarkMode();
            this.initializeComponents();
        });
    }

    initializeMaterialize() {
        M.AutoInit();
    }

    setupNavigation() {
        const navItems = document.querySelectorAll('.side-nav .collection-item');
        const sections = document.querySelectorAll('.section');

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = item.getAttribute('href').slice(1);
                console.log('Clicked nav item:', targetId);
                
                sections.forEach(section => section.style.display = 'none');
                navItems.forEach(navItem => navItem.classList.remove('active'));
                
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.style.display = 'block';
                    this.currentSection = targetId;
                    console.log('Displaying section:', targetId);
                } else {
                    console.error('Target section not found:', targetId);
                }
                
                item.classList.add('active');
            });
        });

        // Set the first tab as active by default
        navItems[0].click();
    }

    setupDarkMode() {
        const darkModeToggle = document.getElementById('darkModeToggle');
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            this.currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
            this.updateCodeMirrorTheme();
        });
    }

    updateCodeMirrorTheme() {
        const theme = this.currentTheme === 'dark' ? 'monokai' : 'default';
        document.querySelectorAll('.CodeMirror').forEach(cm => {
            cm.CodeMirror.setOption('theme', theme);
        });
    }

    initializeComponents() {
        const components = [
            { name: 'Converter', init: initializeConverter },
            { name: 'API Map', init: initializeApiMap },
            { name: 'Objects Browser', init: initializeObjectsBrowser },
            { name: 'Code Snippets', init: initializeCodeSnippets },
            { name: 'Record Browser', init: initializeRecordBrowser },
            { name: 'Script Generator', init: initializeScriptGenerator },
           
            { name: 'Deployment', init: initializeDeployment },
            { name: 'File Explorer', init: initializeFileExplorer },
            
        ];

        components.forEach(component => {
            try {
                if (typeof component.init === 'function') {
                    component.init();
                    console.log(`Initialized ${component.name}`);
                } else {
                    console.warn(`Initialization function for ${component.name} is not available.`);
                }
            } catch (error) {
                console.error(`Error initializing ${component.name}:`, error);
            }
        });
    }
}

// Create and initialize the app
const app = new SuiteHelperTool();

// Error handling
window.addEventListener('error', function(event) {
    console.error('An error occurred:', event.error);
    M.toast({html: 'An error occurred. Please check the console for details.'});
});

// Performance monitoring
window.addEventListener('load', function() {
    setTimeout(function() {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log('Page load time:', loadTime, 'ms');
    }, 0);
});

// Expose app to window for debugging purposes
window.suiteHelperTool = app;