const DeleteBtn = ({ handleDelete, person }) => {
    return(
        <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
    )
}

export default DeleteBtn