import React, {useEffect, useState} from 'react';

import Data from '../components/Data';
import Header from '../components/Header';
import api from '../services/api';

const button = {
    link: '/clients/create',
    label: 'ADICIONAR',
};
const title = 'Clientes';

export default function Main() {
    const [clients, setClients] = useState([]);

    useEffect(() => {
       async function loadClients() {
           const response = await api.get('/clients');

           setClients(response.data);
       }

       loadClients()
    }, []);

    return (
        <>
            <Header title={title} button={button}/>
            <Data items={clients} />
        </>
    );
}
