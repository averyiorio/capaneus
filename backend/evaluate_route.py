import random
import math
import model
import numpy as np

width, height = 11, 17
center_x, center_y = width // 2, height // 2

def radial_bias(x, y):
    distance = math.sqrt((center_x - x) ** 2 + (center_y - y) ** 2)
    bias = distance / max(center_x, center_y)
    return int((1 - bias) * 15) + 1

def evaluate_route(new_route):
    
    top_hold = (5, 5)
    for i in range(17):
        found = False
        for j in range(11):
            if new_route[i][j] != 0:
                found = True
                top_hold = (i, j)
                break
        if found:
            break
    output = np.zeros((height, width))
    
    for w in range(width):
        for h in range(height):
            if math.sqrt((top_hold[0] - h) ** 2 + (top_hold[1] - w) ** 2) < 5 and new_route[h][w] == 0:
                temp_board = new_route.copy()
                temp_board[h][w] = 1
                output[h][w] = model(temp_board)
    return output

    # Dummy evaluation function
    # random_route = [[random.randint(4, 15) for _ in range(11)] for _ in range(17)]
    # bias_route = [[radial_bias(x, y) for x in range(width)] for y in range(height)]
    # summed_route = [[abs(random_route[i][j] - bias_route[i][j]) for j in range(width)] for i in range(height)]
    # return summed_route


def evaluate_route_grade(route):
    return model(route)