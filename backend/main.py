from fastapi import FastAPI, HTTPException
from typing import TypedDict
import joblib
from fastapi.middleware.cors import CORSMiddleware
from postgres import DataBase
from postgres import EntryData
from mangum import Mangum

app = FastAPI()
handler = Mangum(app)

# Define the allowed origins
origins = [
    "http://localhost:3000",  # React dev server
    "http://127.0.0.1:3000",
    "https://sleep-sense.vercel.app/"
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Or use ["*"] to allow all
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)


class Data(TypedDict):
    age: int
    sleep_duration: float
    quality_of_sleep: int
    phys_activity_level: int
    stress_level: int
    daily_steps: int
    gender: str
    weight: str
    height: str

    @staticmethod
    def get_features(data: 'Data'):
        gender_male = data['gender'].lower() == 'male'
        gender_female = not gender_male

        bmi = float(data['weight']) / (float(data['height']) ** 2)  # assuming height is in meters
        BMI_obese = bmi > 29.9
        BMI_overweight = 24.9 < bmi <= 29.9
        BMI_normal = bmi <= 24.9

        return [data['age'], data['sleep_duration'], data['quality_of_sleep'], data['phys_activity_level'],
                data['stress_level'], data['daily_steps'], gender_female, gender_male, BMI_normal,
                BMI_normal,
                BMI_overweight, BMI_obese
                ]

class QuestionareData(TypedDict):
    user_id: int
    age: int
    gender: str
    occupation: str
    weight: str
    height: str

class UserData(TypedDict):
    user_name: str


model = joblib.load('model.joblib')
database = []


@app.get('/')
def root():
    return {"Hello": "World"}


@app.post('/upload-data')
def upload_data(data: Data):
    database.append(data)


@app.post("/predict")
def predict(data: QuestionareData):
    # Format Data
    # Send to model and get output

    # Create list of properly formatted data to send to model
    features = []
    features.append(data['age'])
    
    # Calculate avg sleep_duration
    avg_sleep_duration = DataBase.calculate_average(data['user_id'], "hours_of_sleep")
    features.append(avg_sleep_duration)

    # Calculate avg sleep quality
    avg_sleep_quality = DataBase.calculate_average(data['user_id'], "sleep_quality")
    features.append(avg_sleep_quality)

    # Calculate avg phys activity level
    avg_phys_activity = DataBase.calculate_average(data['user_id'], "physical_activity_minutes")
    features.append(avg_phys_activity)

    # Calculate avg stress level
    avg_stress_level = DataBase.calculate_average(data['user_id'], "stress_level")
    features.append(avg_stress_level)

    # Calculate avg steps
    avg_steps = DataBase.calculate_average(data['user_id'], "total_steps")
    features.append(avg_steps)

    # Set gender vars
    gender_female, gender_male = False, False
    if data['gender'] == "male":
        gender_male = True
    else:
        gender_female = True

    features.append(gender_female)
    features.append(gender_male)

    # Set occupation vars
    manual_labor, office_worker, retired, student = False, False, False, False
    if data['occupation'] == "manual_labor":
        manual_labor = True
    if data['occupation'] == "office_worker":
        office_worker = True
    if data['occupation'] == "retired":
        retired = True
    if data['occupation'] == "student":
        student = True
    
    features.append(manual_labor)
    features.append(office_worker)
    features.append(retired)
    features.append(student)

    # calculate bmi
    bmi = round(float(data['weight']) / (float(data['height']) ** 2), 1)

    normal, obese, overweight, underweight = False, False, False, False

    if bmi > 30:
        obese = True
    if bmi >= 25 and bmi <= 29.9:
        overweight = True
    if bmi >= 18.5 and bmi <= 24.9:
        normal = True
    if bmi < 18.5:
        underweight = True

    features.append(normal)
    features.append(obese)
    features.append(overweight)
    features.append(underweight)

    # make prediction
    model = joblib.load("model/model.pkl")
    prediction = model.predict([features])
    return prediction[0]


@app.post("/add-user")
def add_user(data: UserData):
    DataBase.add_user(data['user_name'])
    return {"received_user_name": data['user_name']}


@app.post("/add-entry")
def add_entry(data: EntryData):
    result = DataBase.add_entry(data)
    if result == "success":
        return {"status": "success", "message": "Entry added successfully"}
    else:
        raise HTTPException(status_code=500, detail=str(result[1]))


@app.post("/get-userid")
def get_userid(email: str = None):
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")
    id = DataBase.get_userid(email)
    if id is None:
        raise HTTPException(status_code=404, detail="User not found")
    return {"user_id": id}

@app.post("/get-sleep-data")
def get_sleep_data(user_id: int, this_week: bool, last_week: bool, this_month: bool):
    if not any([this_week, last_week, this_month]):
        raise HTTPException(status_code=400, detail="At least one time period must be selected")
    
    data = DataBase.get_sleep_data(user_id, this_week, last_week, this_month)
    return data



    
    
