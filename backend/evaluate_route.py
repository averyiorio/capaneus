import random
import math

width, height = 11, 17
center_x, center_y = width // 2, height // 2

def radial_bias(x, y):
    distance = math.sqrt((center_x - x) ** 2 + (center_y - y) ** 2)
    bias = distance / max(center_x, center_y)
    return int((1 - bias) * 15) + 1

def evaluate_route(new_route):
    # Dummy evaluation function
    random_route = [[random.randint(4, 15) for _ in range(11)] for _ in range(17)]
    bias_route = [[radial_bias(x, y) for x in range(width)] for y in range(height)]
    summed_route = [[abs(random_route[i][j] - bias_route[i][j]) for j in range(width)] for i in range(height)]
    return summed_route
