import React, { useState,useEffect, FormEvent } from 'react'
import { Link } from 'react-router-dom';
import { Title, Image, Form, Repositories, Error } from './styles';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';


interface Repository {
    full_name: string;
    description:string;
    owner: {
        login: string;
        avatar_url:string;
    }
}


const Dashboard:React.FC = () => {
    const [newRepo, setNewRepo] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storagedRepositories = localStorage.getItem('@GithubExplorer:repositories')

        if (storagedRepositories) {
            return JSON.parse(storagedRepositories);
        }else {
            return [];
        }
    });
    const [inputError, setInputError] = useState('');

    useEffect(()=> {
        localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories))
    }, [repositories])

    async function handleAddRepositories(event:FormEvent<HTMLFormElement>):Promise<void> {
        event.preventDefault();

        if(!newRepo) {
        setInputError('Digite o autor/nome do repositório')
        return;
        }

        try {
            const res = await api.get<Repository>(`repos/${newRepo}`);

        const repository = res.data;
        setInputError('')

        setRepositories([... repositories, repository]);
        setNewRepo('');
        } catch (err) {
            setInputError('Erro na busca do repositório')
        }


    }

return (
    <>
    <Image src="https://xesque.rocketseat.dev/platform/1587379765556-attachment.svg" alt="Github Explorer" />
    <Title>Explore repositórios no Github</Title>
    <Form hasError={!!inputError}
        onSubmit= {handleAddRepositories}
        action="" >
        <input
        value={newRepo}
        onChange={ (e) => setNewRepo(e.target.value) }
        placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
    </Form>
    {inputError && <Error>{inputError}</Error> }
    <Repositories>
    {repositories.map(repository => (
        <Link key={repository.full_name} to={`/repository/${repository.full_name}`}>
        <img src={repository.owner.avatar_url} alt={repository.owner.login} />
        <div>
            <strong>{repository.full_name}</strong>
            <p>{repository.description}</p>
        </div>
        <FiChevronRight size={20}/>
    </Link>
    ))}
    </Repositories>
    </>
    )
};

export default Dashboard;
