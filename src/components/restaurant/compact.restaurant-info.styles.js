import styled from "styled-components/native";
import WebView from "react-native-webview";

export const Item = styled.View`
  padding: 10px;
  max-width: 120px;
  align-items: center;
`;

export const CompactWebViewAndroid = styled(WebView)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

export const CompactImageIOS = styled.Image`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;
