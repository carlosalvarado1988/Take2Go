import React from "react";

import { BusinessInfoCard } from "../components/businessInfoCard.component";
import { SafeAreaViewContainer } from "../../../components/utilities/safe-area.component";

export const BusinessDetailsScreen = ({ route }) => {
  const { business } = route.params;

  return (
    <SafeAreaViewContainer>
      <BusinessInfoCard business={business} />
    </SafeAreaViewContainer>
  );
};
