import roomsData from "@/data/roomsData.json";

// PATH PARAMETER
export async function GET(
  request,
  { params } /* : { params: { id: string } } */
) {
  // QUERY PARAMETER
  const { searchParams } = new URL(request.url);
  const searchid = searchParams.get("searchid");
  // console.log("searchid : ", searchid);

  const rooms /* Array */ = roomsData.Room;

  // const parsed = rooms
  //   .filter((eachRoom) => eachRoom.id === parseInt(params.id))
  //   .map((eachRoom) => ({
  //     name: eachRoom.name,
  //     description: eachRoom.description,
  //     price: eachRoom.price,
  //   }));
  const found = rooms.find((eachRoom) => eachRoom.id === parseInt(params.id));
  const parsed = {
    name: found.name,
    description: found.description,
    price: found.price,
  };

  return Response.json({ data: parsed });
}
