// Test를 위한 Data
// 백엔드 API와 연동할 때 실제 Data로 주고 받을 수 있도록 수정.

const userId = 1

const AwardTestData = {
    userId: userId,
    isEditable: true,
    [userId]: {
        awardArray: [
            {
                user_id: 1,
                id: 1,
                title: "Test Award Title",
                description: "Test Award Description",
            },
        ],
    },
}

AwardTestData.getAwards = async function (userId) {
    return AwardTestData[userId].awardArray
}

AwardTestData.createAward = async function (userId, newAwardObj) {
    AwardTestData[userId].awardArray.push(newAwardObj)
}

AwardTestData.updateAward = async function (userId, editedAward) {
    return AwardTestData[userId].awardArray.map((item) => {
        if (parseInt(item.id) === parseInt(editedAward.id)) {
            return {
                userId: userId,
                ...editedAward,
            }
        }
        return item
    })
}

export default AwardTestData
