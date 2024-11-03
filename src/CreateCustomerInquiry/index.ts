import mainHandler from './mainHandler'

export default async function (context: any, req: any) {
  await mainHandler(context, req)
}
