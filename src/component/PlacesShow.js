import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Heading } from '@chakra-ui/react';

const PlaceShow = () => {
  const [jsonData, setJsonData] = useState(null);
  const [cleaningChampion, setCleaningChampion] = useState(null);
  const [usersData, setusersData] = useState([]);

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
  }, []);

  useEffect(() => {
    if (jsonData) {
      setusersData(jsonData.users);
    }
  }, [jsonData]);

  useEffect(() => {
    if (jsonData) {
      const monthlyLogs = jsonData.monthlyLogs;
      const champions = {};

      monthlyLogs.forEach((log) => {
        const [userId, placeId] = log;
        if (placeId === parseInt(params.id)) {
          if (!champions[userId]) {
            champions[userId] = 1;
          } else {
            champions[userId]++;
          }
        }
      });

      const maxCount = Math.max(...Object.values(champions));
      const championUserIds = Object.keys(champions).filter((userId) => champions[userId] === maxCount);
      const championUsers = championUserIds.map((userId) => ({
        user_id: userId,
        name: getUserNameById(userId),
        count: maxCount,
      }));

      setCleaningChampion(championUsers);
    }
  }, [jsonData, usersData]);

  const params = useParams();
  const place = jsonData && jsonData.places[parseInt(params.id) - 1];

  const getUserNameById = (userId) => {
    const user = usersData.find((user) => user[0] === parseInt(userId));
    return user ? user[1] : 'Unknown';
  };

  return (
    <>
      {place ? (
        <>
          <Heading>{place}</Heading>
          {cleaningChampion && cleaningChampion.length > 0 ? (
            <div>
              <p>掃除王:</p>
              <ul>
                {cleaningChampion.map((champion, index) => (
                  <li key={index}>
                    ユーザー名 {champion.name}（回数: {champion.count} 回）
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>まだ掃除王はいません</p>
          )}
        </>
      ) : (
        <p>Loading place data...</p>
      )}
    </>
  );
};

export default PlaceShow;