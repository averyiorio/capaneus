import numpy as np
import os 
import torch
import torch
import pandas as pd
import torch.nn as nn
import torch.nn.functional as F
from torch.utils.data import DataLoader
from torchvision import datasets
from torch.utils.data import Dataset
import json

xdim = {'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9, 'J': 10, 'K': 11}
ydim = [i for i in range(19, 0, -1)]
# print(xdim)
# print(ydim)
def get_hold_coords(hold, xdim = xdim, ydim = ydim):
    col = xdim[hold[0]] -1
    row = ydim[int(hold[1:])] - 1
    return (row, col)

moonboard_2016_filename = "../data/mb_problem_holds.csv"
moonboard_2016_size = (18,11)
df = pd.read_csv(moonboard_2016_filename)

french_grade_order = ['4', '5', '5+', '6A', '6A+', '6B', '6B+', '6C', '6C+', '7A', '7A+',
                       '7B', '7B+', '7C', '7C+', '8A', '8A+', '8B', '8B+']
grade_bounds = ('6B+', '8A')
scale_min = french_grade_order.index(grade_bounds[0])
scale_max = french_grade_order.index(grade_bounds[1])
scale_bounds = (scale_min, scale_max)
scale_size = scale_max - scale_min

class ClimbDataset(Dataset):
    def __init__(self, climbs_filename, board_size, scale_bounds):
        self.climb_df = pd.read_csv(climbs_filename)
        self.board_size = board_size
        self.scale_min = scale_bounds[0]
        self.scale_max = scale_bounds[1]
        self.scale_size = self.scale_max - self.scale_min + 1
        
    def __len__(self):
        return len(self.climb_df)
    
    def __getitem__(self, idx):
        climb = self.climb_df.iloc[idx]
        grade = climb['Grade']
        moves = climb['Moves']
        moves = moves.replace("'", '"')
        moves = moves.replace("True", 'true')
        moves = moves.replace("False", 'false')
        moves = json.loads(moves)
        holds = np.zeros(self.board_size)
        for hold in moves:
            x, y = get_hold_coords(hold['Description'].upper())
            holds[x, y] = 1
        curr_grade_ind = french_grade_order.index(grade)
        if self.scale_min > curr_grade_ind :
            grade_num = 0
        elif self.scale_max < curr_grade_ind :
            grade_num = self.scale_max - self.scale_min
        else:
            grade_num = curr_grade_ind - self.scale_min

        # one_hot = np.zeros(self.scale_size)
        # one_hot[grade_num] = 1
        return holds.astype(np.float32), float(grade_num)


device = "cuda" if torch.cuda.is_available() else "cpu"

input_size = moonboard_2016_size[0] * moonboard_2016_size[1]
output_size = scale_size
class NeuralNetwork_Orig(nn.Module):
    def __init__(self):
        super(NeuralNetwork_Orig, self).__init__()
        self.flatten = nn.Flatten()
        self.linear_relu_stack = nn.Sequential(
            nn.Linear(input_size, 2048),
            nn.ReLU(),
            nn.Linear(2048, 2048),
            nn.ReLU(),
            nn.Linear(2048, 2048),
            nn.ReLU(),
            nn.Linear(2048, 2048),
            nn.ReLU(),
            nn.Linear(2048, 2048),
            nn.ReLU(),
            nn.Linear(2048, 1024),
            nn.ReLU(),
            nn.Linear(1024, 1024),
            nn.ReLU(),
            nn.Linear(1024, 1024),
            nn.ReLU(),
            nn.Linear(1024, 512),
            nn.ReLU(),
            nn.Linear(512, 512),
            nn.ReLU(),
            nn.Linear(512, 1),
        )

    def forward(self, x):
        x = self.flatten(x)
        logits = self.linear_relu_stack(x)
        return logits


model = NeuralNetwork_Orig().to(device)
checkpoint = torch.load('backend/route_grade_model')
model.load_state_dict(checkpoint['state_dict'])
model.eval()

