import React, { useContext } from "react";
import { List } from "react-native-paper";

import { SafeAreaViewContainer } from "../../../components/utilities/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

export function SettingsScreen({ navigation }) {
  const { onLogout } = useContext(AuthenticationContext);
  return (
    <SafeAreaViewContainer>
      <List.Section>
        <List.Item
          title="Favorites"
          description="View your favorites"
          // eslint-disable-next-line react/no-unstable-nested-components
          left={(props) => <List.Icon {...props} color="black" icon="heart" />}
          onPress={() => {
            navigation.navigate("Favorites");
          }}
        />

        <List.Item
          title="Logout"
          // eslint-disable-next-line react/no-unstable-nested-components
          left={(props) => <List.Icon {...props} color="black" icon="logout" />}
          onPress={onLogout}
        />
      </List.Section>
    </SafeAreaViewContainer>
  );
}
