const ICONS = {

sun: `
<svg viewBox="0 0 64 64"
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

partlyCloudy: `
<svg viewBox="0 0 64 64"
fill="none"
stroke="#111"
stroke-width="2.5">

<circle cx="22" cy="22" r="8"/>

<line x1="22" y1="8" x2="22" y2="14"/>
<line x1="22" y1="30" x2="22" y2="36"/>
<line x1="8" y1="22" x2="14" y2="22"/>
<line x1="30" y1="22" x2="36" y2="22"/>
<line x1="12" y1="12" x2="17" y2="17"/>
<line x1="27" y1="27" x2="32" y2="32"/>
<line x1="12" y1="32" x2="17" y2="27"/>
<line x1="27" y1="17" x2="32" y2="12"/>

<path d="
M26 52
H50
A9 9 0 0 0 50 34
A12 12 0 0 0 29 32
A8 8 0 0 0 26 52
"/>

</svg>
`,

cloud: `
<svg viewBox="0 0 64 64"
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

wifi: `
<svg viewBox="0 0 64 64"
fill="none"
stroke="#111"
stroke-width="2.5">

<path d="M8 24 C18 14 46 14 56 24"/>
<path d="M16 33 C22 27 42 27 48 33"/>
<path d="M24 42 C27 39 37 39 40 42"/>
<circle cx="32" cy="52" r="3" fill="#111" stroke="none"/>

</svg>
`,

lock: `
<svg viewBox="0 0 64 64"
fill="none"
stroke="#111"
stroke-width="2.5">

<rect x="16" y="30" width="32" height="24" rx="3"/>
<path d="M22 30 V22 A10 10 0 0 1 42 22 V30"/>
<circle cx="32" cy="43" r="3" fill="#111" stroke="none"/>

</svg>
`,

clock: `
<svg viewBox="0 0 64 64"
fill="none"
stroke="#111"
stroke-width="2.5">

<circle cx="32" cy="32" r="22"/>
<line x1="32" y1="32" x2="32" y2="16"/>
<line x1="32" y1="32" x2="44" y2="38"/>

</svg>
`,

luggage: `
<svg viewBox="0 0 64 64"
fill="none"
stroke="#111"
stroke-width="2.5">

<rect x="14" y="22" width="36" height="30" rx="3"/>

<path d="M24 22V16a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6"/>

<line x1="32" y1="22" x2="32" y2="52"/>
<line x1="14" y1="37" x2="50" y2="37"/>

<line x1="18" y1="52" x2="18" y2="56"/>
<line x1="46" y1="52" x2="46" y2="56"/>

</svg>
`,

calendar: `
<svg viewBox="0 0 64 64"
fill="none"
stroke="#111"
stroke-width="2.5">

<rect x="8" y="12" width="48" height="44" rx="3"/>

<line x1="8" y1="26" x2="56" y2="26"/>

<line x1="22" y1="8" x2="22" y2="18"/>
<line x1="42" y1="8" x2="42" y2="18"/>

<circle cx="22" cy="36" r="2" fill="#111" stroke="none"/>
<circle cx="32" cy="36" r="2" fill="#111" stroke="none"/>
<circle cx="42" cy="36" r="2" fill="#111" stroke="none"/>

<circle cx="22" cy="46" r="2" fill="#111" stroke="none"/>
<circle cx="32" cy="46" r="2" fill="#111" stroke="none"/>

</svg>
`,

whatsapp: `
<svg viewBox="0 0 64 64"
fill="none"
stroke="#111"
stroke-width="2.5"
stroke-linejoin="round"
stroke-linecap="round">

<path d="
M32 10
C19.8 10 10 19.8 10 32
C10 36.2 11.2 40.1 13.3 43.4
L10 54
L21 50.8
C24.2 52.7 27.9 53.8 31.8 53.8
C44 53.8 54 44 54 31.8
C54 19.8 44.2 10 32 10
Z"/>

<path d="
M24 28
C24 28 25 30 27 33
C29 36 31 38 34 39.5
C36 40.5 38 40 39 39
L41 37
C41.5 36.5 41 35.5 40 35
L37 33.5
C36.5 33.2 36 33.5 35.5 34
L34.5 35
C34 35.3 33.4 35.2 33 34.9
C31.5 34 29.5 32 28.5 30.5
C28.2 30 28.1 29.5 28.4 29
L29.3 28
C29.8 27.5 29.8 26.8 29.5 26.3
L28 23.3
C27.5 22.3 26.5 22 25.8 22.5
L24.5 23.5
C23 24.5 23 26.5 24 28
Z"/>

</svg>
`,

drop: `
<svg viewBox="0 0 24 24"
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
