import httpx
from typing import Optional
from langsmith import traceable
from models.schemas import CountryInfo

@traceable(name="fetch_country_info")
async def fetch_country_info(destination: str) -> Optional[CountryInfo]:
    try:
        # Extract country name if user passes city like "Tokyo, Japan" or "Paris"
        clean_name = destination.split(",")[-1].strip()
        url = f"https://restcountries.com/v3.1/name/{clean_name}?fullText=false"
        
        async with httpx.AsyncClient(timeout=6.0) as client:
            resp = await client.get(url)
            if resp.status_code == 200:
                data = resp.json()[0]
                
                # Currencies
                currencies_dict = data.get("currencies", {})
                curr_list = []
                for code, details in currencies_dict.items():
                    symbol = details.get("symbol", "")
                    name = details.get("name", code)
                    curr_list.append(f"{name} ({symbol})" if symbol else name)
                currency_str = ", ".join(curr_list) if curr_list else "N/A"
                
                # Languages
                languages = list(data.get("languages", {}).values())
                
                # Capital & Flags
                capital = data.get("capital", ["N/A"])[0] if data.get("capital") else "N/A"
                flag_emoji = data.get("flag", "🌐")
                flag_url = data.get("flags", {}).get("png", "")
                
                pop = data.get("population", 0)
                formatted_pop = f"{pop:,}"
                
                return CountryInfo(
                    name=data.get("name", {}).get("common", clean_name),
                    capital=capital,
                    region=data.get("region", "N/A"),
                    subregion=data.get("subregion", "N/A"),
                    population=formatted_pop,
                    currency=currency_str,
                    languages=languages or ["N/A"],
                    timezones=data.get("timezones", ["UTC"]),
                    flag_emoji=flag_emoji,
                    flag_url=flag_url
                )
    except Exception as e:
        print(f"Error fetching country info for {destination}: {e}")
    
    # Fallback default info
    return CountryInfo(
        name=destination.capitalize(),
        capital="Major Metropolitan Hub",
        region="Global Destination",
        subregion="Tourist Region",
        population="Variable",
        currency="Local Currency",
        languages=["Local Language", "English"],
        timezones=["UTC+0"],
        flag_emoji="🌍",
        flag_url="https://flagcdn.com/w320/un.png"
    )
