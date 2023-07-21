import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

import { getTitleByTotal } from "./utils";

import CSS from '../App.css'; 

import {
  Heading,

  Table,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'

const UsersShow = () => {
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

  const params = useParams();
  const user = jsonData && jsonData.users.find((user) => user[0] === parseInt(params.id));
  const counts = jsonData && jsonData.counts.filter((count) => {return count[0] === parseInt(params.id)});
  const total = jsonData ? counts.reduce((acc, count) => acc + count[2], 0) : 0;

  return (
    <>
      {user ? (
        <>
          <Heading>{user[1]}</Heading>
          <Heading>{getTitleByTotal(total)}</Heading>

          <Table variant='striped' colorScheme='blue'>
            <Tr>
              <Th></Th>
              <Th>回数</Th>
              <Th>割合 /%</Th>
            </Tr>
            <Tr>
              <Td>累計</Td>
              <Td>{total}</Td>
              <Td></Td>
            </Tr>
            {jsonData.places.map((place, index) => {
              const placeCount = counts.find((count) => count[1] === index + 1);
              const percentage = placeCount ? ((placeCount[2] / total) * 100).toFixed(2) : 0;
              return (
                <Tr key={index}>
                  <Td>{place}</Td>
                  <Td>{placeCount ? placeCount[2] : 0}</Td>
                  <Td>{percentage}%</Td>
                </Tr>
              );
            })}
          </Table>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </>
  );
};

export default UsersShow;