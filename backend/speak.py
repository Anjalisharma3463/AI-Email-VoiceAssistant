# # import pyttsx3
# # import time

# # def speak(text):
# #     print("🗣️ Speaking:", text)  # Print is working, so this line shows
# #     engine = pyttsx3.init()
# #     engine.setProperty('rate', 150)  # Control speed
# #     engine.setProperty('volume', 1.0)  # Max volume
# #     engine.say(text)
# #     engine.runAndWait()
# #     time.sleep(1)  # Give it time to finish


import pyttsx3
import time
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



 