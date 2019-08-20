// This file is part of the opinionator project

// Copyright (C) 2019  Jonas Bentke <jonas@slock.it>, Slock.it GmbH
 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// [Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.]
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.


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