# 라이브러리 불러오기
import layoutparser as lp
import cv2
# from paddleocr import PaddleOCR

import matplotlib.pyplot as plt

image = cv2.imread("./book.png")
image = image[..., ::-1]
    # Convert the image from BGR (cv2 default loading style)
    # to RGB
    
model = lp.Detectron2LayoutModel("lp://PubLayNet/mask_rcnn_X_101_32x8d_FPN_3x/config",
                                 extra_config=["MODEL.ROI_HEADS.SCORE_THRESH_TEST", 0.5],
                                 label_map= {0: "Text", 1: "Title", 2: "List", 3:"Table", 4:"Figure"})
    # Load the deep layout model from the layoutparser API
    # For all the supported model, please check the Model
    # Zoo Page: https://layout-parser.readthedocs.io/en/latest/notes/modelzoo.html

layout = model.detect(image)
lp.draw_box(
    image, layout, box_color="red", box_width=2, show_element_type=True
)

# ocr = PaddleOCR(
#     lang = "korean",
#     use_doc_orientation_classify=False,
#     use_doc_unwarping=False,
#     use_textline_orientation=False
# )

# ocr_results = []

# # 1️⃣ 이미지 시각화 준비
# fig, ax = plt.subplots(figsize=(12, 12))
# ax.imshow(image)
# ax.axis("off")

# # 2️⃣ LayoutParser 영역별로 OCR 수행
# for i, region in enumerate(layout):
#     x1, y1, x2, y2 = region.coordinates
#     segment_img = image[int(y1):int(y2), int(x1):int(x2)]
    
#     plt.imshow(segment_img)
#     plt.title(f"Region {i} - {region.type}")
#     plt.axis('off')
#     plt.show()

#     # PaddleOCR 예측
#     result = ocr.predict(segment_img)[0]  # OCRResult 객체
#     ocr_data = result.json
#     ocr_block = ocr_data['res']  # dict 구조

#     rec_texts = ocr_block.get("rec_texts", [])
#     rec_scores = ocr_block.get("rec_scores", [])
#     rec_polys = ocr_block.get("rec_polys", [])
#     print(rec_texts)



# img_path = "./book.png"
# result = ocr(img_path, cls=False)
 
# ocr_result = result[0]
# print(ocr_result)