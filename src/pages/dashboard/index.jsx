import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAllBooks } from '../lib/book';

const Dashboard = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const booksData = await getAllBooks();
                setData(booksData);
            } catch (error) {
                // Handle error
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <ul>
                {data?.data.map(book => (
                    <li>{book.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
