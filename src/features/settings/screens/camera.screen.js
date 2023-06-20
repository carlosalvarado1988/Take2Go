import React, { useState, useRef } from "react";
import { TouchableOpacity, View, Button } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useCameraPermission } from "../hooks/useCameraPermissions.hook";
import { Text } from "../../../components/typography/text.component";

import styled from "styled-components/native";

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
`;

export const CameraScreen = () => {
  const [type, setType] = useState(CameraType.front);
  // const [hasPermission] = Camera.useCameraPermissions();
  const [status, requestPermissionAgain] = useCameraPermission();
  const cameraRef = useRef();

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };
  const snapFoto = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log("🚀 ~ file: camera.screen.js:27 ~ snapFoto ~ photo:", photo);
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
      <ProfileCamera type={type} ref={(camera) => (cameraRef.current = camera)}>
        <View>
          <TouchableOpacity onPress={toggleCameraType}>
            <Text>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={snapFoto}>
            <Text>Take Foto</Text>
          </TouchableOpacity>
        </View>
      </ProfileCamera>
    </View>
  );
};
