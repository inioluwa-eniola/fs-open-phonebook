import Person from './Person'
import DeleteBtn from './DeleteBtn'


const Persons = ({ personsToShow, handleDelete }) => {
    return (
        <ol>
            {personsToShow.map((person) => (
                <div className="name">
                    <Person key={person.name} person={person} />
                    <DeleteBtn person={person} handleDelete={() => handleDelete(person.id, person.name)}/>
                </div>
            ))}
        </ol>
    )
}

export default Persons 