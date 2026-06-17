const fs = require('fs');
const { createCanvas } = require('canvas');

const width = 1072;
const height = 1448;

const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, width, height);

ctx.fillStyle = 'black';

ctx.font = 'bold 64px Arial';

ctx.fillText(
    'CONCIERGE',
    80,
    120
);

ctx.font = '40px Arial';

ctx.fillText(
    'Olá, hóspede.',
    80,
    250
);

ctx.fillText(
    new Date().toLocaleString('pt-BR'),
    80,
    320
);

const buffer = canvas.toBuffer('image/png');

fs.writeFileSync(
    'concierge.png',
    buffer
);

console.log('Imagem criada');
