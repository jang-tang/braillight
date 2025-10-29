from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello from cloud API!"}

@app.get("/predict")
def predict(input: str):
    # 여기서 모델 호출이나 처리 가능
    return {"input": input, "result": "dummy result"}
