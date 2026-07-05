const htmlCode = document.getElementById("htmlCode");
const cssCode = document.getElementById("cssCode");
const preview = document.getElementById("preview");
const resetBtn = document.getElementById("resetBtn");

const defaultHtml = `<main>
    <h1>Hello World</h1>
    <p>This is your first HTML experiment.</p>
    <a href="#">Read more</a>
</main>`;

const defaultCss = `body {
    background: #f8fafc;
    color: #172033;
    font-family: "Segoe UI", Arial, sans-serif;
    line-height: 1.6;
    padding: 2rem;
}

h1 {
    color: #155e75;
}

a {
    color: #f59e0b;
    font-weight: 700;
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
    htmlCode.value = defaultHtml;
    cssCode.value = defaultCss;
    updatePreview();
}

htmlCode.addEventListener("input", updatePreview);
cssCode.addEventListener("input", updatePreview);
resetBtn.addEventListener("click", resetEditor);

resetEditor();
