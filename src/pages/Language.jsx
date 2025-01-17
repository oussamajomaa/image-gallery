import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Language() {
    const [languages, setLanguages] = useState([])
    const [languageName, setLanguageName] = useState('')
    const [languageLevel, setLanguageLevel] = useState('')
    const [isAdded, setIsAdded] = useState(false)
    const [operation,setOperation] = useState('')
    const navigate = useNavigate()
    

    const fetchData = async () => {
        const response = await fetch('http://localhost:3000/language')
        const data = await response.json()
        setLanguages(data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const response = await fetch('http://localhost:3000/language', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ languageName, languageLevel })
        })
        if (response.ok) {
            const data = await response.json()
            fetchData()
        }
        setLanguageLevel('')
        setLanguageName('')
        setIsAdded(false)

    }

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:3000/language/${id}`, {
            method: 'DELETE'
        })
        if (response.ok) {
            const data = await response.json()
            console.log(data);
            fetchData()

        }
    }

    const fetchOne = async(id) => {
        localStorage.setItem('id',id)
        setOperation('edit')
        const response = await fetch(`http://localhost:3000/language/${id}`)
        const data = await response.json()
        setIsAdded(true)
        setLanguageName(data.languageName)
        setLanguageLevel(data.languageLevel)
    }

    const handleEdit = (id) => {
        navigate(`/language/${id}`)

        // e.preventDefault()
        
        // const id = localStorage.getItem('id')
    
        // const response = await fetch(`http://localhost:3000/language/${id}`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ languageName, languageLevel })
        // })
        
        // if (response.ok) {
        //     const data = await response.json()
        //     console.log(data)
        // }
        // fetchData()
        // setIsAdded(false)
        // setLanguageLevel('')
        // setLanguageName('')
    }

    const handleAdd = ()=> {
        setIsAdded(true)
        setOperation('add')
    }

    return (
        <div className='p-5'>
            <div className='flex justify-between'>
                <h1 className='text-4xl font-bold'>Liste des langues</h1>
                <button className='btn btn-primary btn-md' onClick={handleAdd}>+</button>
            </div>
            <table className='table'>
                <tbody>
                    <tr>
                        <th>Langue</th>
                        <th>Level</th>
                        <th>Actions</th>
                    </tr>
                    {languages.map(language => (
                        <tr key={language._id}>
                            <td>{language.languageName}</td>
                            <td>{language.languageLevel}</td>
                            <td className='flex gap-2'>
                                <button
                                    onClick={() => handleEdit(language._id)}
                                    className='btn btn-success text-white btn-sm'>
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(language._id)}
                                    className='btn btn-error text-white btn-sm'>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            {isAdded && <form onSubmit={operation==='add'?handleSubmit:handleEdit} className='flex flex-col gap-5 p-5 mt-5 w-1/3'>
                <input
                    value={languageName}
                    onChange={(e) => setLanguageName(e.target.value)}
                    placeholder='Saisir la langue'
                    type="text"
                    required
                    className='input input-bordered input-accent w-full ' />
                <select
                    value={languageLevel}
                    onChange={(e) => setLanguageLevel(e.target.value)}
                    className='select select-accent w-full '>
                    <option defaultValue hidden value='Select a level'>Select a level</option>
                    <option value="Débutant">Débutant</option>
                    <option value="Intermédiaire">Intermédiaire</option>
                    <option value="Avancé">Avancé</option>
                </select>

                <button className='btn btn-accent'>Valider</button>
            </form>}

        </div>
    )
}
