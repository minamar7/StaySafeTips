export default async function handler(req, res) {

const country = (req.query.country || "Greece").trim().toLowerCase();

const countries = {

/* EUROPE */
greece:"GR",
cyprus:"CY",
italy:"IT",
france:"FR",
spain:"ES",
portugal:"PT",
germany:"DE",
austria:"AT",
switzerland:"CH",
netherlands:"NL",
belgium:"BE",
luxembourg:"LU",
ireland:"IE",
uk:"GB",
united kingdom:"GB",
england:"GB",
scotland:"GB",
wales:"GB",
norway:"NO",
sweden:"SE",
finland:"FI",
denmark:"DK",
poland:"PL",
czech republic:"CZ",
hungary:"HU",
romania:"RO",
bulgaria:"BG",
croatia:"HR",
serbia:"RS",
slovenia:"SI",
slovakia:"SK",
albania:"AL",
north macedonia:"MK",
bosnia:"BA",
montenegro:"ME",
turkey:"TR",
ukraine:"UA",

/* ASIA */
thailand:"TH",
japan:"JP",
china:"CN",
south korea:"KR",
india:"IN",
pakistan:"PK",
indonesia:"ID",
malaysia:"MY",
singapore:"SG",
philippines:"PH",
vietnam:"VN",
cambodia:"KH",
laos:"LA",
sri lanka:"LK",
nepal:"NP",
maldives:"MV",
uae:"AE",
dubai:"AE",
abu dhabi:"AE",
qatar:"QA",
saudi arabia:"SA",
kuwait:"KW",
oman:"OM",
bahrain:"BH",
jordan:"JO",
israel:"IL",
lebanon:"LB",

/* AFRICA */
egypt:"EG",
morocco:"MA",
tunisia:"TN",
algeria:"DZ",
south africa:"ZA",
kenya:"KE",
tanzania:"TZ",
seychelles:"SC",
mauritius:"MU",
nigeria:"NG",

/* AMERICA */
usa:"US",
united states:"US",
canada:"CA",
mexico:"MX",
brazil:"BR",
argentina:"AR",
chile:"CL",
colombia:"CO",
peru:"PE",
dominican republic:"DO",
jamaica:"JM",
bahamas:"BS",
cuba:"CU",

/* OCEANIA */
australia:"AU",
new zealand:"NZ",
fiji:"FJ"

};

const code = countries[country] || country.toUpperCase();

try {

const response = await fetch(
`https://www.travel-advisory.info/api?countrycode=${code}`
);

const data = await response.json();

if (!data || !data.data || !data.data[code]) {
throw new Error("Country not found");
}

const item = data.data[code];

const advisory = item.advisory?.score || 2.5;

let score = Math.round(100 - (advisory * 20));

if (score < 0) score = 0;
if (score > 100) score = 100;

let level = "Low Risk";
let emoji = "🟢";

if (score < 80) {
level = "Moderate Risk";
emoji = "🟡";
}

if (score < 65) {
level = "Elevated Risk";
emoji = "🟠";
}

if (score < 45) {
level = "High Risk";
emoji = "🔴";
}

res.status(200).json({
success: true,
country: item.name,
code: code,
score: score,
level: level,
emoji: emoji,
message: item.advisory?.message || "No message available",
updated: item.advisory?.updated || "Live",
source: "travel-advisory.info"
});

} catch (error) {

res.status(200).json({
success: false,
country: country,
score: 75,
level: "Unavailable",
emoji: "⚪",
message: "Live advisory source temporarily unavailable.",
updated: "Now",
source: "fallback"
});

}

}
