import requests
from bs4 import BeautifulSoup

#def get_problem_names()


if __name__ == "__main__":
    url = "https://www.moonboard.com/Dashboard/GetBenchmarks"
    headers = {
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
    'Connection': 'keep-alive',
    'Content-Length': '86',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Host': 'www.moonboard.com',
    'Origin': 'https://www.moonboard.com',
    'Referer': 'https://www.moonboard.com/Dashboard/Index',
    'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest'
    }

    payload = {
    'sort': '',
    'page': '2',
    'pageSize': '40',
    'group': '',
    'aggregate': 'Score-sum~MaxScore-sum',
    'filter': "setupId~eq~'1'"
    }

    response = requests.post(url, data=payload, headers=headers)

    # Check the response status code
    if response.status_code == 200:
        # Print the response content
        soup = BeautifulSoup(response.content, 'html.parser')
        # rows = soup.find_all('tr')
        # for row in rows:
        #     cells = row.find_all('td')
        #     print(row)
        #     for cell in cells:
        #         print(cell)

        print(soup.prettify())

    else:
        print('Request failed with status code:', response.status_code)
