import { ResponseDto } from '../navigation/dto/response'

type ResponseBody<T> = T | ResponseDto | null

export type { ResponseBody }
