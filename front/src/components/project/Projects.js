import React, { useState, useEffect } from "react"
import { Button } from "react-bootstrap"
import Project from "./Project"
import ProjectAddForm from "./ProjectAddForm"
import { getProjects } from "./dev/mockApiProject"
import TestData from "../../dev/testData"

// Projects.defaultProps = {
//   portfolioOwnerId: 'dhekgus1122',
//   isEditable: true,
// };
//테스트용 props 기본값

function Projects({ portfolioOwnerId, isEditable }) {
    //api 요청에 사용할 값, 편집 가능 여부
    const [isEditing, setIsEditing] = useState(false)
    const [user, setUser] = useState(null)
    //state

    const handleIsEditing = () => {
        setIsEditing(!isEditing)
    }
    //버튼 및 ProjectAddForm에 넘겨줄 isEditing 변경함수

    const getUser = async () => {
        // const fetchUser = await getProjects();
        const fetchUser = await TestData.getProjects(portfolioOwnerId)
        setUser({ ...fetchUser.data })
    }

    useEffect(() => {
        getUser()
    }, [])
    //컴포넌트 mount시 모의 데이터 호출

    return (
        <div className="px-3 w-75">
            <h3>프로젝트</h3>
            {user?.projects?.map((project, index) => (
                <Project
                    project={project}
                    isEditable={isEditable}
                    getUser={getUser}
                    key={index}
                />
            ))}
            <div className="d-flex justify-content-center w-100">
                {isEditable && (
                    <Button
                        variant="primary"
                        className="text-center"
                        onClick={handleIsEditing}
                    >
                        +
                    </Button>
                )}
            </div>
            {isEditing && (
                <ProjectAddForm onClick={handleIsEditing} getUser={getUser} />
            )}
        </div>
    )
}

export default Projects
