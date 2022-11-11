const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById(`fortuneButton`)
const goalsContainer = document.querySelector(`#goals-container`)
const form = document.querySelector('form')

const baseURL = `http://localhost:4000/api/goals`

const goalCallback = ({ data: goals }) => displayGoals(goals)


const getAllGoals = () => axios.get(baseURL).then(goalCallback)
const createGoal = body => axios.post(baseURL, body).then(goalCallback)
const deleteGoal = id => axios.delete(`${baseURL}/${id}`).then(goalCallback)
const updateGoal = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(goalCallback).catch(err => alert(err.response.data))

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
    .then(res => {
        const data = res.data
        console.log(data)
        alert(data);
    })
}

function submitHandler(e) {
    e.preventDefault()

    let goal = document.querySelector('#goal-add')
    let motivation = document.querySelector('#motivation-add')
    let level = document.querySelector('#level-add')

    let goalObj = {
        goal: goal.value,
        motivation: motivation.value, 
        level: level.value
    }

    createGoal(goalObj)

    goal.value = ''
    motivation.value = ''
    level.value = ''
}

function createGoalCard(goalInfo) {
    const goalCard = document.createElement('div')

    goalCard.innerHTML = `
    <p class="address">${goalInfo.goal}</p>
    <p class="goal-price">${goalInfo.motivation}</p>
    <div class="btns-container">
        <button onclick="updateGoal(${goalInfo.id}, 'minus')">-</button>
        <p>${goalInfo.level}</p>
        <button onclick="updateGoal(${goalInfo.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteGoal(${goalInfo.id})">delete</button>
    `


    goalsContainer.appendChild(goalCard)
}

function displayGoals(arr) {
    goalsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createGoalCard(arr[i])
    }
}

complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener(`click`, getFortune)
form.addEventListener('submit', submitHandler)

getAllGoals()