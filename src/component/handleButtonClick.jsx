import React from 'react';
import axios from 'axios';

const handleButtonClick = () => {
  const handleButtonClick = () => {
    axios.post('/api/roulette')
      .then(response => {
        // 必要に応じてレスポンスを処理する
        console.log(response.data);
      })
      .catch(error => {
        // エラーを処理する（必要に応じて）
        console.error(error);
      });
  };

  return (
    <button onClick={handleButtonClick}>ルーレットを実行</button>
  );
};

export default handleButtonClick;
