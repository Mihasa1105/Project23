# import requests
# from PIL import Image
# from transformers import BlipProcessor, BlipForConditionalGeneration, BlipForQuestionAnswering
# from deep_translator import GoogleTranslator
# import torch
# import base64
# from io import BytesIO
#
# processor = BlipProcessor.from_pretrained("Salesforce/blip-vqa-capfilt-large")
# if torch.cuda.is_available():
#      model = BlipForQuestionAnswering.from_pretrained("Salesforce/blip-vqa-capfilt-large").to("cuda")
# else:
#      model = BlipForQuestionAnswering.from_pretrained("Salesforce/blip-vqa-capfilt-large ")
#
#
# def question(img_url, question):
#     question = GoogleTranslator(source='ru', target='en').translate(question)
#     if img_url.startswith("http:") or img_url.startswith("https:"):
#         raw_image = Image.open(requests.get(img_url, stream=True).raw).convert('RGB')
#     elif img_url.startswith("data:"):
#         data = img_url.split(",")[1]
#         image_data = base64.b64decode(data)
#         raw_image = Image.open(BytesIO(image_data))
#     else:
#         return "Неподдерживаемый тип файла"
#     if torch.cuda.is_available():
#         inputs = processor(raw_image, question, return_tensors="pt").to("cuda")
#     else:
#         inputs = processor(raw_image, question, return_tensors="pt")
#
#     out = model.generate(**inputs)
#     outputTXT = processor.decode(out[0], skip_special_tokens=True)
#     translated = GoogleTranslator(source='auto', target='ru').translate(outputTXT)
#     print(outputTXT)
#     print(translated)
#     return translated