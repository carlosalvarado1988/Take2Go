import AsyncStorage from "@react-native-async-storage/async-storage";

export const useSendPushNotification = () => {
  async function sendPushNotification() {
    const expoPushToken = await AsyncStorage.getItem("expo-push-token");
    if (expoPushToken) {
      const message = {
        to: expoPushToken,
        sound: "default",
        title: "Catalog is great",
        body: "Now you are subscribed to notifications!",
        data: { _displayInForeground: true },
      };

      const res = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
      console.log("send notification response:", res);
    } else {
      console.log("expoPushToken is missing");
    }
  }
  return [sendPushNotification];
};
