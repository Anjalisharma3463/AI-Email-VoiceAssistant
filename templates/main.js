 
   class EmailAssistant {
    constructor() {
        this.isRecording = false;
        this.isListening = false;
        this.initializeElements();
        this.attachEventListeners(); // Attach mic button click
    }

    initializeElements() {
        this.commandInput = document.getElementById("commandInput");
        this.sendBtn = document.getElementById("sendBtn");
        this.micBtn = document.getElementById("micBtn");
        this.micIcon = document.getElementById("micIcon");
        this.statusText = document.getElementById("statusText");
        this.messagesContainer = document.getElementById("messagesContainer");
    }

    attachEventListeners() {
        this.micBtn.addEventListener('click', () => {
            if (!this.isListening) {
                this.startListening();
            } else {
                this.stopListening();
            }
        });
    }

    startListening() {
        this.isRecording = true;
        this.isListening = true;
        this.micBtn.classList.add('recording');
        this.micIcon.textContent = '🔴';
        this.statusText.textContent = 'Recording...';

        window.pywebview.api.listen().then(transcript => {
            this.commandInput.value = transcript; 
        });
    }

    stopListening() {
        this.isRecording = false;
        this.isListening = false;
        this.micBtn.classList.remove('recording');
        this.micIcon.textContent = '🎤';
        this.statusText.textContent = 'Ready to assist';
        this.micBtn.style.opacity = '1';
         
    }


    sendCommand() {
    
      this.sendBtn.addEventListener('click', () => {
                     const command = this.commandInput.value.trim();
                     if (command) {
                         this.addMessage(command, 'user');
                         this.processCommand(command);
                         this.commandInput.value = '';
                     }
                 });

                 this.commandInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                         this.sendBtn.click();
                     }
               });
    }

        login() {
          const btn = document.querySelector(".google-signin-btn");
          const originalText = btn.innerHTML;

          btn.innerHTML = `
    <div style="display: flex; align-items: center; gap: 8px;">
      <div style="width: 16px; height: 16px; border: 2px solid #ffffff40; border-top: 2px solid #ffffff; border-radius: 50%; animation: spin 1s linear infinite;"></div>
      Signing in...
    </div>`;
          btn.disabled = true;

          window.pywebview.api.login_user().then((response) => {
            if (response === "success") {
              // Hide modal and show dashboard
              document.getElementById("loginModal").style.display = "none";
              document.getElementById("dashboard").style.display = "block";

              alert("Login successfully !");
            } else {
              alert("Login failed. Please try again.");
              btn.innerHTML = originalText;
              btn.disabled = false;
            }
          });
        }



     async showloginModalOnLoad() { 
  try {
    console.log("sjhowloginmodalonload is run");

    const isLoggedIn = await window.pywebview.api.is_logged_in();
    console.log("isLoggedIn: ", isLoggedIn);

    if (isLoggedIn) {
      document.getElementById('loginModal').style.display = 'none';
      document.getElementById('dashboard').style.display = 'block';
    } else {
        document.getElementById('loginModal').style.display = 'block';
      const btn = document.querySelector('.google-signin-btn');
      if (btn) {
            btn.innerHTML = `
                <div class="google-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                </div>
                Continue with Google
            `;
            btn.disabled = false;
            btn.style.display = 'flex'; // just in case it was hidden
            document.querySelector('.modal-overlay').style.display = 'flex';

}
    }
  } catch (err) {
    console.error("Error in showloginModalOnLoad:", err);
  }
}


      


  logout() {
    window.pywebview.api.logout_user().then(response => {
        alert(response); 
        const btn = document.querySelector('.google-signin-btn');
         btn.innerHTML = `
                <div class="google-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                </div>
                Continue with Google
            `;
            btn.disabled = false; 
            document.querySelector('.modal-overlay').style.display = 'flex';

                  document.getElementById('loginModal').style.display = 'block';
        document.getElementById('dashboard').style.display = 'none';
    });
}   

  closeModal() {
    document.getElementById('loginModal').style.display = 'none';
}


        addMessage(content, type) {
          const messageDiv = document.createElement("div");
          messageDiv.className = `message ${type}-message`;

          const now = new Date();
          const timeString = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          messageDiv.innerHTML = `
                    <div class="message-header">
                        <div class="message-avatar ${type}-avatar">${
            type === "user" ? "U" : "AI"
          }</div>
                        <span class="message-time">${timeString}</span>
                    </div>
                    <div class="message-content">${content}</div>
                `;

          this.messagesContainer.appendChild(messageDiv);
          this.messagesContainer.scrollTop =
            this.messagesContainer.scrollHeight;
        }

        showLoading() {
          const loadingDiv = document.createElement("div");
          loadingDiv.className = "message assistant-message";
          loadingDiv.id = "loadingMessage";

          loadingDiv.innerHTML = `
                    <div class="message-header">
                        <div class="message-avatar assistant-avatar">AI</div>
                        <span class="message-time">Just now</span>
                    </div>
                    <div class="message-content">
                        <div class="loading">
                            <div class="loading-dot"></div>
                            <div class="loading-dot"></div>
                            <div class="loading-dot"></div>
                        </div>
                    </div>
                `;

          this.messagesContainer.appendChild(loadingDiv);
          this.messagesContainer.scrollTop =
            this.messagesContainer.scrollHeight;
        }

        removeLoading() {
          const loadingMessage = document.getElementById("loadingMessage");
          if (loadingMessage) {
            loadingMessage.remove();
          }
        }

        async processCommand(command) {
          this.statusText.textContent = "Processing...";
          this.showLoading();

          // Simulate API call delay
          await new Promise((resolve) => setTimeout(resolve, 1500));

          this.removeLoading();

          // Mock responses based on command content
          let response = this.generateMockResponse(command);

          this.addMessage(response, "assistant");
          this.statusText.textContent = "Ready to assist";
        }

        generateMockResponse(command) {
          const lowerCommand = command.toLowerCase();

          if (lowerCommand.includes("email") || lowerCommand.includes("mail")) {
            if (
              lowerCommand.includes("check") ||
              lowerCommand.includes("inbox")
            ) {
              return "I found 3 new emails in your inbox: 1 from your manager about the quarterly review, 1 newsletter from TechCrunch, and 1 promotional email from Amazon. Would you like me to read any of these?";
            } else if (
              lowerCommand.includes("compose") ||
              lowerCommand.includes("write")
            ) {
              return "I'll help you compose an email. What's the recipient's email address and what would you like the subject to be?";
            } else if (lowerCommand.includes("send")) {
              return "I can help you send an email. Please provide the recipient, subject, and message content.";
            }
          }

          if (lowerCommand.includes("schedule")) {
            return "I can help you schedule emails or meetings. What would you like to schedule and for when?";
          }

          if (lowerCommand.includes("reminder")) {
            return "I'll set up a reminder for you. When would you like to be reminded and about what?";
          }

          return (
            "I understand you said: '" +
            command +
            "'. I can help you with email management, composing messages, checking your inbox, scheduling emails, and setting reminders. What specific task would you like me to assist with?"
          );
        }
      }
let assistantInstance;

window.addEventListener('pywebviewready', function () {
  assistantInstance = new EmailAssistant();
 assistantInstance.showloginModalOnLoad();
});
 