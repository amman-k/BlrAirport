import React from "react";

const airlineDomains = {
  'IndiGo': "goindigo.in",
  'Vistara': "airvistara.com",
  "Air India": "airindia.com",
  'SpiceJet': "spicejet.com",
  "Akasa Air": "akasaair.com",
  "AirAsia India": "airasia.co.in",
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
