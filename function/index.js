const { v4: uuidv4 } = require('uuid');
const admin = require('firebase-admin')

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

const fireStore = admin.firestore();

exports.convertLiveDetails = async (event) => {
    const message = event.data
        ? Buffer.from(event.data, 'base64').toString()
        : 'Hello, World';
    const liveDetails = JSON.parse(message);
    const messages = liveDetails.map((chat) => ({
        videoId: chat.videoId,
        chatId: chat.chatId,
        concurrentViewers: chat.concurrentViewers,
        likeCount: chat.likeCount,
        dislikeCount: chat.dislikeCount,
        userName: chat.userName,
        message: chat.message,
        publishedAt: chat.publishedAt,
    }));


    const [{ videoId, chatId, concurrentViewers, likeCount, dislikeCount }] = messages;
    const liveEntity = {
        videoId,
        chatId,
        concurrentViewers,
        likeCount,
        dislikeCount,
        time: new Date().toISOString(),
    };

    const liveRef = fireStore.collection('lives');
    await liveRef.doc(`${videoId}-${uuidv4()}`).set(liveEntity)
};
