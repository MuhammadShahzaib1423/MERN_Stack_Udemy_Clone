import React from "react";
import { assets } from "../Assets/assets";

const logos = [
  { src: assets.microsoft_logo, alt: "Microsoft" },
  { src: assets.walmart_logo, alt: "Walmart" },
  { src: assets.accenture_logo, alt: "Accenture" },
  { src: assets.adobe_logo, alt: "Adobe" },
  { src: assets.paypal_logo, alt: "Paypal" },

];

const Companies = () => {
  return (
    <div className="pt-16 overflow-hidden">
      <p className="text-gray-500 text-center">Trusted by learners from</p>

      <div className="relative overflow-hidden mt-8">
        <div className="flex animate-scroll gap-16">
          {/* Duplicate list to create loop */}
          {logos.concat(logos).map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.alt}
              className="w-20 md:w-28 object-contain"
            />
          ))}
        </div>
      </div>
      
    </div>
   
  );
};

export default Companies;
