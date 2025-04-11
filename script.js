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
                    // 출력 결과를 저장할 변수
                    let capturedOutput = '';
                    
                    // 기존 console.log 함수 저장
                    const originalConsoleLog = console.log;
                    
                    // console.log 함수 재정의
                    console.log = function() {
                        // 원래 콘솔에도 출력
                        originalConsoleLog.apply(console, arguments);
                        
                        // 출력 결과를 문자열로 저장
                        const args = Array.from(arguments).map(arg => {
                            if (typeof arg === 'object' && arg !== null) {
                                try {
                                    return JSON.stringify(arg, null, 2);
                                } catch (e) {
                                    return String(arg);
                                }
                            }
                            return String(arg);
                        });
                        capturedOutput += args.join(' ') + '\n';
                    };
                    
                    // Transpile TypeScript to JavaScript
                    const jsCode = Babel.transform(code, {
                        presets: ['typescript'],
                        filename: 'file.ts' // 필수 옵션: 파일명을 지정해야 함
                    }).code;
                    
                    // Execute the JavaScript code
                    const result = eval(jsCode);
                    
                    // console.log 함수 복원
                    console.log = originalConsoleLog;
                    
                    // 출력 결과 표시
                    if (capturedOutput) {
                        outputElement.textContent = capturedOutput;
                    } else if (result !== undefined) {
                        outputElement.textContent = String(result);
                    } else {
                        outputElement.textContent = 'No output';
                    }
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
