import React from "react";
import { Dimensions, TouchableWithoutFeedback } from "react-native";

//import styles and assets
import styled from "styled-components";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../config/colors";
import { SP } from "../../config/Typography";
import { SharedElement } from "react-navigation-shared-element";

const { width, height } = Dimensions.get("window");
const card_width = width * 0.8;
const img_width = card_width * 0.35;
const desc_width = card_width - img_width;

function MapCard({ image, title, subtitle, freePlaces, id, property, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
        <Container>
          <SharedElement id={`item.${id}.image_url`}>
            <ImgContainer source={{ uri: image }} resizeMode="cover" />
          </SharedElement>

          <Description>
            <SharedElement id={`item.${id}.title`}>
              <Title numberOfLines={1}>{title}</Title>
            </SharedElement>
            <SharedElement id={`item.${id}.address`}>
              <Subtitle>{subtitle}</Subtitle>
            </SharedElement>
          </Description>
        </Container>
    </TouchableWithoutFeedback>
  );
}

const Container = styled.View`
  flex-direction: row;
  width: ${`${card_width}px`};
  height: 110px;
  background-color: #FFFFFF;
  border-radius: 9px;
  margin: 0 10px 20px;
`;

const ImgContainer = styled.Image`
  width: ${`${img_width}px`};
  height: 100%;
  border-top-left-radius: 9px;
  border-bottom-left-radius: 9px;
  background-color: #1e8c62;
`;

const Description = styled.View`
  width: ${`${desc_width}px`};
  padding: 20px 12px;
  color: #000;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-top: 0px;
  margin-bottom: 0px;
  font-family: 'TitilliumBold';
  color: #000;
`;

const Subtitle = styled.Text`
  font-size: 10px;
  color: #000;
  font-family: 'TitilliumLight';
`;

export default MapCard;
