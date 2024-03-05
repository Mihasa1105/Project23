import requests
from PIL import Image
import base64
from io import BytesIO
def pic1x1(img_url):
    if img_url.startswith("http:") or img_url.startswith("https:"):
        raw_image = Image.open(requests.get(img_url, stream=True).raw).convert('RGB')
    elif img_url.startswith("data:"):
        data = img_url.split(",")[1]
        image_data = base64.b64decode(data)
        raw_image = Image.open(BytesIO(image_data)).convert('RGB')
    width, height = raw_image.size
    if(width == height):
        image = raw_image
    elif(width > height):
        to_cut = width/2 - height/2
        image = raw_image.crop([0+to_cut,0,width-to_cut,height])
    else:
        to_cut = height / 2 - width / 2
        image = raw_image.crop([0, 0 + to_cut, width, height - to_cut])
    data = BytesIO()
    image.save(data, "JPEG")
    image_url = "data:image/jpeg;base64," + base64.b64encode(data.getvalue()).decode("utf-8")
    return image_url
