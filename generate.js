const fs = require('fs');

const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Kindle Concierge</title>
</head>
<body>

<h1>Olá, hóspede.</h1>

<p>Gerado automaticamente pelo GitHub Actions.</p>

<p>Data da geração:</p>

<p>${new Date().toLocaleString('pt-BR')}</p>

</body>
</html>
`;

fs.writeFileSync('index.html', html);

console.log('Página criada.');
