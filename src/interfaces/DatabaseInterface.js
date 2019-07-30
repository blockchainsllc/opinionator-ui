/*
// This file is part of voting-ui-new.
// 
// It is subject to the terms and conditions defined in
// file 'LICENSE.', which is part of this source code package.
//
// @author Markus Keil 
// @version 0.1
// @copyright 2018 by Slock.it GmbH
*/

import axios from 'axios'
import config from '../config.json';

const backendAddress = config.api;

export const sendVote = async (inputData) => {

  const args = {
    data: inputData,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return axios.post(backendAddress + '/Votes', args).then(response => response.data)
};

export const getGasForProposal = async (pollId, proposalId) => {
  return axios.get(backendAddress + '/Votes/Gas/' + pollId + '/' + proposalId).then(_ => _.data)
};

export const getMinerForProposal = async (pollId, proposalId) => {
  return axios.get(backendAddress + '/Votes/Miner/' + pollId + '/' + proposalId).then(_ => _.data)
};

export const getDevForProposal = async (pollId, proposalId) => {
  return axios.get(backendAddress + '/Votes/Dev/' + pollId + '/' + proposalId).then(_ => _.data)
};

export const getAmountOfVotesForPoll = async (pollId) => {
  return axios.get(backendAddress + '/Votes/' + pollId + '/').then(_ => _.data)
};