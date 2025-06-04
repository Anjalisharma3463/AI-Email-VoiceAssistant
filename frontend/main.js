 // Global state
        let isRecording = false;
        let isLoggedIn = false;

        // DOM Elements
        const loginModal = document.getElementById('loginModal');
        const loginForm = document.getElementById('loginForm');
        const textInput = document.getElementById('textInput');
        const micButton = document.getElementById('micButton');
        const sendButton = document.getElementById('sendButton');
        const spokenText = document.getElementById('spokenText');
        const responseText = document.getElementById('responseText');
        const statusIndicator = document.getElementById('statusIndicator');

        // Show login modal on page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                loginModal.classList.add('active');
            }, 500);
        });

        // Login functionality
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            loginUser(email, password);
        });

        function loginUser(email, password) {
            // Simulate login process
            updateResponse("Signing you in...");
            
            setTimeout(() => {
                if (email && password) {
                    isLoggedIn = true;
                    loginModal.classList.remove('active');
                    updateResponse("Welcome! You're now signed in. How can I help you with your emails today?");
                    updateStatus('ready');
                } else {
                    updateResponse("Please enter valid credentials.");
                }
            }, 1000);
        }

        // Text input functionality
        textInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendInput();
            }
        });

        textInput.addEventListener('input', (e) => {
            if (e.target.value.trim()) {
                updateSpokenText(e.target.value);
            }
        });

        // Send button functionality
        sendButton.addEventListener('click', sendInput);

        function sendInput() {
            const input = textInput.value.trim();
            if (!input) {
                updateResponse("Please enter a message or use voice input.");
                return;
            }

            updateSpokenText(input);
            updateStatus('processing');
            updateResponse("Processing your request...");

            // Simulate AI processing
            setTimeout(() => {
                processEmailCommand(input);
                textInput.value = '';
                updateStatus('ready');
            }, 1500);
        }

        // Voice input functionality
        micButton.addEventListener('click', startVoiceInput);

        function startVoiceInput() {
            if (!isRecording) {
                isRecording = true;
                micButton.classList.add('recording');
                updateStatus('listening');
                updateResponse("Listening... Speak now.");

                // Simulate voice recording
                setTimeout(() => {
                    stopVoiceInput();
                }, 3000);
            } else {
                stopVoiceInput();
            }
        }

        function stopVoiceInput() {
            isRecording = false;
            micButton.classList.remove('recording');
            updateStatus('processing');
            
            // Simulate voice-to-text conversion
            const simulatedVoiceText = "Send an email to John about the meeting tomorrow at 2 PM";
            updateSpokenText(simulatedVoiceText);
            updateResponse("Converting speech to text...");
            
            setTimeout(() => {
                processEmailCommand(simulatedVoiceText);
                updateStatus('ready');
            }, 2000);
        }

        // Helper functions
        function updateSpokenText(text) {
            spokenText.textContent = text;
            spokenText.classList.add('has-content');
        }

        function updateResponse(text) {
            responseText.textContent = text;
            responseText.classList.add('has-content');
        }

        function updateStatus(status) {
            statusIndicator.className = 'status-indicator';
            statusIndicator.classList.add(`status-${status}`);
        }

        function processEmailCommand(command) {
            // Simulate email processing based on command
            const lowerCommand = command.toLowerCase();
            
            if (lowerCommand.includes('send') && lowerCommand.includes('email')) {
                updateResponse(`Email draft created: "${command}"\n\nReady to send? Say "yes" to confirm or make changes.`);
            } else if (lowerCommand.includes('check') || lowerCommand.includes('read')) {
                updateResponse("You have 3 new emails:\n1. Project Update from Sarah\n2. Meeting Reminder\n3. Newsletter from TechNews");
            } else if (lowerCommand.includes('schedule')) {
                updateResponse("I'll help you schedule that. Creating calendar invite and email notification...");
            } else {
                updateResponse(`I understand you want to: "${command}"\n\nLet me help you compose the perfect email for this request.`);
            }
        }

        // Initialize status
        updateStatus('ready');