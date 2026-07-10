import React from "react";
import { useState } from "react";

import DownloadBanner from "../../components/home/DownloadBanner";
import GetStarted from "../../components/home/GetStarted";
import DealsGrid from "../../components/menu/DealsGrid";
import CategoryGrid from "../../components/menu/CategoryGrid";
import RestaurantGrid from "../../components/menu/RestaurantGrid";
import Navbar from "/src/components/layout/Navbar";
import HeroBanner from "/src/components/home/HeroBanner";
import AboutUs from "/src/components/home/AboutUs";
import Footer from "/src/components/layout/Footer";
import DeliveryPopup from "../../components/common/DeliveryPopup";

import chef from "/src/assets/chef.png";
import logo from "/src/assets/logo-1.png";
import couple from "/src/assets/couple.png";
import badges from "/src/assets/store-badges.png";
import rider from "/src/assets/rider.png";

export default function ForPopupTest() {
  const handlePartnerClick = () => console.log("Partner CTA clicked");
  const handleRiderClick = () => console.log("Rider CTA clicked");
  const [popupStatus, setPopupStatus] = useState("form"); // null | "form" | "error" | "success"
  const [postcode, setPostcode] = useState("5678");

  const handleFind = () => {
    // later this becomes a real API check against DRF
    const isServed = postcode.toUpperCase().startsWith("EN4");
    setPopupStatus(isServed ? "success" : "error");
  };


  return (
    <>
      <Navbar /> 
      <HeroBanner />
      <div id="menu">
        <DealsGrid />
        <CategoryGrid />
        <RestaurantGrid type="Popular" />
      </div>

      <DeliveryPopup
        isOpen={popupStatus !== null}
        status={popupStatus}
        postcode={postcode}
        onPostcodeChange={setPostcode}
        onFind={handleFind}
        onCollect={() => console.log("collect flow")}
        onClose={() => setPopupStatus(null)}
        image="/src/assets/delivery-popup.png"
      />

      <AboutUs />
      <Footer />
  </>
  );
}