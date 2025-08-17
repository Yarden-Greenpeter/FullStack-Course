
const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://ygreenpeter:${password}@cluster1.svwado3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length >= 5){
    const newPerson = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    newPerson.save().then(result => {
        console.log(`add ${newPerson.name} number ${newPerson.number} to phonebook`)
        mongoose.connection.close()
    })

} else {
    Person.find({}).then(result => {
        result.forEach(note => {
          console.log(note)
        })
        mongoose.connection.close()
      })
}