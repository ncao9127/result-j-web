import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import url from "../../components/api/api";
import Loading from "../../components/Loading/Loading";
import Head from 'next/head';
import redisurl from "../../components/api/api2";
import Institutesview from '../../components/Features/Institutesview';

const Institutes = () => {
    const [institutesData, setInstituteData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const code = "institutedetailsecet";
    const isFetching = useRef(false);

    useEffect(() => {
        // Ensure that the effect runs only once when the component mounts
        if (institutesData) {
            // Data is already in state; no need for a fetch
            setIsLoading(false);
            return;
        }
        // Prevent concurrent fetch requests
        if (isFetching.current) {
            return;
        }

        isFetching.current = true;

        const fetchData = async () => {
            setIsLoading(true);

            // Check if data is in local storage
            const storedData = localStorage.getItem(code);
            if (storedData) {
                const { data, expiryTimestamp } = JSON.parse(storedData);
                console.log('Taking From Cache');
                console.log('Cache expiry ', new Date(expiryTimestamp))

                if (expiryTimestamp && expiryTimestamp > Date.now()) {
                    setInstituteData(data);
                    setIsLoading(false);
                    return;
                } else {
                    console.log('Cache Expired : Cached Cleared...');
                    // Data has expired, remove it from localStorage
                    localStorage.removeItem(code);
                }
            }

            // Check if data is in Redis cache
            try {
                const redisResponse = await axios.get(redisurl + '/api/institute?code=' + code, { mode: 'cors' });
                if (redisResponse.data && redisResponse.data !== "Internal server error" && redisResponse.data !== "Data not found in cache") {
                    setInstituteData(redisResponse.data);
                    // Calculate the expiry timestamp for 15 days (in minutes)
                    const expiryDate = new Date();
                    expiryDate.setTime(expiryDate.getTime() + 15 * 24 * 60 * 60 * 1000); // 15 days in milliseconds
                    const dataToStore = {
                        data: redisResponse.data,
                        expiryTimestamp: expiryDate.getTime(),
                    };
                    localStorage.setItem(code, JSON.stringify(dataToStore));
                    console.log('Redis Cached Successfully..');
                    console.log('Cache Expiry', new Date(expiryDate));
                    setIsLoading(false);
                    return;
                }
            } catch (error) {
                console.log('Error fetching data from Redis cache:', error);
            }

            // If data is not available in cache, fetch it from the API
            try {
                const response = await axios.get( url + '/api/institute?code=' + code, { mode: 'cors' });
                setInstituteData(response.data);
                // Store data in localStorage with a 15-day expiry
                const expiryTimestamp = Date.now() + 15 * 24 * 60 * 60 * 1000;
                const dataToStore = { data: response.data, expiryTimestamp };
                localStorage.setItem(code, JSON.stringify(dataToStore));
                console.log('New Data Cached Successfully..');
                console.log('Cache Expiry', new Date(expiryTimestamp));
            } catch (error) {
                console.error('Error fetching institutes data:', error);
            }

            setIsLoading(false);
            isFetching.current = false;
        };

        fetchData();
    }, []); // The empty dependency array ensures this effect runs once when the component mounts.

    return (
        <div className='m-3'>
            <Head>
                <title>
                    JNTUH | INSTITUTES
                </title>
                <meta
                    name="description"
                    content="Check out institutes details completely here."
                    key="desc"
                />
            </Head>

            {isLoading ? (
                <Loading /> // Render the loading component
            ) : (
                // Render your component with the fetched data (Institutesview component)
                <Institutesview query={institutesData} />
            )}
        </div>
    );
};

export default Institutes;
