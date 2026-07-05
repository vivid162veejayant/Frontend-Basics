const htmlCode = document.getElementById("htmlCode");
const cssCode = document.getElementById("cssCode");
const preview = document.getElementById("preview");
const checkBtn = document.getElementById("checkBtn");
const resetBtn = document.getElementById("resetBtn");
const challengeResults = document.getElementById("challengeResults");

const starterHtml = `<main>
    <h1>My First Heading</h1>
    <p>This is some text. Try changing its color.</p>
    <div class="box">This box needs a background color.</div>
</main>`;

const starterCss = `body {
    color: #172033;
    font-family: "Segoe UI", Arial, sans-serif;
    line-height: 1.6;
    padding: 2rem;
}

h1 {
    color: #155e75;
}

p {
    font-size: 1.1rem;
}

.box {
    border: 2px solid #155e75;
    padding: 1rem;
    margin-top: 1rem;
}`;

function buildPreviewDocument() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>${cssCode.value}</style>
</head>
<body>
${htmlCode.value}
</body>
</html>`;
}

function updatePreview() {
    preview.srcdoc = buildPreviewDocument();
}

function resetEditor() {
    htmlCode.value = starterHtml;
    cssCode.value = starterCss;
    challengeResults.innerHTML = "";
    updatePreview();
}

function stripComments(cssText) {
    return cssText.replace(/\/\*[\s\S]*?\*\//g, "").toLowerCase();
}

function getRuleBlock(cssText, selector) {
    const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const rulePattern = new RegExp(`${escapedSelector}\\s*{([^}]*)}`, "i");
    const match = cssText.match(rulePattern);
    return match ? match[1] : "";
}

function hasDeclaration(block, property, valuePattern = /[^;]+/) {
    const declarationPattern = new RegExp(`${property}\\s*:\\s*${valuePattern.source}`, "i");
    return declarationPattern.test(block);
}

function renderResults(results) {
    challengeResults.innerHTML = results
        .map((result) => {
            const className = result.pass ? "pass" : "fail";
            const label = result.pass ? "Passed" : "Needs work";
            return `<div class="result-item ${className}"><strong>${label}:</strong> ${result.text}</div>`;
        })
        .join("");
}

function checkChallenges() {
    const cssText = stripComments(cssCode.value);
    const paragraphBlock = getRuleBlock(cssText, "p");
    const headingBlock = getRuleBlock(cssText, "h1");
    const bodyBlock = getRuleBlock(cssText, "body");
    const boxBlock = getRuleBlock(cssText, ".box");

    const results = [
        {
            pass: hasDeclaration(paragraphBlock, "color"),
            text: "Paragraph text color changed"
        },
        {
            pass: hasDeclaration(headingBlock, "text-align", /center\b/),
            text: "Heading centered"
        },
        {
            pass: hasDeclaration(bodyBlock, "background(?:-color)?") || hasDeclaration(boxBlock, "background(?:-color)?"),
            text: "Background color added to the page or box"
        }
    ];

    renderResults(results);
}

htmlCode.addEventListener("input", updatePreview);
cssCode.addEventListener("input", updatePreview);
checkBtn.addEventListener("click", checkChallenges);
resetBtn.addEventListener("click", resetEditor);

resetEditor();
