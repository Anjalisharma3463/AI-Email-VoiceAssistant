# auth.py

import os
import pickle
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request


import speech_recognition as sr
import pyttsx3
import time


SCOPES = [
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/userinfo.email",
    "openid",
]


class GmailAuth:
    def is_logged_in(self):
        print("is_logged_in called:")
        isloggedIn = os.path.exists('token.pickle')
        print(f"isLoggedIn: {isloggedIn}")
        return isloggedIn
    
    def logout_user(self):
        if os.path.exists('token.pickle'):
            os.remove('token.pickle')
            print("🚪 Logged out successfully!")
            return "🚪 Logged out successfully!"
        return "⚠️ No user is logged in."

    
    def speak(text):
        print("🗣️ Speaking:", text)
        engine = pyttsx3.init()

        voices = engine.getProperty('voices')

        if len(voices) > 27:
            engine.setProperty('voice', voices[27].id)
        else:
            print("⚠️ Voice ID 27 not available. Using default.")

        engine.setProperty('rate', 150)
        engine.setProperty('volume', 1.0)
        engine.setProperty('voice', 'english+f3')  # 'f1', 'f2', 'f3' are female-ish

        engine.say(text)
        engine.runAndWait()
        time.sleep(1)



    def listen(self):
        r = sr.Recognizer()

        with sr.Microphone() as source:
            print("🎙️ Adjusting for ambient noise.. Please wait")
            r.adjust_for_ambient_noise(source, duration=1)

            print("🎙️ Listening... (Start speaking now, max 20s)")
            try:
                audio = r.listen(source, timeout=5, phrase_time_limit=20)
            except sr.WaitTimeoutError:
                print("⏰ Timeout: You didn't start speaking in time.")
                return "Timeout"

        try:
            command = r.recognize_google(audio)
            print("✅ You said:", command)
            return command
        except sr.UnknownValueError:
            print("❌ Sorry, couldn't understand your speech.")
            return "Sorry, I couldn't understand that."
        except sr.RequestError as e:
            print(f"🌐 API error: {e}")
            return "Speech Recognition service error"



    def login_user(self):
        try:
            creds = None
            if os.path.exists('token.pickle'):
                with open('token.pickle', 'rb') as token:
                    creds = pickle.load(token)

            if not creds or not creds.valid:
                if creds and creds.expired and creds.refresh_token:
                    creds.refresh(Request())
                else:
                    flow = InstalledAppFlow.from_client_secrets_file('temp/credentials.json', SCOPES)
                    creds = flow.run_local_server(port=0)

                with open('temp/token.pickle', 'wb') as token:
                    pickle.dump(creds, token)

            if creds and creds.valid:
                print("✅ Google login successful")
                return "success"
            else:
                print("❌ Credentials invalid")
                return "failure"
        except Exception as e:
            print(f"❌ Login error: {e}")
            return "failure"


    

        