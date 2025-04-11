console.log('Script loaded!');

document.addEventListener('DOMContentLoaded', () => {
    // Highlight code blocks
    hljs.highlightAll();
    
    // Navigation tab handling
    const navTabs = document.querySelectorAll('.nav-tab');
    const learnSidebar = document.getElementById('learn-sidebar');
    const quizSidebar = document.getElementById('quiz-sidebar');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show appropriate sidebar
            const mode = tab.dataset.mode;
            if (mode === 'learn') {
                learnSidebar.style.display = 'block';
                quizSidebar.style.display = 'none';
            } else if (mode === 'quiz') {
                learnSidebar.style.display = 'none';
                quizSidebar.style.display = 'block';
            }
        });
    });
    
    // Run button handling for code execution
    const runButtons = document.querySelectorAll('.run-button');
    runButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const clickedButton = event.target;
            const codeId = clickedButton.dataset.codeId;
            const practiceArea = clickedButton.closest('.practice-area, .quiz-item');
            const codeElement = practiceArea.querySelector('.code-editor');
            const outputElement = practiceArea.querySelector('.output');
            
            if (codeElement && outputElement) {
                const code = codeElement.value;
                try {
                    // Transpile TypeScript to JavaScript
                    const jsCode = Babel.transform(code, {
                        presets: ['typescript'],
                        filename: 'file.ts' // 필수 옵션: 파일명을 지정해야 함
                    }).code;
                    
                    // Execute the JavaScript code
                    const result = eval(jsCode);
                    outputElement.textContent = result !== undefined ? String(result) : 'No output';
                    outputElement.style.color = '#333';
                } catch (error) {
                    outputElement.textContent = `Error: ${error.message}`;
                    outputElement.style.color = '#d9534f';
                }
            } else {
                console.error('Could not find code or output element for button:', clickedButton);
            }
        });
    });
});

// Add interactive elements here later
