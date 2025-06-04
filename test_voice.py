
from backend.listen_command import listen
from backend.speak import speak

command = listen()
print("You said:", command)
speak(command)

