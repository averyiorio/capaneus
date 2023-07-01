import requests
import lxml.html
from bs4 import BeautifulSoup
import yaml
import re
import json
import csv
import os

 #getting requests config info
with open("config/config.yaml", "r") as f:
    config = yaml.load(f, Loader=yaml.FullLoader)  

def login():
    """
    Using account information in the config file to login to moonboard
    """

    s = requests.Session()
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
    return s


#returns moonboard problem names
def get_problem_names(session, page_size="10000"):
    # Setup id can be 15, 17, 19
    # With filter : setupId~eq~'15'~and~Configuration~eq~1
    # Setup id can be 1
    # With filter : setupId~eq~'1'

    payload = {
    'sort': '',
    'page': '1',
    'pageSize': page_size,
    'group': '',
    'aggregate': 'Score-sum~MaxScore-sum',
    'filter': "setupId~eq~'1'"
    }
    board_versions = ["setupId~eq~'17'~and~Configuration~eq~1",
                      "setupId~eq~'15'~and~Configuration~eq~1",
                      "setupId~eq~'19'~and~Configuration~eq~1",
                      "setupId~eq~'17'~and~Configuration~eq~2",
                      "setupId~eq~'15'~and~Configuration~eq~2",
                      "setupId~eq~'19'~and~Configuration~eq~2",
                      "setupId~eq~'1'"]

    # headers = config['mb_headers']
    # headers['Cookie'] = auth_token + headers['Cookie']
    problem_names = {}
    for version in board_versions:
        payload['filter'] = version
        print(payload)
        response = session.post(config['mb_bench_url'], data=payload, headers=config['mb_headers'])
        #check response status code
        if response.status_code == 200 and response.content:
            soup = BeautifulSoup(response.content, 'html.parser')
            problem_names.update(json.loads(str(soup)))
            print(len(problem_names))
        else: 
            print(f"Unable to find board version {version}")
    
    
    return problem_names


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

def get_holds(session):
    problem_names_fn = os.path.join(os.path.dirname(__file__), "../data/mb_problem_names.csv")
    with open(problem_names_fn, 'r') as file:
        reader = csv.reader(file)
        header = next(reader)
        problem_id = header.index('ProblemId')
        url_index = header.index('Url')
        
        # Read the problem urls
        urls = []
        for row in reader:
            urls.append(row[problem_id] + '/' + row[url_index])
    
    problems = []
    for problem_url in urls:
        r = session.get("https://www.moonboard.com/Problems/View/" + problem_url, headers=config['mb_problem_headers'])
        regex_pattern = re.compile(r'(?<=var problem = JSON\.parse\(\').*?(?=\'\);)')
        problem = re.search(regex_pattern, r.text)
        problems.append(json.loads(problem.group(0)))



    problem_holds_fn = os.path.join(os.path.dirname(__file__), "../data/mb_problem_holds.csv")
    keys = problems[0].keys()  # Get the keys from the first item in the "Data" list
    with open(problem_holds_fn, mode='w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=keys)
        writer.writeheader()  # Write the header using the keys
        writer.writerows(problems)  # Write the data rows
    
    
    
if __name__ == "__main__":
    #logs in to website with account info provided in the config file\
    print("Running Scraper")
    session = login()
    problem_names = get_problem_names(session)
    print(problem_names)
    print(len(problem_names))
    save_problem_names(problem_names)

    get_holds(session)

    # # Get the variable value
    # print(script_tag)
    # print(script_tag.string)
    # print(script_tag.text)



