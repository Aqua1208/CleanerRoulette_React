import React, { useEffect, useState } from 'react';
import axios from 'axios';
import handleButtonClick from './component/handleButtonClick';
import CSS from './App.css' 

import {
  Center,

  Button,

  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,

  Spinner,
} from '@chakra-ui/react'

const date = new Date();

const App = () => {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3010/api');
        setJsonData(response.data);
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    };

    fetchData();
  }, [jsonData]);

  const [active, setActive] = useState(false);

  const roulette = async () => {
    try{
      await axios.post("http://localhost:3010/api/roulette")
      setActive(!active)
      console.log(active)
    } catch (error) {
      console.error('Error fetching JSON data:', error);
    }
  };

  const save = async () => {
    try{
      await axios.post("http://localhost:3010/logs/create")
    } catch (error) {
      console.error('Error fetching JSON data:', error);
    }
  }

  const attend = async (index) => {
    try {
      const data = { id: index };
      await axios.post("http://localhost:3010/attend", data);
    } catch (error) {
      console.error('Error fetching JSON data:', error);
    }
  };

  return (    
    <>
      <Center>
        <Button colorScheme='blue' onClick={roulette}>ルーレット</Button>
        <Button colorScheme='blue' onClick={save} variant='outline'>保存</Button>
      </Center>
      {jsonData ? (
        <Table variant='striped' colorScheme='blue'>
          <Thead>
            <Tr>
              <Th>#Place</Th>
              <Th>#Cleaner</Th>
            </Tr>
          </Thead>
          <Tbody>
            {jsonData.places.map((place, index) => (
              <Tr key={index}>
                <Td>{place}</Td>
                <Td><Spinner className={active ? "spinner" : ""} style={{"transitionDelay": `${index}s`}}/>
                  <span
                    className={active ? '' : 'spinner'}
                    style={{ transitionDelay: `${index}s` }}>
                    {jsonData.cleaners[index]}
                  </span>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <p>Loading JSON data...</p>
      )}
      {jsonData ? (
        <Table>
          <Thead>
            <Th>#Student</Th>
            <Th>#Attend</Th>
          </Thead>
          <Tbody>
            {jsonData.students.map((student, index) => (
              <Tr key={index}>
                <Td>{student[0]}</Td>
                <Td>
                  <Button
                    onClick={() => attend(index+1)}
                    colorScheme={ student[1] ? 'blue' : 'red'}
                  >
                    {student[1] ? '出席' : '欠席'}
                  </Button>
                  </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <p>Loading JSON data...</p>
      )}
    </>
  );
};

export default App;