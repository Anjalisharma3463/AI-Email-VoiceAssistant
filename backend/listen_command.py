import speech_recognition as sr

def listen():
    r = sr.Recognizer()

    with sr.Microphone() as source:
        print("🎙️ Adjusting for ambient noise.. Please wait")
        r.adjust_for_ambient_noise(source, duration=1)

        print("🎙️ Listening... (Start speaking now, max 10s)")
        try:
            audio = r.listen(source, timeout=5, phrase_time_limit=10)
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
