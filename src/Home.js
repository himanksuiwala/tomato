import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Hero from "./Hero";
import { useDispatch } from "react-redux";
import { fetchAsyncStores } from "./features/store/storeSlice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncStores());
  }, [dispatch]);

  return (
    <D>
      <Hero />
      <div>Home</div>
    </D>
  );
};

const D = styled.div``;

export default Home;
