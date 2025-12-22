// Real-world examples for each reactor type

// Real-world examples for each reactor type
export const reactorExamples: Record<string, { name: string; location: string; note: string }[]> = {
    pwr: [
        { name: 'Diablo Canyon', location: 'California, USA', note: '2,256 MW — California\'s last nuclear plant, extended to 2030' },
        { name: 'Gravelines', location: 'France', note: '5,460 MW — Europe\'s largest nuclear power plant' },
        { name: 'Three Mile Island', location: 'Pennsylvania, USA', note: 'Site of 1979 partial meltdown (Unit 2); Unit 1 operated safely until 2019' },
    ],
    bwr: [
        { name: 'Fukushima Daiichi', location: 'Japan', note: 'BWR design affected by 2011 tsunami; led to global safety improvements' },
        { name: 'Peach Bottom', location: 'Pennsylvania, USA', note: '2,779 MW — one of USA\'s largest BWRs, operating since 1974' },
        { name: 'Kashiwazaki-Kariwa', location: 'Japan', note: '7,965 MW — world\'s largest nuclear plant by capacity' },
    ],
    candu: [
        { name: 'Bruce Nuclear', location: 'Ontario, Canada', note: '6,384 MW — world\'s largest operating nuclear plant by unit count' },
        { name: 'Pickering', location: 'Ontario, Canada', note: '3,094 MW — slated for refurbishment, extending life to 2060s' },
        { name: 'Qinshan Phase III', location: 'China', note: 'Two CANDU-6 units — demonstrating Canadian technology export' },
    ],
    rbmk: [
        { name: 'Chernobyl Unit 4', location: 'Ukraine', note: 'Site of 1986 disaster — other units operated until 2000' },
        { name: 'Smolensk', location: 'Russia', note: 'Three RBMK-1000 units still operating (retrofitted safety improvements)' },
        { name: 'Kursk', location: 'Russia', note: 'Four RBMK units; Unit 1 retired 2021, others continue with upgrades' },
    ],
    htgr: [
        { name: 'HTR-PM', location: 'Shandong, China', note: '210 MW — world\'s first commercial pebble-bed HTGR, started 2021' },
        { name: 'Fort St. Vrain', location: 'Colorado, USA', note: 'Operated 1979-1989 — early HTGR demonstration plant' },
        { name: 'THTR-300', location: 'Germany', note: 'Operated 1987-1989 — thorium high-temperature reactor prototype' },
    ],
    smr: [
        { name: 'NuScale VOYGR', location: 'Idaho, USA (planned)', note: '462 MW (6×77 MW modules) — first NRC-certified SMR design' },
        { name: 'Akademik Lomonosov', location: 'Russia (floating)', note: '70 MW — world\'s first floating nuclear power plant' },
        { name: 'Rolls-Royce SMR', location: 'UK (planned)', note: '470 MW — UK\'s preferred SMR for 2030s deployment' },
    ],
};

// Reactor comparison data
export const reactorComparison = {
    headers: ['Feature', 'PWR', 'BWR', 'CANDU', 'RBMK', 'HTGR', 'SMR'],
    rows: [
        { feature: 'Market Share', values: ['~70%', '~20%', '~5%', '<1%', '0%*', '0%*'] },
        { feature: 'Coolant', values: ['Light water', 'Light water', 'Heavy water', 'Light water', 'Helium gas', 'Varies'] },
        { feature: 'Moderator', values: ['Light water', 'Light water', 'Heavy water', 'Graphite', 'Graphite', 'Varies'] },
        { feature: 'Fuel Enrichment', values: ['3-5%', '3-5%', 'Natural (0.7%)', '2%', 'Up to 20%', 'Varies'] },
        { feature: 'Online Refueling', values: ['No', 'No', 'Yes', 'Yes', 'No', 'Varies'] },
        { feature: 'Containment', values: ['Yes', 'Yes', 'Yes', 'Originally No', 'Yes', 'Yes'] },
        { feature: 'Typical Size', values: ['1,000+ MW', '1,000+ MW', '600-900 MW', '1,000 MW', '250-600 MW', '<300 MW'] },
        { feature: 'Best For', values: ['Baseload', 'Baseload', 'No enrichment', '(Obsolete)', 'Industrial heat', 'Remote/modular'] },
    ],
    footnotes: [
        '*HTGR and SMR are next-generation; few commercial units exist yet',
        '**Modern RBMK retrofits added some confinement; design no longer built',
    ],
};
