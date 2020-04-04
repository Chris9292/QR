import requests

# cloud functions
# search for ticket with given ID
URL = "https://us-central1-qr-ttstartups.cloudfunctions.net/testFunc/api/tickets/"

def fetch_ticket(id):
    r = requests.get(URL+f'{id}')
    return r.status_code