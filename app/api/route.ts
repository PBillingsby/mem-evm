import axios, { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";
export const POST = async (req: NextRequest) => {
  let functionId: string = process.env.NEXT_PUBLIC_FUNCTION_ID || "";
  try {
    const body: Promise<NextRequest> = await req.json();

    const options: object = {
      input: body,
      function_id: functionId
    }

    const response: AxiosResponse = await axios.post(
      "https://mem-testnet.xyz/write",
      options,
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );

    const result: object = response.data;

    console.log("----", result)

    return NextResponse.json(
      {
        data: result,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err)
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
