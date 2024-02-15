//Configurando os editores
const htmlEditor = CodeMirror(document.querySelector("#htmlcode"),{
	indentUnit: 0,
	theme: "dracula",
	lineNumbers:true,
    lineWrapping: true,
	tabSize:4,
	mode:"xml",
	extraKeys: {"Ctrl-Space": "autocomplete"}
});
const cssEditor = CodeMirror(document.querySelector("#csscode"),{
	indentUnit: 4,
	theme: "dracula",
	lineNumbers:true,
    lineWrapping: true,
	tabSize:4,
	mode:"css",
	extraKeys: {"Ctrl-Space": "autocomplete"}
});
const jsEditor = CodeMirror(document.querySelector("#jscode"),{
	indentUnit: 4,
	theme: "dracula",
	lineNumbers:true,
    lineWrapping: true,
	tabSize:4,
	mode:"javascript",
	extraKeys: {"Ctrl-Space": "autocomplete"}
});

// Configurando Autocomplete
cssEditor.on("keyup", function (cm, event) {
	if (!cm.state.completionActive && event.keyCode > 64 && event.keyCode < 91) {
			CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});
	}
});

jsEditor.on("keyup", function (cm, event) {
	if (!cm.state.completionActive && event.keyCode > 64 && event.keyCode < 91) {
			CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});
	}
});

// Rodar
function run() {
	let htmlCode = htmlEditor.getValue();
	let cssCode = "<style>" + cssEditor.getValue() + "</style>";
	let jsCode = "<scri" + "pt>" + jsEditor.getValue() + "</scri" + "pt>";
	let previewWindow = document.querySelector("#preview-window").contentWindow.document;
	previewWindow.open();
	previewWindow.write(htmlCode+cssCode+jsCode);
	previewWindow.close();
}

// Configurando qual janela sera exibida
var tab_html = document.querySelector("#html");
var tab_css = document.querySelector("#css");
var tab_js = document.querySelector("#js");

var bar_active = document.querySelector("#show_active");

// Ocultar os editores de CSS e JS no início
document.querySelector("#content_css").classList.add('none')
document.querySelector("#content_js").classList.add('none')

// Salvar o código em um "index.html"
const downloadToFile = (content, filename, contentType) => {
	const a = document.createElement('a');
	const file = new Blob([content], {type: contentType});
	
	a.href= URL.createObjectURL(file);
	a.download = filename;
	a.click();
  
		URL.revokeObjectURL(a.href);
  };
  document.querySelector('#save').addEventListener('click', () => {
		let htmlCode = '<!DOCTYPE html>\n<html lang="en">' + '\n<head>\n' + '    <meta charset="UTF-8">\n    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>mySite</title>\n' + '    ' + '<style>\n\n' + cssEditor.getValue() + '\n\n    ' + '</style>' + '\n</head>' + '\n\n<body>\n\n' + htmlEditor.getValue() + '\n\n<script>\n\n' + jsEditor.getValue() + '\n\n</script>' + '\n\n</body>\n</html>';

		downloadToFile(htmlCode, 'index.html', 'text/html');
});

// Configurando o modo mobile
if (window.matchMedia("(max-width: 1024px)").matches) {
	jsEditor.setSize("100%", "calc(50vh - 9px)");
	cssEditor.setSize("100%", "calc(50vh - 9px)");
	htmlEditor.setSize("100%", "calc(50vh - 9px)");
} else {
	jsEditor.setSize("100%", "calc(100vh - 85px)");
	cssEditor.setSize("100%", "calc(100vh - 85px)");
	htmlEditor.setSize("100%", "calc(100vh - 85px)");
}

tab_html.addEventListener("click", function(event) {
	tab_html.classList.add('active');
	tab_css.classList.remove('active');
	tab_js.classList.remove('active');
	document.querySelector("#content_html").classList.remove('none');
	document.querySelector("#content_css").classList.add('none');
	document.querySelector("#content_js").classList.add('none');
	bar_active.style.left = "0";
})

tab_css.addEventListener("click", function(event) {
	tab_html.classList.remove('active');
	tab_css.classList.add('active');
	tab_js.classList.remove('active');
	document.querySelector("#content_html").classList.add('none');
	document.querySelector("#content_css").classList.remove('none');
	document.querySelector("#content_js").classList.add('none');
	bar_active.style.left = "80px";
})

tab_js.addEventListener("click", function(event) {
	tab_html.classList.remove('active');
	tab_css.classList.remove('active');
	tab_js.classList.add('active');
	document.querySelector("#content_html").classList.add('none');
	document.querySelector("#content_css").classList.add('none');
	document.querySelector("#content_js").classList.remove('none');
	bar_active.style.left = "160px";
})


window.onresize = function(event) {
	if (window.matchMedia("(max-width: 1024px)").matches) {
		jsEditor.setSize("100%", "calc(50vh - 9px)");
		cssEditor.setSize("100%", "calc(50vh - 9px)");
		htmlEditor.setSize("100%", "calc(50vh - 9px)");
	} else {
		jsEditor.setSize("100%", "calc(100vh - 85px)");
		cssEditor.setSize("100%", "calc(100vh - 85px)");
		htmlEditor.setSize("100%", "calc(100vh - 85px)");
	}
}

// Configurando a fonte do editor
document.querySelector("#sub_font").addEventListener("click", function(event) {
	document.documentElement.style.setProperty('--font-size', document.querySelector("#font_size").value);
});
