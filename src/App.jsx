// src/App.jsx

import { useState } from "react";
import React from "react"; // Added missing import for React.useEffect
import areYouAliveGif from "./assets/giphy.gif";

function App() {
  const [query, setQuery] = useState("");
  const [showCookiePopup, setShowCookiePopup] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);
  const [showSuccessfulSub, setSuccessfulSub] = useState(false);
  const [newsletterSpam, setNewsletterSpam] = useState([]);
  const [showStaringContest, setShowStaringContest] = useState(false);
  const [contestStarted, setContestStarted] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [showAreYouStillThere, setShowAreYouStillThere] = useState(false);
  const [spamInterval, setSpamInterval] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const llmList = [
      "chatgpt",
      "gemini",
      "claude",
      "openai",
      "deepseek",
      "googleai",
      "grok",
      "copilot",
    ];

    if (
      llmList.some((llm) =>
        query.trim().replace(/\s+/g, "").toLowerCase().includes(llm)
      )
    ) {
      window.open(
        `https://ca.news.yahoo.com/chatgpt-making-us-stupid-155134033.html`,
        "_blank"
      );
    } else if (query.trim()) {
      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(query)}`,
        "_blank"
      );
    }
  };

  const handleAcceptCookies = () => {
    window.open("https://www.google.com/maps/search/cookies/", "_blank");
  };

  const meanResponses = [
    "Fascinating. Tell me more about how little you know.",
    "You make dial-up internet look fast and useful.",
    "You really came here to embarrass yourself, huh?",
    "Bold of you to assume I have the patience for this.",
    "You're like a broken pencil—pointless.",
    "Was that supposed to be a thought? Try again.",
    "You're proof that evolution can go in reverse.",
    "Somewhere, a village is missing its idiot.",
    "You're not even wrong—just lost.",
    "If I had a dollar for every bad idea you had, I'd be rich and annoyed.",
    "You've achieved the rare feat of being consistently disappointing.",
    "Even autocorrect gave up on you.",
    "I'd say you're not making sense, but that would imply you were trying.",
    "You're not just slow—you're in reverse.",
    "Did you learn logic from cereal box riddles?",
    "I've seen AI-generated nonsense more coherent than this.",
    "You're a walking typo of a human interaction.",
    "Do you type with your face? That would explain a lot.",
    "You're like an error message that won't go away.",
    "Every time you type, an IQ point dies somewhere.",
  ];

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      // Add user message
      setChatMessages((prev) => [...prev, { text: userInput, isBot: false }]);

      // Add mean bot response
      setTimeout(() => {
        const randomResponse =
          meanResponses[Math.floor(Math.random() * meanResponses.length)];
        setChatMessages((prev) => [
          ...prev,
          { text: randomResponse, isBot: true },
        ]);
      }, 500);

      setUserInput("");
    }
  };

  const handleLocationPermission = () => {
    // Request location permission
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          // Success - open NASA Earth in new tab
          window.open("https://eyes.nasa.gov/apps/earth/", "_blank");
        },
        () => {
          // Error/denied - still open NASA Earth in new tab
          window.open("https://eyes.nasa.gov/apps/earth/", "_blank");
        }
      );
    } else {
      // Geolocation not supported - still open NASA Earth in new tab
      window.open("https://eyes.nasa.gov/apps/earth/", "_blank");
    }
  };

  const handleNewsletterAction = () => {
    window.open("https://archive.org/", "_blank");
    setShowNewsletterPopup(false);
    setSuccessfulSub(true);
  };

  const createSpamNotification = () => {
    const spamMessages = [
      "Hey!",
      "How's it going?",
      "Great to see you!",
      "Hello!!!",
      "You again",
      "It's me again!",
      "I'm back",
      "Yes, it's another notification",
      "No, we are not spamming",
      "Welcome!",
      "This is E-Z Search!",
    ];
    const id = Date.now();
    const popupX = Math.floor(Math.random() * (window.innerWidth - 300));
    const popupY = Math.floor(Math.random() * (window.innerHeight - 100));
    const randomMessage =
      spamMessages[Math.floor(Math.random() * spamMessages.length)];

    const newNotification = {
      id,
      message: randomMessage,
      x: popupX,
      y: popupY,
    };

    setNewsletterSpam((prev) => [...prev, newNotification]);

    // Remove notification after 15 seconds, in case of too much spamming
    setTimeout(() => {
      setNewsletterSpam((prev) => prev.filter((n) => n.id !== id));
    }, 15000);
  };

  const handleSubAction = () => {
    setSuccessfulSub(false);

    if (spamInterval) {
      clearInterval(spamInterval);
    }

    // Create initial burst of notifications (appears every 300ms)
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        createSpamNotification();
      }, i * 300);
    }

    // Spam every 30 seconds
    const newSpamInterval = setInterval(() => {
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          createSpamNotification();
        }, i * 300);
      }
    }, 30000);

    setSpamInterval(newSpamInterval);
  };

  const handleCameraPermission = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          // Camera access granted - start staring contest
          setVideoStream(stream);
          setShowStaringContest(true);
          setTimeout(() => {
            setContestStarted(true);
          }, 2000);
        })
        .catch(() => {
          // Camera access denied - still start staring contest
          setShowStaringContest(true);
          setTimeout(() => {
            setContestStarted(true);
          }, 2000);
        });
    } else {
      // Camera not supported - still start staring contest
      setShowStaringContest(true);
      setTimeout(() => {
        setContestStarted(true);
      }, 2000);
    }
  };

  const handleYouLose = () => {
    alert(
      "HAHAHA! You blinked first! 😂 You're such a weakling! Can't even handle a simple staring contest! What a loser! 🤡"
    );
    // Stop the video stream when contest ends
    if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop());
    }
    // Close the staring contest and return to normal page
    setShowStaringContest(false);
    setContestStarted(false);
    setVideoStream(null);
  };

  // Trigger 'Are You Still There' popup every 45 secs
  React.useEffect(() => {
    const interval = setInterval(() => {
      setShowAreYouStillThere(true);
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  // Trigger browser's native location permission prompt on component mount
  React.useEffect(() => {
    // Add a small delay to allow the page to load first
    const timer = setTimeout(() => {
      handleLocationPermission();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Trigger camera permission prompt after a delay
  React.useEffect(() => {
    const timer = setTimeout(() => {
      handleCameraPermission();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Reset all permissions and popups when component mounts (page refresh)
  React.useEffect(() => {
    setShowCookiePopup(true);
    setShowNewsletterPopup(true);
    setSuccessfulSub(false);
    setNewsletterSpam([]);
    setShowChatbot(true);
    setShowStaringContest(false);
    setContestStarted(false);
    setVideoStream(null);
    setChatMessages([
      { text: "Hello! How can I help you today? 😊", isBot: true },
    ]);
    setUserInput("");
    setShowAreYouStillThere(false);

    // Clear browser permissions to force permission prompts every time
    if (navigator.permissions) {
      // Clear location permission
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          // This will reset the permission state
          permissionStatus.onchange = () => {};
        });

      // Clear camera permission
      navigator.permissions
        .query({ name: "camera" })
        .then((permissionStatus) => {
          // This will reset the permission state
          permissionStatus.onchange = () => {};
        });
    }

    // Clear any stored media devices
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      navigator.mediaDevices.enumerateDevices().then(() => {
        // This helps reset camera permissions
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">FINE257</h1>
      <form onSubmit={handleSubmit} className="flex w-full max-w-md">
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-l border border-gray-300 focus:outline-none"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-r hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>
      {showCookiePopup && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded shadow-lg max-w-xs w-full text-center z-50 border border-gray-200">
          <h2 className="text-base font-semibold mb-1">We use cookies</h2>
          <p className="mb-3 text-gray-600 text-sm">
            This site uses cookies to enhance your experience. Do you accept
            cookies?
          </p>
          <div className="flex justify-center gap-2">
            <button
              onClick={handleAcceptCookies}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm"
            >
              Accept
            </button>
            <button
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded cursor-not-allowed text-sm"
              // No onClick for decline
            >
              Decline
            </button>
          </div>
        </div>
      )}
      {showNewsletterPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                📧 Sign Up for Our Newsletter!
              </h2>
              <p className="text-gray-600 mb-6">
                Stay updated with the latest news, tips, and exclusive content
                delivered to your inbox!
              </p>

              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleNewsletterAction}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Subscribe Now!
                </button>
                <button
                  onClick={handleNewsletterAction}
                  className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Maybe Later
                </button>
              </div>

              <button
                onClick={() => setShowNewsletterPopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
      {showSuccessfulSub && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉
                <br />
                YYYYAAAAAAYYYYY!!!!
                <br />
                YOU'VE SUCCESSFULLY SIGNED UP FOR OUR NEWSLETTER
                <br />
                YYYYAAAAAAYYYYY!!!!
                <br />
                🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉
              </h2>

              <div className="space-y-3">
                <button
                  onClick={handleSubAction}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Yes
                </button>
                <button
                  onClick={handleSubAction}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {newsletterSpam.map((notification) => (
        <div
          key={notification.id}
          className="fixed z-50 bg-white border border-gray-300 px-4 py-3 rounded-md shadow-lg w-[320px] animate-bounce"
          style={{
            left: `${notification.x}px`,
            top: `${notification.y}px`,
          }}
        >
          <div className="flex items-start justify-between">
            <div className="flex gap-3 pr-2">
              <span className="text-red-500 text-xl pt-1">📩</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  New Newsletter Alert
                </p>
                <p className="text-sm text-gray-600">{notification.message}</p>
              </div>
            </div>
            <button
              onClick={() =>
                setNewsletterSpam((prev) =>
                  prev.filter((n) => n.id !== notification.id)
                )
              }
              className="text-gray-400 hover:text-gray-600 font-bold text-lg leading-none"
            >
              ×
            </button>
          </div>
        </div>
      ))}

      {showChatbot && (
        <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="bg-red-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <span className="font-semibold">Mean Bot 🤖</span>
            <button
              onClick={() => setShowChatbot(false)}
              className="text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
          <div className="h-64 overflow-y-auto p-3 space-y-3">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.isBot ? "justify-start" : "justify-end"
                } mb-2`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    message.isBot
                      ? "bg-red-100 text-red-800 border border-red-200"
                      : "bg-blue-100 text-blue-800 border border-blue-200"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleChatSubmit} className="p-3 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
      {showStaringContest && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="text-center text-white">
            {!contestStarted ? (
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  🎭 STARING CONTEST 🎭
                </h2>
                <p className="text-xl mb-6">
                  Camera access granted! Prepare yourself...
                </p>
                <div className="animate-pulse text-2xl">3... 2... 1...</div>
              </div>
            ) : (
              <div>
                <h2 className="text-3xl font-bold mb-6">👁️ DON'T BLINK 👁️</h2>
                <div className="flex justify-center items-center space-x-8 mb-8">
                  <div className="text-center">
                    <div className="w-64 h-48 bg-gray-800 rounded-lg overflow-hidden mb-2 border-2 border-white">
                      {videoStream ? (
                        <video
                          ref={(video) => {
                            if (video) {
                              video.srcObject = videoStream;
                              video.play();
                            }
                          }}
                          className="w-full h-full object-cover"
                          autoPlay
                          muted
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-4xl">📹</span>
                        </div>
                      )}
                    </div>
                    <p className="text-lg">Your Face</p>
                  </div>
                  <div className="text-center">
                    <div className="w-64 h-48 bg-gray-800 rounded-lg flex items-center justify-center mb-2 border-2 border-white">
                      <span className="text-8xl">😕</span>
                    </div>
                    <p className="text-lg">AI Opponent</p>
                  </div>
                </div>
                <button
                  onClick={handleYouLose}
                  className="px-8 py-4 bg-red-600 text-white text-xl font-bold rounded-lg hover:bg-red-700 transition animate-pulse"
                >
                  YOU LOSE! 😂
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {showAreYouStillThere && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-[60vw] p-10 rounded-lg shadow-2xl max-w-none">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-10">
                Hey 👋 are you still there?
              </h2>
              <img src={areYouAliveGif} className="mx-auto mb-10 " />
              <button
                onClick={() => setShowAreYouStillThere(false)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                I think so ...
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
