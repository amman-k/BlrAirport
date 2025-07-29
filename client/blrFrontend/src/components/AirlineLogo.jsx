import React from "react";

const airlineDomains = {
  'IndiGo': "goindigo.in",
  'Vistara': "airvistara.com",
  "Air India": "airindia.com",
  'SpiceJet': "spicejet.com",
  "AirAsia India": "airasia.co.in",
  "Air India Express": "airindiaexpress.com",
  "AIX Connect": "aixconnect.in",
  "Alliance Air": "allianceair.in",
  "Qatar Airways": "qatarairways.com",
  "Singapore Airlines": "singaporeair.com",
  "Cathay Pacific Airways": "cathaypacific.com",
  'Emirates': "emirates.com",
  "ANA": "ana.co.jp",
  "Turkish Airlines": "turkishairlines.com",
  "Korean Air": "koreanair.com",
  "Air France": "airfrance.com",
  "Hainan Airlines": "hnair.com.cn",
  "Swiss International Air Lines": "swiss.com",
  "EVA Air": "evaair.com",
  "British Airways": "britishairways.com",
  "Qantas": "qantas.com",
  'Lufthansa': "lufthansa.com",
  "Virgin Atlantic": "virginatlantic.com",
  'Saudia': "saudia.com",
  "STARLUX Airlines": "starlux-airlines.com",
  "Air Canada": "aircanada.com",
  'Iberia': "iberia.com",
  "KLM Royal Dutch Airlines": "klm.com",
  "Delta Air Lines": "delta.com",
  "Austrian Airlines": "austrian.com",
  "Air New Zealand": "airnewzealand.com",
  'Finnair': "finnair.com",
  "Etihad Airways": "etihad.com",
  "Malaysia Airlines": "malaysiaairlines.com",
  'AirAsia': "airasia.com",
  "Thai Airways": "thaiairways.com",
  'Scoot': "flyscoot.com",
  "Fiji Airways": "fijiairways.com",
  "Bangkok Airways": "bangkokair.com",
  "China Southern Airlines": "csair.com",
  "Virgin Australia": "virginaustralia.com",
  "Gulf Air": "gulfair.com",
  "Air Astana": "airastana.com",
  "China Airlines": "china-airlines.com",
  "Ethiopian Airlines": "ethiopianairlines.com",
  'Eurowings': "eurowings.com",
  "Asiana Airlines": "flyasiana.com",
  "Vueling Airlines": "vueling.com",
  "LATAM Airlines": "latam.com",
  "Porter Airlines": "porterairlines.com",
  'Volotea': "volotea.com",
  "Garuda Indonesia": "garuda-indonesia.com",
  "Aegean Airlines": "aegeanair.com",
  "Oman Air": "omanair.com",
  "Transavia France": "transavia.com",
  "Qantas Airways": "qantas.com",
  "KLM": "klm.com",
  "Cathay Pacific": "cathaypacific.com",
  "SriLankan Airlines": "srilankan.com"
};

const AirlineLogo = ({ airlineName }) => {
  const domain = airlineDomains[airlineName];
  const logoUrl = domain
    ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
    : null;

  const FallbackLogo = () => (
    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-400 font-bold">
      {airlineName?.charAt(0)}
    </div>
  );

  if (!logoUrl) {
    return <FallbackLogo />;
  }

  return (
    <img
      src={logoUrl}
      alt={`${airlineName} logo`}
      className="w-8 h-8 rounded-full object-contain bg-white p-1"
      onError={(e) => {
        e.currentTarget.style.display = "none";
        const fallback = document.createElement("div");
        fallback.innerHTML = `<div class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-400 font-bold">${airlineName?.charAt(
          0
        )}</div>`;
        e.currentTarget.parentNode.insertBefore(fallback, e.currentTarget);
      }}
    />
  );
};

export default AirlineLogo;
