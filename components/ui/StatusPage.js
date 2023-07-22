import { useEffect, useState } from 'react';
import axios from 'axios';

function StatusPage() {
    const [status, setStatus] = useState('unknown');
  
    useEffect(() => {
      const getStatus = async () => {
        try {
          const response = await axios.get('https://1j2hymncv9zw.statuspage.io/api/v2/status.json');
          setStatus(response.data.status.indicator);
        } catch (error) {
          console.log(error);
        }
      };
  
      getStatus();
    }, []);
  
    return <div className='font-bold'>S T A T U S <br/>{status}</div>;
  }
  
  export default StatusPage;
  