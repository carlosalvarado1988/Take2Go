import React, { useState, useRef, useContext } from "react";
import { TouchableOpacity, View, Button } from "react-native";
import { CameraType } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useCameraPermission } from "../hooks/useCameraPermissions.hook";
import { Text } from "../../../components/typography/text.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { ProfileCamera } from "./camera.styles";

export const CameraScreen = ({ navigation }) => {
  const [type, setType] = useState(CameraType.front);
  const [status, requestPermissionAgain] = useCameraPermission();
  const { user } = useContext(AuthenticationContext);
  const cameraRef = useRef();

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };
  const snapFoto = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
      navigation.goBack();
    }
  };

  if (!status) {
    return (
      <View>
        <Button
          onPress={() => {
            requestPermissionAgain();
          }}
          title="Grant permission"
        />
      </View>
    );
  }

  if (!status?.granted) {
    return <Text>No access to Camera</Text>;
  }

  return (
    <View>
      <TouchableOpacity onPress={snapFoto}>
        <ProfileCamera
          type={type}
          ref={(camera) => (cameraRef.current = camera)}
          ratio={"16:9"}
        >
          <View>
            <TouchableOpacity onPress={toggleCameraType}>
              <Text>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </ProfileCamera>
      </TouchableOpacity>
    </View>
  );
};
