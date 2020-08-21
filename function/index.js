const { v4: uuidv4 } = require('uuid');
const admin = require('firebase-admin')

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

const fireStore = admin.firestore();

exports.testFireStore = async (req, res) => {
    const citiesRef = fireStore.collection('cities');
    await citiesRef.doc('SF').set({
        name: 'San Francisco', state: 'CA', country: 'USA',
        capital: false, population: 860000 })

    const cityRef = fireStore.collection('cities').doc('SF')
    cityRef.get()
        .then(doc => {
            if (!doc.exists) {
                res.status(200).send('No such document!')
            } else {
                res.status(200).send(doc.data())
            }
        })
        .catch(err => {
            res.status(404).send('not found')
        })
}

exports.convertLiveDetails = async (event, context) => {
    const message = event.data
        ? Buffer.from(event.data, 'base64').toString()
        : 'Hello, World';
    const chatMessages = JSON.parse(message);
    const messages = chatMessages.map((chat) => ({
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
