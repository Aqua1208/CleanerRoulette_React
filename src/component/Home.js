import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { getTitleByTotal } from './utils';

import CSS from '../App.css'; 

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

const Home = () => {
  const [jsonData, setJsonData] = useState(null);
  console.log(jsonData)

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
      <div className='flex'>
        <img src="/sweeper.png" />
        <div className='article'>
          <div className='main'>
            <div></div>
            <Center>
              <Button colorScheme='blue' onClick={roulette} size='lg'>ルーレット</Button>
              <Button colorScheme='blue' onClick={save} variant='outline' size='lg'>保存</Button>
            </Center>
            {jsonData ? (
              <Table variant='striped' colorScheme='blue'>
                <Thead>
                  <Tr>
                    <Th>#Place</Th>
                    <Th></Th>
                    <Th>#Cleaner</Th>
                    <Th>#Rank</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {jsonData.places.map((place, index) => {
                    const total = jsonData.counts
                      .filter((count) => count[1] === index + 1)
                      .reduce((acc, count) => acc + count[2], 0);

                    return (
                      <Tr key={index}>
                        <Td>
                          <a href={'/places/' + (index + 1)}>{place}</a>
                        </Td>
                        <Td><Spinner className={active ? 'spinner' : ''} style={{ transitionDelay: `${index}s` }} /></Td>
                        <Td>
                          <a
                            className={active ? '' : 'spinner'}
                            style={{ transitionDelay: `${index}s` }}
                          >
                            {jsonData.cleaners[index]}
                          </a>
                        </Td>
                        <Td>
                          <span
                            className={active ? '' : 'spinner'}
                            style={{ transitionDelay: `${index}s` }}
                          >
                            {getTitleByTotal(total)}
                          </span>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            ) : (
              <p>Loading JSON data...</p>
            )}
          </div>
        </div>
      </div>
      {jsonData ? (
        <Table variant='striped' colorScheme='green'>
          <Thead>
            <Th>#user</Th>
            <Th>#Attend</Th>
            <Th>#Rank</Th>
          </Thead>
          <Tbody>
            {jsonData.users.map((user, index) => {
              const total = jsonData.counts
                .filter((count) => count[0] === user[0])
                .reduce((acc, count) => acc + count[2], 0);

              return (
                <Tr key={index}>
                  <Td>
                    <a href={'/users/' + user[0]}>{user[1]}</a>
                  </Td>
                  <Td>
                    <Button
                      onClick={() => attend(user[0])}
                      colorScheme={user[2] ? 'blue' : 'red'}
                    >
                      {user[2] ? '出席' : '欠席'}
                    </Button>
                  </Td>
                  <Td>
                    {getTitleByTotal(total)}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      ) : (
        <p>Loading JSON data...</p>
      )}
    </>
  );
};

export default Home;