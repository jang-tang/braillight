import cv2
import torch
import numpy as np
from dncnn_model import DnCNN

#테스트
# 노이즈 제거할 이미지 경로
image_path = r"/home/jovyan/Desktop/braillight/Ai_back/ Preprocess/noise_image.png"

# 모델 경로
model_path = r"/home/jovyan/Desktop/braillight/Ai_back/ Preprocess/dncnn_sigma2_gray.pth"

# 결과 저장 경로
output_path = r"/home/jovyan/Desktop/braillight/Ai_back/ Preprocess/denoised_output.png"

# 장치 설정
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"✅ 현재 장치: {device}")

# 모델 불러오기
model = DnCNN(in_channels=1, out_channels=1, num_of_layers=20, features=64)
model = model.to(device)  # GPU로 올리기
model.eval()  # 평가 모드로 변경

# state_dict 로드
state_dict = torch.load(model_path, map_location=device,weights_only=True)
model.load_state_dict(state_dict)

# 이미지 읽기
img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
if img is None:
    raise FileNotFoundError(f"이미지를 찾을 수 없습니다: {image_path}")

# 정규화 및 텐서 변환
img = img.astype(np.float32) / 255.0
img_tensor = torch.from_numpy(img).unsqueeze(0).unsqueeze(0).to(device)  # shape: [1,1,H,W]

# 노이즈 제거
with torch.no_grad():
    denoised = model(img_tensor).cpu().numpy()[0, 0]

# 픽셀 값 범위 0~255로 변환
denoised = np.clip(denoised * 255, 0, 255).astype(np.uint8)

# 이진화
binary = cv2.adaptiveThreshold(
    denoised,
    255,
    cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
    cv2.THRESH_BINARY,
    35,
    5
)

# 대비 강화
contrast = cv2.convertScaleAbs(binary, alpha=1.5, beta=0)

# 결과 저장
cv2.imwrite(output_path, contrast)
print(f"🎉 처리 완료! 결과 저장됨 → {output_path}")
