 
import webview
from backend.functions import GmailAuth  
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError


if __name__ == '__main__':
    api = GmailAuth()
    window = webview.create_window("AI Email Voice Assistant", "templates/index.html", 
                                   js_api=api,
                                   width=480,          # set your desired width
                                   height=620,          # set your desired height
                                   resizable=True
                                   )
    
    
    webview.start()


 