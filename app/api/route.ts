import { NextResponse } from "next/server";
import database from '@/public/tasks.json'

export async function GET(){
	return NextResponse.json(database)
}