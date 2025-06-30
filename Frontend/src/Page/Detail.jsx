import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Det from '../Component/Det'
import Exervideo from '../Component/Exervideo'
import Similar from '../Component/Similar'
import { useParams } from 'react-router-dom'
import { fetchData } from '../utils/fetchData'
import Equip from '../Component/Equip'

const Detail = () => {

  const [exerdetail,setexerdetail]=useState({})
  const [exercisevideo,setexercisevideo]=useState([])
  const [targetmuscleexer,settargetmuscleexer]=useState([])
  const [equipmentexer,setequipmentexer]=useState([])
  const {id}=useParams();
  useEffect(() => {
    const fetchexerdata = async () => {
    const exerdetaildata = await fetchData(`https://fitness-app-backend-1xz5.onrender.com/api/exercise/${id}`);
    setexerdetail(exerdetaildata);

    const targetmuscle = await fetchData(`https://fitness-app-backend-1xz5.onrender.com/api/target/${exerdetaildata.target}`);
    settargetmuscleexer(targetmuscle);

    const equipmentdata = await fetchData(`https://fitness-app-backend-1xz5.onrender.com/api/equipment/${exerdetaildata.equipment}`);
    setequipmentexer(equipmentdata);
    };
    fetchexerdata();
  }, [id]);

  useEffect(() => {
  if (!exerdetail.name) return;

  const fetchVideos = async () => {
    try {
      const response = await fetch(`https://fitness-app-backend-1xz5.onrender.com/api/youtube?query=${exerdetail.name}`);
      const data = await response.json();
      setexercisevideo(data.contents || []); // fallback to empty array
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
    }
  };

  fetchVideos();
}, [exerdetail.name]);

  return (
    <Box>
      <Det exerdetail={exerdetail}/>
      <Exervideo exercisevideo={exercisevideo} name={exerdetail.name}/>
      <Similar targetmuscleexer={targetmuscleexer} />
      <Equip equipmentexer={equipmentexer}/>
    </Box>
  )
}

export default Detail
