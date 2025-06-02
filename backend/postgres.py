import psycopg2
from pydantic import BaseModel


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
        connection = None
        cursor = None

        try:
            connection = psycopg2.connect(
                host="localhost",
                port="5432",
                database="sleep_tracker",
                user="postgres",
                password="21902190"
            )
            cursor = connection.cursor()

            insert_query = """
                INSERT INTO users (username)
                VALUES (%s)
            """

            values = (username,)  # tuple with one element

            cursor.execute(insert_query, values)
            connection.commit()
            cursor.close()
            connection.close()

            return "success"

        except Exception as error:
            return "Error while inserting entry", error

        finally:
            if cursor is not None:
                cursor.close()
            if connection is not None:
                connection.close()

    @staticmethod
    def add_entry(data):
        connection = None
        cursor = None

        try:
            connection = psycopg2.connect(
                host="localhost",
                port="5432",
                database="sleep_tracker",
                user="postgres",
                password="21902190"
            )
            cursor = connection.cursor()
            print(data.day)
            insert_query = """INSERT INTO sleep_data (user_id, date, hours_of_sleep, sleep_quality, 
            physical_activity_minutes, stress_level, total_steps, day) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"""

            values = (data.user_id, data.date, data.hours_of_sleep, data.sleep_quality, data.physical_activity_minutes, data.stress_level, data.total_steps, data.day)  # tuple with one element


            cursor.execute(insert_query, values)
            connection.commit()
            cursor.close()
            connection.close()

            return "success"

        except Exception as error:
            return "Error while inserting entry", error

        finally:
            if cursor is not None:
                cursor.close()
            if connection is not None:
                connection.close()

    @staticmethod
    def get_userid(email):
        connection = psycopg2.connect(
            host="localhost",
            port="5432",
            database="sleep_tracker",
            user='postgres',
            password='21902190'
        )

        cursor = connection.cursor()

        query = "SELECT id FROM users where username = %s"

        cursor.execute(query, (email,))

        result = cursor.fetchone()
        if result:
            return result[0]

        connection.close()
        cursor.close()

    @staticmethod
    def get_sleep_data(user_id, this_week, last_week, this_month):
        connection = psycopg2.connect(
            host="localhost",
            port="5432",
            database="sleep_tracker",
            user='postgres',
            password='21902190'
        )

        cursor = connection.cursor()
        query = None

        if this_week:
            query = """
                SELECT date, hours_of_sleep, sleep_quality, day
                FROM sleep_data
                WHERE user_id = %s AND date >= date_trunc('week', CURRENT_DATE) AND date < date_trunc('week', CURRENT_DATE) + INTERVAL '7 days'
                ORDER BY date
            """
        elif last_week:
            query = """
                SELECT date, hours_of_sleep, sleep_quality, day
                FROM sleep_data
                WHERE user_id = %s AND date >= date_trunc('week', CURRENT_DATE) - INTERVAL '7 days' AND date < date_trunc('week', CURRENT_DATE)
                ORDER BY date
            """
        elif this_month:
            query = """
                SELECT date, hours_of_sleep, sleep_quality, day
                FROM sleep_data
                WHERE user_id = %s AND date >= date_trunc('month', CURRENT_DATE) AND date < date_trunc('month', CURRENT_DATE) + INTERVAL '1 month'
                ORDER BY date
            """

        if query is None:
            return []

        cursor.execute(query, (user_id,))
        rows = cursor.fetchall()

        print(rows)

        data = []

        for row in rows:
            data.append({
                "name": row[3],  # day
                "sleepHours": row[1],  # hours_of_sleep
                "sleepQuality": row[2]  # sleep_quality
            })

        cursor.close()
        connection.close()
        return data
    

    @staticmethod
    def calculate_average(userID, column):
        connection = psycopg2.connect(
            host="localhost",
            port="5432",
            database="sleep_tracker",
            user='postgres',
            password='21902190'
        )

        cursor = connection.cursor()

        query = f"""
            SELECT AVG({column})
            FROM sleep_data
            WHERE user_id = %s;
        """
        
        cursor.execute(query, (userID,))

        rows = cursor.fetchall()
        cursor.close()
        connection.close()
        return rows[0][0]
    
   




    

        

        