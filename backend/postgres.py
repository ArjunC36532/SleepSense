import psycopg2
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from supabase import create_client, Client
from datetime import datetime, timedelta

load_dotenv()

url = os.environ.get("URL")
key = os.environ.get("KEY")

supabase = create_client(url, key)

class EntryData(BaseModel):
    user_id:int = None
    date: str = None
    hours_of_sleep: float = None
    sleep_quality: int = None
    physical_activity_minutes: int = None
    stress_level: int = None
    total_steps: int = None
    day: str = None


class DataBase:

    @staticmethod
    def add_user(username):
        supabase.table("users").insert({"username": username}).execute()

    @staticmethod
    def add_entry(data):
        # Convert Pydantic model to dictionary
        data_dict = data.model_dump()
        supabase.table("sleep_data").insert(data_dict).execute()
        return "success"

    @staticmethod
    def get_userid(username):
        response = supabase.table("users").select("id").eq("username", username).execute()
        return response.data[0]['id']

    @staticmethod
    def get_sleep_data(user_id, this_week, last_week, this_month):
        data = []
        
        today = datetime.now()
        
        if this_week:
            # Get start of current week (Monday)
            start_date = today - timedelta(days=today.weekday())
            end_date = start_date + timedelta(days=7)
            
            response = supabase.table("sleep_data") \
                .select("date, hours_of_sleep, sleep_quality, day") \
                .eq("user_id", user_id) \
                .gte("date", start_date.strftime('%Y-%m-%d')) \
                .lt("date", end_date.strftime('%Y-%m-%d')) \
                .order("date") \
                .execute()
                
        elif last_week:
            # Get start of last week (Monday)
            start_date = today - timedelta(days=today.weekday() + 7)
            end_date = start_date + timedelta(days=7)
            
            response = supabase.table("sleep_data") \
                .select("date, hours_of_sleep, sleep_quality, day") \
                .eq("user_id", user_id) \
                .gte("date", start_date.strftime('%Y-%m-%d')) \
                .lt("date", end_date.strftime('%Y-%m-%d')) \
                .order("date") \
                .execute()
                
        elif this_month:
            # Get start of current month
            start_date = today.replace(day=1)
            # Get start of next month
            if today.month == 12:
                end_date = today.replace(year=today.year + 1, month=1, day=1)
            else:
                end_date = today.replace(month=today.month + 1, day=1)
            
            response = supabase.table("sleep_data") \
                .select("date, hours_of_sleep, sleep_quality, day") \
                .eq("user_id", user_id) \
                .gte("date", start_date.strftime('%Y-%m-%d')) \
                .lt("date", end_date.strftime('%Y-%m-%d')) \
                .order("date") \
                .execute()

        if response.data:
            for row in response.data:
                data.append({
                    "name": row["day"],
                    "sleepHours": row["hours_of_sleep"],
                    "sleepQuality": row["sleep_quality"]
                })

        return data
    

    @staticmethod
    def calculate_average(userID, column):
        response = supabase.table("sleep_data") \
            .select(column) \
            .eq("user_id", userID) \
            .execute()
        
        if not response.data:
            return 0
            
        values = [row[column] for row in response.data]
        return sum(values) / len(values) if values else 0
    
   




    

        

        