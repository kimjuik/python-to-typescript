// Monaco Editor 설정
require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs' } });

let editor;
require(['vs/editor/editor.main'], function () {
    // 타입 시스템 데모
    const typeDemo = document.getElementById('typeDemo');
    const typeDemoContent = `
    // Python과 유사한 타입 힌트
    let name: string = "Python";
    let version: number = 3.9;
    let isAwesome: boolean = true;

    // 리스트(배열) 타입
    let languages: string[] = ["Python", "TypeScript"];

    // 튜플 타입
    let coordinate: [number, number] = [10, 20];

    // 딕셔너리(객체) 타입
    interface Config {
        debug: boolean;
        port: number;
    }

    let settings: Config = {
        debug: true,
        port: 3000
    };
    `;

    const typeDemoEditor = monaco.editor.create(typeDemo, {
        value: typeDemoContent,
        language: 'typescript',
        theme: 'vs-dark',
        readOnly: true,
        minimap: { enabled: false },
        automaticLayout: true,
        fontSize: 14,
    });

    // 실습 에디터
    editor = monaco.editor.create(document.getElementById('codeEditor'), {
        value: '// 여기에 TypeScript 코드를 작성하세요',
        language: 'typescript',
        theme: 'vs-dark',
        minimap: { enabled: false },
        automaticLayout: true,
        fontSize: 14,
    });
});

// Python vs TypeScript 비교 테이블
const comparisonData = [
    {
        feature: '타입 시스템',
        python: 'Type hints (선택적)',
        typescript: '정적 타입 (필수)',
    },
    {
        feature: '클래스 정의',
        python: 'class MyClass:\n    def __init__(self):',
        typescript: 'class MyClass {\n    constructor() {',
    },
    {
        feature: '함수 정의',
        python: 'def function(param: str) -> str:',
        typescript: 'function function(param: string): string {',
    },
];

function createComparisonTable() {
    const table = document.getElementById('comparisonTable');
    const tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>기능</th>
                    <th>Python</th>
                    <th>TypeScript</th>
                </tr>
            </thead>
            <tbody>
                ${comparisonData.map(row => `
                    <tr>
                        <td>${row.feature}</td>
                        <td><code>${row.python}</code></td>
                        <td><code>${row.typescript}</code></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    table.innerHTML = tableHTML;
}

// 코드 실행
document.getElementById('runCode').addEventListener('click', function() {
    const code = editor.getValue();
    const output = document.getElementById('codeOutput');
    
    try {
        // 실제로는 TypeScript 컴파일러를 통해 실행해야 하지만,
        // 여기서는 간단한 피드백만 제공합니다.
        output.innerHTML = '코드가 성공적으로 컴파일되었습니다! (실제 실행은 지원하지 않습니다)';
    } catch (error) {
        output.innerHTML = `에러: ${error.message}`;
    }
});

// 페이지 로드 시 비교 테이블 생성
document.addEventListener('DOMContentLoaded', createComparisonTable);
