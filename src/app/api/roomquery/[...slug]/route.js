import roomsData from "@/data/roomsData.json";

export async function GET(
  request,
  { params } /* : { params: { id: string } } */
) {
  const slug = params.slug;
  const id = slug[0];
  const wannashow = slug[1];

  console.log(id, wannashow);
  const rooms /* Array */ = roomsData.Room;
  const found = rooms.find((eachRoom) => eachRoom.id === parseInt(id));
  console.log(found);
  console.log(found[wannashow]);

  return Response.json({ data: found[wannashow] });
}
