import { useEffect } from "react";
import { useCameraPermissions } from "expo-image-picker";
import { Linking } from "react-native";

export const useCameraPermission = () => {
  const [status, requestPermissions] = useCameraPermissions();

  const requestPermissionAgain = () => {
    Linking.openSettings();
  };

  useEffect(() => {
    if (!status?.granted) {
      requestPermissions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [status, requestPermissionAgain];
};
