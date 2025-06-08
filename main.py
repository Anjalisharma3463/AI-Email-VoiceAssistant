import webview
from backend.functions import GmailAuth  
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError 
import speech_recognition as sr

# ✅ Step 1: define the main function to open the desktop app
def main():
    api = GmailAuth()
    window = webview.create_window(
        "AI Email Voice Assistant", 
        "templates/index.html", 
        js_api=api,
        width=480,
        height=620,
        resizable=True
    )
    webview.start()
    GmailAuth.start_background_listener(api)
 


if __name__ == "__main__":
    main()
