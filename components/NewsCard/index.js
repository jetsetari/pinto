import React from "react";
import { Dimensions, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components";
import { View } from "react-native-animatable";
import { formatDateTime } from "../../functions/formatDateTime";
import CachedImage from "../../components/CachedImage";

const { width, height } = Dimensions.get("window");
const card_width = 162;
const img_width = card_width - 25;
const desc_width = card_width - 20;

function NewsCard({ article, idx, onPress }) {
  const Container = styled.View`
    flex-direction: row;
    width: 100%;
    height: 120px;
    border-radius: 2px;
    margin: 10px 10px 10px 0;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 26px;
    overflow: hidden;
    position: relative;
  `;
  const Image = React.useMemo(() => {
    return () => (
      <CachedImage
        style={{
          width: 105,
          height: 105,
          borderRadius: 26,
          backgroundColor: "#171923",
          marginTop: -3,
          marginLeft: 6,
        }}
        source={{ uri: article.image }}
      />
    );
  }, []);
  return article ? (
    <TouchableWithoutFeedback key={idx} onPress={onPress}>
      <Container>
        <View style={{ flexDirection: "row", width: 100+"%", height: 100+"%", alignItems: "center", backgroundColor: '#284745' }}>
          <Image />
          {/* <ImgContainer source={{ uri: article.image }} resizeMode="cover" /> */}
          <View style={{ width: 100+"%", height: 100+"%", justifyContent: "center" }}>
            <Title numberOfLines={1}>{article.name}</Title>
            <Description>
              <Subtitle>{article.description.substring(0, 55)}...</Subtitle>
            </Description>
            <Description>
              <DateString>{formatDateTime(new Date(article.created.toDate()))}</DateString>
            </Description>
          </View>
        </View>
      </Container>
    </TouchableWithoutFeedback>
  ) : (
    <></>
  );
}

const ImgContainer = styled.Image`
  width: 110px;
  height: 110px;
  border-radius: 16px;
  background-color: #284745;
  margin-top: -3px;
  margin-left: 6px;
`;

const Description = styled.View`
  width: 70%;
  flex-direction: row;
  display: flex;
  padding: 0 0 0 7px;
`;

const Title = styled.Text`
  font-size: 18px;
  color: #ACC63C;
  padding: 0 5px 0 10px;
  width: ${`${desc_width}px`};
  text-align: left;
  font-weight: bold;
  font-family: "TitilliumBold";
`;

const Subtitle = styled.Text`
  font-size: 13px;
  color: #fff;
  padding: 5px 5px 0 5px;
  text-align: left;
  line-height: 20;
  font-family: "TitilliumLight";
`;

const DateString = styled.Text`
  font-size: 11px;
  color: #949494;
  padding: 5px 5px 0 5px;
  text-align: left;
  line-height: 0;
  font-style: italic;
  font-family: "TitilliumLight";
`;

export default NewsCard;
