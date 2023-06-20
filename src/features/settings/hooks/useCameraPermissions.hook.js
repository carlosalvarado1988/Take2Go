import { useEffect } from "react";

import { Linking } from "react-native";
import { useCameraPermissions } from "expo-image-picker";

export const useCameraPermission = () => {
  const [status, requestPermissions] = useCameraPermissions();

  const requestPermissionAgain = () => {
    Linking.openSettings();
  };

  useEffect(() => {
    if (!status?.granted) {
      console.log(
        "🚀 ~ file: useCameraPermissions.hook.js:17 ~ useEffect ~ requestPermissions:"
      );
      requestPermissions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(
    "🚀 ~ file: useCameraPermissions.hook.js:22 ~ useCameraPermission ~ status:",
    status
  );
  return [status, requestPermissionAgain];
};
