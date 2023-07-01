import requests
import lxml.html
from bs4 import BeautifulSoup
import yaml
import re
import json
import csv
import os


def login():
    """
    Using account information in the config file to login to moonboard
    """
    #getting requests config data
    with open("config/config.yaml", "r") as f:
        config = yaml.load(f, Loader=yaml.FullLoader) 
    
    s = requests.Session()
    print(s.cookies.get_dict())
    login = s.get(config['mb_login_url'])
    login_html = lxml.html.fromstring(login.text)
    hidden_inputs = login_html.xpath(r'//form//input[@type="hidden"]')
    form = {x.attrib["name"]: x.attrib["value"] for x in hidden_inputs}

    dashboard = s.get(config['mb_dashboard_url'])
    dash_html = lxml.html.fromstring(dashboard.text)
    hidden_inputs = dash_html.xpath(r'//form//input[@type="hidden"]')
    form1 = {x.attrib["name"]: x.attrib["value"] for x in hidden_inputs}

    form.update(form1)
    ### username and password.
    form['email'] = config['mb_username']
    form['password'] = config['mb_password']
    r = s.post(config['mb_login_url'], data=form)
    return form['__RequestVerificationToken']


#returns moonboard problem names
def get_response(auth_token, page_size="10000"):
    payload = {
    'sort': '',
    'page': '1',
    'pageSize': page_size,
    'group': '',
    'aggregate': 'Score-sum~MaxScore-sum',
    'filter': ""
    }

    #getting requests config info
    with open("config/config.yaml", "r") as f:
        config = yaml.load(f, Loader=yaml.FullLoader)  

    headers = config['mb_headers']
    headers['Cookie'] = auth_token + headers['Cookie']
    response = requests.post(config['mb_bench_url'], data=payload, headers=config['mb_headers'])

    #check response status code
    if response.status_code != 200:
        print('Request failed with status code:', response.status_code)
    return response


def save_problem_names(data, filename="../data/mb_problem_names.csv"):
    """
    Writes a JSON object to a new csv file

    Args:
        data (JSON): JSON object with problem names
    Kwargs:
        filename (string): filename to write data to (overwrite existing data)
    """
    fn = os.path.join(os.path.dirname(__file__), filename)
    keys = data["Data"][0].keys()  # Get the keys from the first item in the "Data" list
    with open(fn, mode='w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=keys)
        writer.writeheader()  # Write the header using the keys
        writer.writerows(data["Data"])  # Write the data rows
    
if __name__ == "__main__":
    #logs in to website with account info provided in the config file
    token = login()
    r = get_response(token)
    soup = BeautifulSoup(r.content, 'html.parser')
    problem_dict = json.loads(str(soup))
    save_problem_names(problem_dict)
