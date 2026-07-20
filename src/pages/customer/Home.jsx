import React from "react";

import DownloadBanner from "../../components/home/DownloadBanner";
import GetStarted from "../../components/home/GetStarted";
import DealsGrid from "../../components/menu/DealsGrid";
import CategoryGrid from "../../components/menu/CategoryGrid";
import RestaurantGrid from "../../components/menu/RestaurantGrid";
import Navbar from "/src/components/layout/Navbar";
import HeroBanner from "/src/components/home/HeroBanner";
import AboutUs from "/src/components/home/AboutUs";
import Footer from "/src/components/layout/Footer";

import chef from "/src/assets/chef.png";
import logo from "/src/assets/logo-1.png";
import couple from "/src/assets/couple.png";
import badges from "/src/assets/store-badges.png";
import rider from "/src/assets/rider.png";

export default function Home() {
  const handlePartnerClick = () => console.log("Partner CTA clicked");
  const handleRiderClick = () => console.log("Rider CTA clicked");

  return (
    <>
      <Navbar /> 
      <HeroBanner />
      <div id="deals">
        <DealsGrid />
      </div>
      <div id="categories">
        <CategoryGrid />
      </div>
      <RestaurantGrid type="Popular" />
      
      <div className="mx-auto max-w-6xl space-y-6 p-6">
        <DownloadBanner imageLogo={logo} imageSrc={couple} appBadgesSrc={badges} />
        <GetStarted
          partnerImage={chef}
          riderImage={rider}
          onPartnerClick={handlePartnerClick}
          onRiderClick={handleRiderClick}
        />
      </div>

      <AboutUs />
      <Footer />
  </>
  );
}