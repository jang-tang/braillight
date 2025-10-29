# 라이브러리 불러오기
import layoutparser as lp
import cv2
from paddleocr import PaddleOCR
from pykospacing import Spacing
spacing = Spacing()
print("라이브러리 불러오기 완료")

image = cv2.imread("/home/jovyan/Desktop/braillight/Ai_back/Layout_analysis/book.png")
image = image[..., ::-1]
print("이미지 받아서 정리 완료")

    # Convert the image from BGR (cv2 default loading style)
    # to RGB
    
model = lp.Detectron2LayoutModel("lp://PubLayNet/mask_rcnn_X_101_32x8d_FPN_3x/config",
                                 extra_config=["MODEL.ROI_HEADS.SCORE_THRESH_TEST", 0.5],
                                 label_map= {0: "Text", 1: "Title", 2: "List", 3:"Table", 4:"Figure"})
    # Load the deep layout model from the layoutparser API
    # For all the supported model, please check the Model
    # Zoo Page: https://layout-parser.readthedocs.io/en/latest/notes/modelzoo.html

print("레이아웃 모델 로드 완료")

layout = model.detect(image)
print(layout, "\n여기까지 레이아웃 부분")
image_with_boxes = lp.draw_box(
    image, layout, box_color="red", box_width=2, show_element_type=True
)

print("레이아웃 인식 완료")


ocr = PaddleOCR(
    lang="korean",
    use_doc_orientation_classify=False,
    use_doc_unwarping=False,
    use_textline_orientation=False
)
print("ocr 모델 로드 완료")

ocr_results = []

# 2️⃣ LayoutParser 영역별로 OCR 수행
for i, region in enumerate(layout):
    x1, y1, x2, y2 = region.coordinates
    segment_img = image[int(y1):int(y2), int(x1):int(x2)]

    # PaddleOCR 예측
    result = ocr.predict(segment_img)[0]  # OCRResult 객체
    ocr_data = result.json
    ocr_block = ocr_data['res']  # dict 구조

    rec_texts = ocr_block.get("rec_texts", [])
    rec_scores = ocr_block.get("rec_scores", [])
    rec_polys = ocr_block.get("rec_polys", [])
    total_text = "".join(rec_texts)
    print(spacing(total_text))

