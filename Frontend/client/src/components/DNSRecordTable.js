import React from 'react';
import './DNSRecordTable.css'; 
import { useState, useEffect } from 'react';


const DNSRecordTable = () => {

  const [dnsRecords, setDNSRecords] = useState([]);

  useEffect(() => {
    fetchDNSRecords();
  }, []);

  const fetchDNSRecords = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/dns');
      if (response.ok) {
        const data = await response.json();
        setDNSRecords(data);
      } else {
        console.error('Failed to fetch DNS records');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteRecord = async (domain, type, value) => {
    try {
        const response = await fetch(`http://localhost:3000/api/dns/delete/${domain}?type=${type}&values=${value}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log('DNS record deleted successfully');
            // Refetch DNS records after deletion
            fetchDNSRecords();
        } else {
            console.error('Failed to delete DNS record');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

  return (
    <table>
      <thead>
        <tr>
          <th>Domain</th>
          <th>DNS Record Type</th>
          <th>Value</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {dnsRecords.map(record => (
          <tr key={record.id}>
            <td>{record.domain}</td>
            <td>{record.type}</td>
            <td>{record.value}</td>
            <td>
              <button onClick={() => handleDeleteRecord(record.domain, record.type, record.value)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DNSRecordTable;
//dnsrecordtable