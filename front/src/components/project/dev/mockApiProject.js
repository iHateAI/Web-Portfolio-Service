const user = {
  data: {
    id: 'dhekgus1122',
    email: 'peelsob4d@gmail.com',
    name: '오다현',
    password: 'testpassword',
    description: '설명이 없습니다. 추가해 주세요',
    projects: [
      {
        name: 'testProject1',
        description: '설명이 없습니다. 추가해 주세요',
        date: {
          start: '2022-08-21',
          end: '2022-08-21',
        },
        key: 'idkman',
      },
      {
        name: 'testProject2',
        description: '설명이 없습니다. 추가해 주세요',
        date: {
          start: '2022-08-23',
          end: '2022-08-25',
        },
        key: 'randomkey',
      },
    ],
  },
};

const wait = (timeToDelay) =>
  new Promise((resolve) => setTimeout(resolve, timeToDelay));

const getProjects = async () => {
  await wait(300);
  return user;
};

const putProject = async (project) => {
  await wait(300);
  user.data.projects.push(project);
};

const postProject = async (key, newProject) => {
  console.log(key);
  console.log(newProject);
  await wait(300);
  const newProjects = user.data.projects.map((project) => {
    if (project.key === key) {
      console.log('key correct');
      return { ...newProject };
    }
    return project;
  });
  user.data.projects = newProjects;
};

const deleteProject = async (key) => {
  await wait(300);
  const deleted = user.data.projects.filter((project) => project.key !== key);
  user.data.projects = deleted;
};

export { getProjects, putProject, postProject, deleteProject };
