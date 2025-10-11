import torch
from dncnn_model import DnCNN  # <-- 네가 사용 중인 모델 클래스 파일명에 맞게 수정!

# 🔹 모델 가중치 파일 경로 수정해줘!
model_path = "/home/jovyan/Desktop/Braillight/Ai_back/denoise_dir/dncnn_sigma2_gray.pth"

device = "cpu"
ck = torch.load(model_path, map_location=device)

# ✅ 체크포인트 내부 구조 감지
if isinstance(ck, dict):
    if 'state_dict' in ck:
        state_dict = ck['state_dict']
    elif 'model_state_dict' in ck:
        state_dict = ck['model_state_dict']
    else:
        state_dict = ck
else:
    state_dict = ck

print("=== [체크포인트 키 일부] ===")
for k in list(state_dict.keys())[:100]:
    print(k, ":", tuple(state_dict[k].shape))

# ✅ 네 현재 모델 불러오기
try:
    model = DnCNN()
except TypeError as e:
    print("\n⚠️ DnCNN 생성 중 오류:", e)
    print("DnCNN 클래스가 인자(image_channels 등)를 요구하는 경우 직접 수정해 실행하세요.")
    exit()

model_state = model.state_dict()

print("\n=== [현재 모델 키 일부] ===")
for k in list(model_state.keys())[:100]:
    print(k, ":", tuple(model_state[k].shape))

# ✅ 키 차이 비교
ck_keys = set(state_dict.keys())
model_keys = set(model_state.keys())

print("\n=== [체크포인트에만 있는 키 일부] ===")
print(sorted(list(ck_keys - model_keys))[:30])

print("\n=== [모델에만 있는 키 일부] ===")
print(sorted(list(model_keys - ck_keys))[:30])
