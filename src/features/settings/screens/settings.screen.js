import React, { useContext } from "react";
import { List, Avatar } from "react-native-paper";

import { SafeAreaViewContainer } from "../../../components/utilities/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { colors } from "../../../infrastructure/theme/colors";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

import styled from "styled-components/native";

const ListItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;

const AvatarContainer = styled.View`
  align-items: center;
`;

export function SettingsScreen({ navigation }) {
  const { user, onLogout } = useContext(AuthenticationContext);

  return (
    <SafeAreaViewContainer>
      <AvatarContainer>
        <Avatar.Icon
          icon="human"
          size={180}
          backgroundColor={colors.brand.primary}
        />
        <Spacer position="top" size="large">
          <Text variant="label">{user?.email}</Text>
        </Spacer>
      </AvatarContainer>
      <List.Section>
        <ListItem
          title="Favorites"
          description="View your favorites"
          // eslint-disable-next-line react/no-unstable-nested-components
          left={(props) => <List.Icon {...props} color="black" icon="heart" />}
          onPress={() => {
            navigation.navigate("Favorites");
          }}
        />

        <ListItem
          title="Logout"
          // eslint-disable-next-line react/no-unstable-nested-components
          left={(props) => <List.Icon {...props} color="black" icon="logout" />}
          onPress={onLogout}
        />
      </List.Section>
    </SafeAreaViewContainer>
  );
}
