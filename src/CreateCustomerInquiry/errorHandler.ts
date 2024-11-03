function handleError(context: any, status: number, message: string) {
  context.res = {
    status: status,
    body: message,
  }
}
export default handleError
