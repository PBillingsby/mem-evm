import { NextRequest, NextResponse } from "next/server";
let functionId = "gK-A95gyEVdvb6PYp41ertOeId2PvNG5Zlvu0VtBFOQ" // replace with your function id

export const GET = async (_request: NextRequest) => {
  try {
    const response = await fetch(`https://api.mem.tech/api/state/${functionId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const responseText = await response.text();
    let result = null;

    if (responseText) {
      result = JSON.parse(responseText);
    }

    return NextResponse.json(
      {
        data: result,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error(err);
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
  const body = await req.json();

  try {
    const response = await fetch("https://api.mem.tech/api/transactions", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        functionId: functionId,
        inputs: [{ "input": body }]
      }),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const result = await response.json();

    return NextResponse.json(
      {
        data: result,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error(err);
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
