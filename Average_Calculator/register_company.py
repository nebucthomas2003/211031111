import requests


registration_url = "http://20.244.56.144/test/register"


registration_data = {
    "companyName": "gofart",
    "ownerName": "Rahul",
    "rollNo": "1",
    "ownerEmail": "rahul@abe.edu",
    "accessCode": "FRIDIJE"
}

try:
  
    response = requests.post(registration_url, json=registration_data)
    
   
    if response.status_code == 200:
        print("Registration successful! Save the following credentials:")
        print(response.json())
    else:
        print(f"Failed to register. Status code: {response.status_code}")
        print(response.text)
except requests.exceptions.RequestException as e:
    print(f"An error occurred: {e}")
