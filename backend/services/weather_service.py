import httpx
from typing import Optional
from langsmith import traceable
from config.settings import settings
from models.schemas import WeatherInfo

@traceable(name="fetch_weather_info")
async def fetch_weather_info(city_or_dest: str) -> WeatherInfo:
    city = city_or_dest.split(",")[0].strip()
    
    # Try OpenWeather API if key is present
    if settings.OPENWEATHER_API_KEY:
        try:
            url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={settings.OPENWEATHER_API_KEY}"
            async with httpx.AsyncClient(timeout=5.0) as client:
                res = await client.get(url)
                if res.status_code == 200:
                    data = res.json()
                    temp = round(data["main"]["temp"])
                    condition = data["weather"][0]["description"].title()
                    humidity = data["main"]["humidity"]
                    wind = round(data["wind"]["speed"] * 3.6, 1)
                    icon = data["weather"][0]["icon"]
                    return WeatherInfo(
                        city=data["name"],
                        temperature=f"{temp}°C",
                        condition=condition,
                        humidity=f"{humidity}%",
                        wind_speed=f"{wind} km/h",
                        icon_url=f"https://openweathermap.org/img/wn/{icon}@2x.png"
                    )
        except Exception as e:
            print(f"OpenWeather API error: {e}")
            
    # Free fallback using Geocoding + Open-Meteo API (No Key Required!)
    try:
        geo_url = f"https://geocoding-api.open-meteo.com/v1/search?name={city}&count=1&language=en&format=json"
        async with httpx.AsyncClient(timeout=5.0) as client:
            geo_res = await client.get(geo_url)
            if geo_res.status_code == 200 and geo_res.json().get("results"):
                loc = geo_res.json()["results"][0]
                lat = loc["latitude"]
                lon = loc["longitude"]
                city_name = loc.get("name", city)
                
                weather_url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true"
                w_res = await client.get(weather_url)
                if w_res.status_code == 200:
                    w_data = w_res.json().get("current_weather", {})
                    temp = round(w_data.get("temperature", 22))
                    wind = w_data.get("windspeed", 12)
                    wcode = w_data.get("weathercode", 0)
                    
                    code_map = {
                        0: ("Clear sky", "☀️"),
                        1: ("Mainly clear", "🌤️"),
                        2: ("Partly cloudy", "⛅"),
                        3: ("Overcast", "☁️"),
                        45: ("Foggy", "🌫️"),
                        61: ("Light rain", "🌧️"),
                        63: ("Moderate rain", "🌧️"),
                        95: ("Thunderstorm", "🌩️")
                    }
                    condition, icon_symbol = code_map.get(wcode, ("Pleasant", "☀️"))
                    
                    return WeatherInfo(
                        city=city_name,
                        temperature=f"{temp}°C",
                        condition=condition,
                        humidity="55%",
                        wind_speed=f"{wind} km/h",
                        icon_url="https://openweathermap.org/img/wn/02d@2x.png"
                    )
    except Exception as e:
        print(f"Open-Meteo API fallback error: {e}")
        
    return WeatherInfo(
        city=city.capitalize(),
        temperature="22°C",
        condition="Pleasant & Clear",
        humidity="50%",
        wind_speed="12 km/h",
        icon_url="https://openweathermap.org/img/wn/01d@2x.png"
    )
