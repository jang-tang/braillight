import torch
import torch.nn as nn

class DnCNN(nn.Module):
    def __init__(self, in_channels=1, out_channels=1, num_of_layers=20, features=64):
        super(DnCNN, self).__init__()
        layers = []

        # 입력 레이어
        self.in_conv = nn.Conv2d(in_channels, features, kernel_size=3, padding=1, bias=True)
        self.relu = nn.ReLU(inplace=True)

        # 중간 레이어
        self.conv_list = nn.ModuleList([
            nn.Conv2d(features, features, kernel_size=3, padding=1, bias=True)
            for _ in range(num_of_layers - 2)
        ])

        # 출력 레이어
        self.out_conv = nn.Conv2d(features, out_channels, kernel_size=3, padding=1, bias=True)

    def forward(self, x):
        out = self.relu(self.in_conv(x))
        for conv in self.conv_list:
            out = self.relu(conv(out))
        out = self.out_conv(out)
        return x - out  # 잔차 학습 (Residual Learning)
