import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
let functionId = "mF9UkwpqDma-lHOXFqZuNw7-mS9-AzljTz7W5HqbSB8" // replace with your function id

export const GET = async (_request: NextRequest) => {
  console.log("1111111")
  try {
    const response = await axios.get(
      `https://api.mem.tech/api/state/${functionId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      }
    });

    console.log(response.data)
    if (response.status !== 200) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    try {
      return NextResponse.json(
        {
          data: response.data,
        },
        {
          status: 200,
        }
      );
    } catch (error: any) {
      throw new Error(`Failed to parse JSON: ${error.message}`);
    }
  } catch (err) {
    console.error("!!!!", err);
    return NextResponse.json(
      {
        error: err,
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const response = await axios.post(
      "https://api.mem.tech/api/transactions",
      JSON.stringify({
        functionId: functionId,
        inputs: [body]
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );

    console.log("--------", response.data.data)
    if (!response.data.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    // Assuming response.data is an object that can be parsed as JSON
    const result = response.data;

    return NextResponse.json(
      {
        data: result,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json(
      {
        error: err, // Use err.message to get the error message
      },
      {
        status: 500,
      }
    );
  }
};
