import styled from "styled-components";
import Clock from "./Clock";
import { useEffect, useState } from "react";
import axios from "axios";
import images from "./data.js";
import { mobile } from "./responsive";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffeeee;
  background-image: url(${images.day});
  background-size: cover;
`;
const MainContainer = styled.div`
  z-index: 2;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  height: 600px;
  width: 600px;
  border: none;
  border-radius: 20px;
  background-color: #ffffff;

  background-image: ${(props) => `url(${images[props.backgroundImage]})`};
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;

  ${mobile({
    height: "60%",
    width: "90%",
  })}
`;

const SearchContainer = styled.div`

  margin: 5px auto;
  width: 60%;
  border: none;
  display: flex;
  flex: 1;
  ${mobile({
    width: "50%",   
  })}
`;

const Input = styled.input`
  flex: 5;
  outline: none;
  border: none;
  border-radius: 5px;
  color: black;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 1px;
  background-color: #fff9f9;

  ${mobile({
    fontSize:'12px'
  })}
`;

const TempDisplay = styled.div`
  margin: 5px auto;
  flex: 3;
  height: 100px;
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Temp = styled.span`
  font-size: 140px;
  font-weight: 300;

  ${mobile({
    fontSize: "90px",
  })}
`;

const Desc = styled.span`
  width: 70%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: 700;
`;

const List = styled.ul`
  width: 70%;

  flex: 1;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Item = styled.li`
  margin: 5px auto;
  font-size: 18px;
`;
const ClockContainer = styled.div`
  width: 70%;
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 400;
`;

const Info = styled.span`
  margin-top: 20px;
  font-size: 25px;
  font-weight: 800;
  color: white;
  ${mobile({
    fontWeight:"500",
    fontSize:"20px"
  })}
`;

const Weather = () => {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState();
  const [feel, setFeel] = useState();
  const [humidity, setHumidity] = useState();
  const [wind, setwind] = useState();
  const [desc, setDesc] = useState();

  const handleTemp = async () => {
    try {
      const res = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=6ca2ddc62cbf309560f6d8acd0be775f`
      );
      if (res.data[0] === undefined) {
        alert("Can't find the City");
      } else {
        let lon = res.data[0].lon;
        let lat = res.data[0].lat;
        if (lon && lat) {
          const result = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=6ca2ddc62cbf309560f6d8acd0be775f`
          );
          setTemp(result.data.main.temp);
          setHumidity(result.data.main.humidity);
          setFeel(result.data.main.feels_like);
          setwind(result.data.wind.speed);
          setDesc(result.data.weather[0].main);
          console.log(result.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleTemp();
    console.log(process.env.REACT_APP_KEY);
  };

  useEffect(() => {
    console.log(city);
  }, [city]);

  return (
    <Container>
      <MainContainer backgroundImage={desc.toLowerCase()}>
        <SearchContainer>
          <Input
            placeholder="Search Here"
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </SearchContainer>
        <TempDisplay>
          <Temp>{temp}°C</Temp>
        </TempDisplay>
        <Desc>{desc}</Desc>
        <List>
          <Item>Feel: {feel}°C </Item>
          <Item>Humidity: {humidity}% </Item>
          <Item>Wind: {wind}m/s </Item>
        </List>
        <ClockContainer>
          <Clock />
        </ClockContainer>
      </MainContainer>
      <Info>Press Enter to Search</Info>
    </Container>
  );
};

export default Weather;
