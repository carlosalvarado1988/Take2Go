import React, { useCallback, useState, useContext } from "react";
import { Avatar, List } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AvatarContainer, ListItem } from "./settings.styles";
import { SafeAreaViewContainer } from "../../../components/utilities/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { colors } from "../../../infrastructure/theme/colors";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

export function SettingsScreen({ navigation }) {
  const { user, onLogout } = useContext(AuthenticationContext);
  const [userPhotoUri, setUserPhotoUri] = useState(null);

  const retrieveProfilePic = async (CurrentUseruid) => {
    try {
      const photoUri = await AsyncStorage.getItem(`${CurrentUseruid}-photo`);
      setUserPhotoUri(photoUri);
    } catch (e) {
      console.error("Error retrieving user photo", e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      retrieveProfilePic(user?.uid);
    }, [user])
  );

  return (
    <SafeAreaViewContainer>
      <AvatarContainer>
        <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
          {userPhotoUri ? (
            <Avatar.Image
              source={{ uri: userPhotoUri }}
              size={180}
              backgroundColor={colors.brand.primary}
            />
          ) : (
            <Avatar.Icon
              icon="human"
              size={180}
              backgroundColor={colors.brand.primary}
            />
          )}
        </TouchableOpacity>
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
