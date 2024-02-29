import roomsData from "@/data/roomsData.json";

// PATH PARAMETER
export async function GET(
  request,
  { params } /* : { params: { id: string } } */
) {
  const rooms /* Array */ = roomsData.Room;
  const found = rooms.find((eachRoom) => eachRoom.id === parseInt(params.id));

  return Response.json({ data: found.name });
}
