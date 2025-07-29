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
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [showAdBlockerPopup, setShowAdBlockerPopup] = useState(false);
  const [showSadChild, setShowSadChild] = useState(false);
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

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

  const cowFacts = [
    "Did you know cows can sleep while standing up? They only lie down for deep sleep!",
    "Cows have best friends and get stressed when separated from them.",
    "A cow can produce up to 200,000 glasses of milk in her lifetime!",
    "Cows have excellent memories and can remember faces for years.",
    "Cows can smell something up to 6 miles away - that's some powerful sniffer!",
    "Cows have 360-degree panoramic vision, so they can see almost everything around them.",
    "Cows spend 6-7 hours eating and 8 hours chewing their cud each day.",
    "Cows can run up to 25 mph - faster than most humans!",
    "Cows have unique spots, just like human fingerprints.",
    "Cows can produce up to 125 pounds of saliva per day - that's a lot of spit!",
    "Cows have four stomachs: rumen, reticulum, omasum, and abomasum.",
    "Cows can hear both low and high frequency sounds that humans cannot.",
    "Cows can detect odors up to 5 miles away.",
    "Cows are social animals and form close bonds with their herd members.",
    "Cows can recognize their names and respond when called.",
    "Cows have a strong maternal instinct and will protect their calves fiercely.",
    "Cows can live up to 20 years, though most dairy cows live 4-6 years.",
    "Cows can see colors, but they're red-green colorblind.",
    "Cows have a great sense of balance and rarely fall over.",
    "Cows can produce up to 50 quarts of saliva daily to help digest their food.",
  ];

  const trollNotifications = [
    "Nothing happened. Thought you should know.",
    "Still nothing. Just checking in.",
    "Yep, still nothing happening here.",
    "Breaking news: Nothing continues to happen.",
    "Update: The nothingness persists.",
    "Just wanted to let you know that nothing is still nothing.",
    "Status report: Nothing has changed. Nothing continues.",
    "Alert: Nothing detected. Nothing confirmed.",
    "This is your nothing update for the day.",
    "Nothing to report, but here's a notification anyway.",
    "The void remains empty. As expected.",
    "Nothing has occurred since the last nothing.",
    "Still nothing. This is getting exciting.",
    "Nothing update: Nothing is still nothing.",
    "Breaking: Nothing continues to be nothing.",
    "Nothing has happened. Nothing will happen. Nothing is eternal.",
    "Your daily dose of nothing.",
    "Nothing report: Nothing is proceeding as planned.",
    "Nothing continues unabated.",
  ];

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      // Add user message
      setChatMessages((prev) => [...prev, { text: userInput, isBot: false }]);

      // Add cow fact response
      setTimeout(() => {
        const randomResponse =
          cowFacts[Math.floor(Math.random() * cowFacts.length)];
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
      "Oh wow, you blinked. Incredible performance. Truly unmatched focus."
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

  const requestNotificationPermission = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          // Start sending troll notifications
          sendTrollNotifications();
        }
      });
    }
  };

  const sendTrollNotifications = () => {
    // Send initial notification
    setTimeout(() => {
      new Notification("E-Z Search™", {
        body: "Nothing happened. Thought you should know.",
        icon: "/logo.png",
      });
    }, 2000);

    // Send periodic troll notifications
    const notificationInterval = setInterval(() => {
      const randomNotification =
        trollNotifications[
          Math.floor(Math.random() * trollNotifications.length)
        ];
      new Notification("E-Z Search™", {
        body: randomNotification,
        icon: "/logo.png",
      });
    }, 5000); // Send every 30 seconds

    // Store the interval ID to clear it later if needed
    window.trollNotificationInterval = notificationInterval;
  };

  const handleAdBlockerRefuse = () => {
    setShowAdBlockerPopup(false);
    setShowSadChild(true);
  };

  const handleSadChildClose = () => {
    setShowSadChild(false);
  };

  const handleImFeelingLucky = () => {
    setShowSpinWheel(true);
  };

  const handleSpinWheel = () => {
    setIsSpinning(true);
    // Spin for 3 seconds then redirect to Rick Roll
    setTimeout(() => {
      setIsSpinning(false);
      window.open(
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1",
        "_blank"
      );
      setShowSpinWheel(false);
    }, 3000);
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
    setShowNotificationPopup(true);
    setShowAdBlockerPopup(true);
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
      <h1 className="text-4xl font-bold text-blue-600 mb-8">E-Z-Search™</h1>
      <form onSubmit={handleSubmit} className="flex w-full max-w-md">
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-l border border-gray-300 focus:outline-none"
          placeholder="E-Z-Search..."
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
      <button
        onClick={handleImFeelingLucky}
        className="mt-4 px-6 py-2 bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 transition"
      >
        I'm Feeling Lucky
      </button>
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
            <span className="font-semibold">E-Z Bot 🤖</span>
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
      {showNotificationPopup && (
        <div className="fixed top-4 right-4 bg-white p-4 rounded shadow-lg max-w-xs w-full text-center z-50 border border-gray-200">
          <h2 className="text-base font-semibold mb-1">
            🔔 Enable Notifications
          </h2>
          <p className="mb-3 text-gray-600 text-sm">
            Get instant updates and important alerts from E-Z Search™!
          </p>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => {
                requestNotificationPermission();
                setShowNotificationPopup(false);
              }}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
            >
              Enable
            </button>
            <button
              onClick={() => setShowNotificationPopup(false)}
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition text-sm"
            >
              Maybe Later
            </button>
          </div>
        </div>
      )}
      {showAdBlockerPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                🚫 Ad Blocker Detected
              </h2>
              <p className="text-gray-600 mb-6">
                We've detected that you're using an ad blocker. Please disable
                it to support our free service and help us continue providing
                quality content.
              </p>

              <div className="space-y-3">
                <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                  Disable Ad Blocker
                </button>
                <button
                  onClick={handleAdBlockerRefuse}
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  Refuse
                </button>
              </div>

              <button
                onClick={() => setShowAdBlockerPopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
      {showSadChild && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mb-4">
                <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full flex items-center justify-center text-6xl">
                  😢
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Little Timmy Doesn't Get Food
              </h2>
              <p className="text-gray-600 mb-4">
                Because you refused to disable your ad blocker, we can't show
                you our amazing product:
              </p>
              <div className="bg-gray-100 p-3 rounded-lg mb-4">
                <p className="text-sm font-semibold text-gray-800">
                  Natotela 24in Galvanized Steel Drainage Grate-B125 Heavy Duty
                  Metal Catch Basin Grate for 24" Square Catch Basin, Outdoor
                  Drain Grates for Garage, Sewer, Downspout, Driveway, Factory
                  (23.8x23.8 in)
                </p>
              </div>
              <p className="text-gray-600 mb-4">
                Little Timmy goes hungry because of people like you who block
                ads. Think about the children! 😢
              </p>

              <button
                onClick={handleSadChildClose}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                I'm Sorry, Close This
              </button>
            </div>
          </div>
        </div>
      )}
      {showSpinWheel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              🎰 Spin the Wheel! 🎰
            </h2>

            <div className="mb-6">
              <div className="w-64 h-64 mx-auto border-4 border-gray-300 rounded-full relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={`w-full h-full bg-blue-500 flex items-center justify-center ${
                      isSpinning ? "animate-spin" : ""
                    }`}
                  >
                    <div className="text-center text-white font-bold text-lg">
                      <div className="text-4xl mb-2">🎁</div>
                      <div>Special Prize!</div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-16 border-l-transparent border-r-transparent border-t-red-600 z-10"></div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleSpinWheel}
                disabled={isSpinning}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition ${
                  isSpinning
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {isSpinning ? "Spinning..." : "SPIN THE WHEEL!"}
              </button>
              <button
                onClick={() => setShowSpinWheel(false)}
                className="w-full py-2 px-6 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
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
