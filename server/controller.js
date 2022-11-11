const fortunes = [`A beautiful, smart, and loving person will be coming into your life.`, `A faithful friend is a strong defense.`, `A fresh start will put you on your way.`, `A friend is a present you give yourself.`, `A pleasant surprise is waiting for you.`];
let goals = [
    {
        id: 1,
        goal: 'Pass the test',
        motivation: 'To complete the class',
        level: 7
    }
]
let globalId = 2

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },

    getFortune: (req, res) => {
        
        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex];

        res.status(200).send(randomFortune)
    },

    getGoals: (req, res) =>{
        res.status(200).send(goals)
    },

    deleteGoal: (req, res) => {
        let index = goals.findIndex(e => e.id === +req.params.id)
        goals.splice(index, 1)
        res.status(200).send(goals)
    },

    createGoal: (req, res) => {
        let {goal, motivation, level} = req.body
        let newGoal = {
            id: globalId,
            goal,
            motivation,
            level
        }
        goals.push(newGoal)

        res.status(200).send(goals)
        globalId++
    },

    updateGoal: (req, res) => {
        let {id} = req.params
        let {type} = req.body

        let index = goals.findIndex(g => g.id === +id)

        if(goals[index].level === 1 && type === `minus`){
            res.status(400).send(`Cannot go below 1`)
        }
        else if(goals[index].level === 10 && type === `plus`){
            res.status(400).send(`Cannot go above 10`)
        }
        else if(type === `minus`){
            goals[index].level -= 1
            res.status(200).send(goals)
        }
        else if(type === `plus`){
            goals[index].level += 1
            res.status(200).send(goals)
        }
        else{
            res.sendStatus(400)
        }
    }


}