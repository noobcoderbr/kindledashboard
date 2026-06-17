const ICONS = {

sun: `
<svg viewBox="0 0 64 64"
width="120"
height="120"
fill="none"
stroke="#111"
stroke-width="2.5">

<circle cx="32" cy="32" r="12"/>

<line x1="32" y1="4" x2="32" y2="14"/>
<line x1="32" y1="50" x2="32" y2="60"/>

<line x1="4" y1="32" x2="14" y2="32"/>
<line x1="50" y1="32" x2="60" y2="32"/>

<line x1="11" y1="11" x2="18" y2="18"/>
<line x1="46" y1="46" x2="53" y2="53"/>

<line x1="11" y1="53" x2="18" y2="46"/>
<line x1="46" y1="18" x2="53" y2="11"/>

</svg>
`,

cloud: `
<svg viewBox="0 0 64 64"
width="120"
height="120"
fill="none"
stroke="#111"
stroke-width="2.5">

<path d="
M20 46
H48
A10 10 0 0 0 48 26
A14 14 0 0 0 21 24
A9 9 0 0 0 20 46
"/>

</svg>
`,

rain: `
<svg viewBox="0 0 64 64"
width="120"
height="120"
fill="none"
stroke="#111"
stroke-width="2.5">

<path d="
M20 40
H48
A10 10 0 0 0 48 22
A14 14 0 0 0 21 20
A9 9 0 0 0 20 40
"/>

<line x1="24" y1="48" x2="20" y2="56"/>
<line x1="34" y1="48" x2="30" y2="56"/>
<line x1="44" y1="48" x2="40" y2="56"/>

</svg>
`,

storm: `
<svg viewBox="0 0 64 64"
width="120"
height="120"
fill="none"
stroke="#111"
stroke-width="2.5">

<path d="
M20 40
H48
A10 10 0 0 0 48 22
A14 14 0 0 0 21 20
A9 9 0 0 0 20 40
"/>

<polyline points="
32,44
26,54
34,54
28,62
"/>

</svg>
`,

drop: `
<svg viewBox="0 0 24 24"
width="12"
height="12"
fill="none"
stroke="#666"
stroke-width="2">

<path d="
M12 2
C12 2 6 10 6 14
A6 6 0 0 0 18 14
C18 10 12 2 12 2
"/>

</svg>
`

};
