import * as fs from 'fs';
import axios from 'axios';
import { data } from 'autoprefixer';

const TESTNET_ENDPOINT = "https://mem-testnet.xyz/deploy";

async function deploy() {
  try {
    const sourceCode = fs.readFileSync("./app/contract/contract.js", { encoding: "utf8" }); // the src code of the function
    const initState = fs.readFileSync("./app/contract/state.json", { encoding: "utf8" }); // the JSON initial function state

    const body = {
      src: sourceCode,
      state: initState,
    };

    const function_id = (await axios.post(TESTNET_ENDPOINT, body))?.data
      ?.function_id;
    console.log("FUNCTION ID: ", function_id);
    return function_id;
  } catch (error) {
    console.log(error);
  }
}

deploy();