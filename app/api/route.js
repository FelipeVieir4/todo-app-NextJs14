import Cors from 'cors';
import { ConnectDB } from "@/lib/config/db";
import TodoModel from "@/lib/config/models/TodoModel";
import { NextResponse } from "next/server";

// Inicializa o middleware CORS
const cors = Cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: '*', // Defina a origem permitida. Use '*' para permitir todas as origens.
  });

const LoadDB = async () => {
    await ConnectDB()
}

LoadDB()

export async function GET(request) {
    const todos = await TodoModel.find({})
    return NextResponse.json({ todos })
}

export async function POST(request) {
    const { title, description } = await request.json();

    if (title === '' || description === '') {
        return NextResponse.json('Title and description are required', { status: 400 });
    }

    try {
        await TodoModel.create({ title, description });
        return NextResponse.json("Todo Created", { status: 200 });
    } catch (error) {
        return NextResponse.json(error.message, { status: 500 });
    }
}

export async function DELETE(request) {
    const mongoId = await request.nextUrl.searchParams.get('mongoId');

    if (!mongoId) {
        return NextResponse.json('Mongo ID is required', { status: 400 });
    }

    try {
        await TodoModel.findByIdAndDelete(mongoId);
        return NextResponse.json('Todo Deleted', { status: 200 });
    } catch (error) {
        return NextResponse.json(error.message, { status: 500 });

    }

}
export async function PUT(request) {
    const mongoId = await request.nextUrl.searchParams.get('mongoId');
    if (!mongoId) {
        return NextResponse.json('Mongo ID is required', { status: 400 });
    }

    try {
        await TodoModel.findByIdAndUpdate(mongoId, {
            $set: {
                isCompleted: true
            }
        });
        return NextResponse.json('Todo Updated', { status: 200 });
    } catch (error) {
        return NextResponse.json(error.message, { status: 500 });
    }
}
