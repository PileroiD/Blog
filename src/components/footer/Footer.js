import { useEffect, useState } from "react";
import styled from "styled-components";

const FooterContainer = ({ className }) => {
    const [city, setCity] = useState("");
    const [temperature, setTemperature] = useState("");
    const [weather, setWeather] = useState("");

    const _apiKey = "823dec8cdc4b8461f786d3bb88d7abf2";
    const date = new Date().toLocaleString("eng", {
        day: "numeric",
        month: "long",
    });

    useEffect(() => {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=32.776566&lon=-79.930923&appid=${_apiKey}&units=metric`
        )
            .then((data) => data.json())
            .then(({ name, main, weather }) => {
                setCity(name);
                setTemperature(Math.round(main.temp));
                setWeather(weather[0].description);
            });
    }, []);

    return (
        <div className={className}>
            <div>
                <div>Web-developer Blog</div>
                <div>pileroid@gmail.com</div>
            </div>
            <div>
                <div>
                    {city}, {date}
                </div>
                <div>
                    {temperature} °C, {weather}
                </div>
            </div>
        </div>
    );
};

export const Footer = styled(FooterContainer)`
    width: 1000px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 120px;
    padding: 20px 40px;
    box-shadow: 0px 2px 17px #000;
    background-color: #fff;
    font-weight: bold;
`;
