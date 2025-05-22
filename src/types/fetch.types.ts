type Ok<T = undefined> = { type: 'ok'; data: T }
type Err = { type: 'error'; message: string }
export type Result<T = undefined> = Ok<T> | Err
