export function setProjects (state, projects) {
        state.projects = projects
}

export function updateProjects (state, payload) {
    state.projects[payload.idx] = payload.project
}

export function addProject (state, project) {
    state.projects.push(project)
}

export function udateProjectsSum (state, totalSum) {
    state.projectsSum = totalSum
}

export function setCreationDate (state, creationDate) {
    state.creationDate = creationDate
}

export function setUpdateDate (state, updateDate) {
    state.updateDate = updateDate
}


export function updateDate (state, idx) {
    const dateNow = new Date().toLocaleDateString("ru", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timezone: 'UTC'
    })
    state.projects[idx].updateDate = dateNow
}


export function changeProject (state, project) {
    const index = state.projects.findIndex(item => item.id === project.id);
    if (index !== -1) {
      state.projects[index] = project
    }
    console.log('проекты в store после изменения', state.projects)
}