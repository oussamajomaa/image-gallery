import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditLanguage() {
    const [languageName, setLanguageName] = useState('');
    const [languageLevel, setLanguageLevel] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    // Fonction pour récupérer les données d'une langue spécifique
    const fetchOne = async () => {

        const response = await fetch(`http://localhost:3000/language/${id}`)
        if (!response.ok) throw new Error('Failed to fetch language')
        const data = await response.json()
        setLanguageName(data.languageName || '')
        setLanguageLevel(data.languageLevel || '')

    }

    useEffect(() => {
        fetchOne()
    }, [])

    const handleEdit = async (event) => {
        event.preventDefault()

        const response = await fetch(`http://localhost:3000/language/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                languageName,
                languageLevel
            })
        })

        if (response.ok) {
            const data = await response.json()
            console.log("Language updated:", data)
            navigate('/language')
        } else {
            console.error("Failed to update language")
        }

    }

    return (
        <div className="p-5">
            <h1 className="text-4xl font-bold">Mettre à jour une langue</h1>
            <form onSubmit={handleEdit} className="flex flex-col gap-5 p-5 mt-5 w-1/3">
                <input
                    value={languageName}
                    onChange={(e) => setLanguageName(e.target.value)}
                    placeholder="Saisir la langue"
                    type="text"
                    required
                    className="input input-bordered input-accent w-full"
                />

                {/* Sélecteur pour le niveau de la langue */}
                <select
                    value={languageLevel}
                    onChange={(e) => setLanguageLevel(e.target.value)}
                    required
                    className="select select-accent w-full"
                >
                    <option hidden value="">
                        Select a level
                    </option>
                    <option value="Débutant">Débutant</option>
                    <option value="Intermédiaire">Intermédiaire</option>
                    <option value="Avancé">Avancé</option>
                </select>


                <button className="btn btn-accent">Valider</button>
            </form>
        </div>
    )
}
