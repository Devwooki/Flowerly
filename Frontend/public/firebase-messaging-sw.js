  importScripts(
    "https://www.gstatic.com/firebasejs/9.0.2/firebase-app-compat.js"
  );
  importScripts(
    "https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging-compat.js"
  );
  
  firebase.initializeApp({
    apiKey: "AIzaSyCDZIH8n2O56d5pYGfJQR6rl8p3gnxcTfM",
    authDomain: "flower-ly.firebaseapp.com",
    projectId: "flower-ly",
    storageBucket: "flower-ly.appspot.com",
    messagingSenderId: "973445539914",
    appId: "1:973445539914:web:4f7c1bf91af1a253a7deb3",
  });
  
  const messaging = firebase.messaging();
  
  self.addEventListener('push', function(event) {
      // 받은 푸시 데이터를 처리해 알림으로 띄우는 내용
  });
  
  self.addEventListener('notificationclick', 
     function (e){
        console.log("test");
     
    });

  self.addEventListener("push", 
  function (e) {
    if (!e.data.json()) return;
  
    const resultData = e.data.json().notification;
    const notificationTitle = resultData.title;
    const notificationOptions = {
      body: resultData.body,
      icon: resultData.image, // 웹 푸시 이미지는 icon
      tag: resultData.tag,
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });