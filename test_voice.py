
# from backend.listen_command import listen
# from backend.speak import speak

# command = listen()
# print("You said:", command)
# speak(command)


# test_login.py
 
from backend.functions import login_user
if __name__ == "__main__":
    creds = login_user()
    print("Access Token:", creds.token[:30], "...")
