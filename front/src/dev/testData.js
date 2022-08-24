// Test를 위한 Data
// 백엔드 API와 연동할 때 실제 Data로 주고 받을 수 있도록 수정.

const userId = 1
const TestData = {
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
        projects: [
            {
                user_id: 1,
                name: "testProject1",
                description: "설명이 없습니다. 추가해 주세요",
                date: {
                    start: "2022-08-21",
                    end: "2022-08-21",
                },
                key: "idkman",
            },
            {
                user_id: 1,
                name: "testProject2",
                description: "설명이 없습니다. 추가해 주세요",
                date: {
                    start: "2022-08-23",
                    end: "2022-08-25",
                },
                key: "randomkey",
            },
        ],
        educations: [
            {
                id: 1,
                school: "서울대",
                major: "의류",
                position: "학사",
                user_id: 1,
            },
        ],
        certificates: [
            {
                user_id: 1,
                id: 1,
                title: "test title",
                description: "test description",
                certificateDate: "2022-08-22",
            },
        ],
    },
}

// Award
TestData.getAwards = async function (userId) {
    return TestData[userId].awardArray
}

TestData.createAward = async function (userId, newAwardObj) {
    TestData[userId].awardArray.push(newAwardObj)
}

TestData.updateAward = async function (userId, editedAward) {
    TestData[userId].awardArray = TestData[userId].awardArray.map((item) => {
        if (parseInt(item.id) === parseInt(editedAward.id)) {
            return {
                user_id: userId,
                ...editedAward,
            }
        }
        return item
    })
    return TestData[userId].awardArray
}

TestData.deleteAward = async function (userId, target) {
    TestData[userId].awardArray = TestData[userId].awardArray.filter(
        (item) => item.id !== target.id
    )
    return TestData[userId].awardArray
}

// Education
TestData.getEducations = async function (userId) {
    return TestData[userId].educations
}

TestData.createEducation = async function (data) {
    const { id, user_id, school, major, position } = data
    const newObj = { id, user_id, school, major, position }
    TestData[userId].educations.push(newObj)
}

TestData.updateEducation = async function (data) {
    TestData[userId].educations = TestData[userId].educations.map((item) => {
        if (parseInt(item.id) === parseInt(data.id)) {
            return {
                user_id: userId,
                ...data,
            }
        }
        return item
    })
}

TestData.deleteEducation = async function (userId, target) {
    TestData[userId].educations = TestData[userId].educations.filter(
        (item) => item.id !== target.id
    )
}

// Proejct
TestData.getProjects = async function (userId) {
    const user = {}
    user.data = {}
    user.data.projects = TestData[userId].projects
    return user
}

TestData.createProject = async function (newProject) {
    TestData[userId].projects.push(newProject)
}

TestData.updateProject = async function (key, updated) {
    TestData[userId].projects = TestData[userId].projects.map((item) => {
        if (item.key === key) {
            return {
                key: key,
                ...updated,
            }
        }
        return item
    })
}

TestData.deleteProject = async function (key) {
    TestData[userId].projects = TestData[userId].projects.filter(
        (item) => item.key !== key
    )
}

// Certificate
TestData.getCertificates = async function (userId) {
    return TestData[userId].certificates
}

TestData.createCertificate = async function (userId, newCertificateObj) {
    TestData[userId].certificates.push(newCertificateObj)
    return TestData[userId].certificates
}

TestData.updateCertificate = async function (userId, certificate) {
    TestData[userId].certificates = TestData[userId].certificates.map(
        (item) => {
            if (parseInt(item.id) === parseInt(certificate.id)) {
                return {
                    user_id: userId,
                    ...certificate,
                }
            }
            return item
        }
    )
    return TestData[userId].certificates
}

TestData.deleteCertificate = async function (userId, target) {
    TestData[userId].certificates = TestData[userId].certificates.filter(
        (item) => item.id !== target.id
    )
    return TestData[userId].certificates
}

export default TestData
