import { NextResponse } from "next/server";
import database from '@/public/tasks.json'

// API route for the data request
export async function GET() {
	return NextResponse.json(database)
}