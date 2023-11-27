type Handle = () => Promise<string>
const fullname = 'Ha Minh Chi'
const person: { name: string } = { name: fullname }
const handle: Handle = () => Promise.resolve(fullname)
// console.log(fullname)
handle().then(console.log)
