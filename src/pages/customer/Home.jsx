import React from "react";
import HeroBanner from "../../components/common/HeroBanner";
import PartnerRideSection from "../../components/common/PartnerRideSection";
import DealCard from "../../components/menu/dealCard";

// Replace these with the actual image paths/imports you're providing.
import chef from "/src/assets/chef.png";
import logo from "/src/assets/logo-1.png";
import couple from "/src/assets/couple.png";
import badges from "/src/assets/store-badges.png";
import rider from "/src/assets/rider.png";

export default function Home() {
  const handlePartnerClick = () => {
    // e.g. navigate("/partner-signup")
    console.log("Partner CTA clicked");
  };

  const handleRiderClick = () => {
    // e.g. navigate("/rider-signup")
    console.log("Rider CTA clicked");
  };

  return (
    <>
      <div>
        <DealCard image="/src/assets/deal1.png" name="Deal 1" restaurantLabel="Restaurant A" discount="20% Off" />
      </div>

      <div className="mx-auto max-w-6xl space-y-6 p-6">
        <HeroBanner imageLogo={logo} imageSrc={couple} appBadgesSrc={badges} />

        <PartnerRideSection
          partnerImage={chef}
          riderImage={rider}
          onPartnerClick={handlePartnerClick}
          onRiderClick={handleRiderClick}
        />
      </div>
    </>
  );
}