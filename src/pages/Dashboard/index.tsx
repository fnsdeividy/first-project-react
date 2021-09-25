import React, { useState, FormEvent } from 'react'
import { Title, Image, Form, Repositories } from './styles';
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
    const [newRepo, setNewRepo] = useState('')
    const [repositories, setRepositories] = useState<Repository[]>([])

    async function handleAddRepositories(event:FormEvent<HTMLFormElement>):Promise<void> {
    event.preventDefault();

    const res = await api.get<Repository>(`repos/${newRepo}`);

    const repository = res.data;

    setRepositories([... repositories, repository]);
    setNewRepo('');
}

return (
    <>
    <Image src="https://xesque.rocketseat.dev/platform/1587379765556-attachment.svg" alt="Github Explorer" />
    <Title>Explore repositórios no Github</Title>
    <Form
        onSubmit= {handleAddRepositories}
        action="" >
        <input
        value={newRepo}
        onChange={ (e) => setNewRepo(e.target.value) }
        placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
    </Form>

    <Repositories>
    {repositories.map(repository => (
        <a key={repository.full_name} href="teste">
        <img src={repository.owner.avatar_url} alt={repository.owner.login} />
        <div>
            <strong>{repository.full_name}</strong>
            <p>{repository.description}</p>
        </div>
        <FiChevronRight size={20}/>
    </a>
    ))}
    </Repositories>
    </>
    )
};

export default Dashboard;
