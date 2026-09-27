from flask_cors import CORS
from flask import Flask, request
from supabase import create_client
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)


@app.route("/")
def home():
    return "GridGuard backend is running!"


@app.route("/api/projects")
def get_projects():
    response = supabase.table("projects").select("*").execute()

    return response.data


@app.route("/api/projects", methods=["POST"])
def create_project():
    data = request.json

    response = supabase.table("projects").insert({
        "city": data["city"],
        "state": data["state"],
        "company_name": data["companyname"],
        "latitude": data["latitude"],
        "longitude": data["longitude"],
        "project_type": data["type"],
        "project_name": data["projectname"],
        "start_month": data["startMonth"],
        "start_year": data["startYear"]
    }).execute()

    project = response.data[0]

    formatted_project = {
        "id": project["id"],
        "projectname": project["project_name"],
        "companyname": project["company_name"],
        "type": project["project_type"],
        "state": project["state"],
        "city": project["city"],
        "latitude": project["latitude"],
        "longitude": project["longitude"],
        "startMonth": str(project["start_month"]).zfill(2),
        "startYear": project["start_year"]
    }

    return formatted_project, 201


if __name__ == "__main__":
    app.run(debug=True)