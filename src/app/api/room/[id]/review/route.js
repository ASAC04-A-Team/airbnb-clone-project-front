/**
 *
 * @param {*} roomId
 * @returns Response data
 */

export async function POST(request, { params }) {
  const formData = await request.formData()
  const body = Object.fromEntries(formData)
  const id = params.id

  const result = await fetch(`http://localhost:8080/api/review/reviewSearch/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const inner = await result.json()

  if (inner.code !== 0) {
    inner.result = []
  }
  const reviewSearchData = inner.result

  return new Response(JSON.stringify({ data: reviewSearchData }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
