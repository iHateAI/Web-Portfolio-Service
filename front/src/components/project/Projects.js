import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import Project from './Project';
import ProjectAddForm from './ProjectAddForm';
//import TestData from '../../dev/testData';
import * as Api from '../../api';

function Projects({ portfolioOwnerId, isEditable }) {
    //api 요청에 사용할 값, 편집 가능 여부
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState(null);
    //state

    const handleIsEditing = () => {
        setIsEditing(!isEditing);
    };
    //버튼 및 ProjectAddForm에 넘겨줄 isEditing 변경함수

    const getUser = async () => {
        // const fetchUser = await getProjects();
        try {
            const fetchUser = await Api.get('api/project').then(
                (res) => res.data
            );
            const users = fetchUser.map((obj) => {
                const startDate = obj.startDate.slice(0, 10);
                const endDate = obj.endDate.slice(0, 10);
                return { ...obj, startDate, endDate };
            });
            setUser([...users]);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getUser();
    }, []);
    //컴포넌트 mount시 모의 데이터 호출

    return (
        <Card className="px-3 w-75 py-3">
            <h3>프로젝트</h3>
            {user?.map((project, index) => (
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
        </Card>
    );
}

export default Projects;
