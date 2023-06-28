const User = require('../helper/user')
const KV = require('../helper/kv')

async function main() {
  const u = await User.basicAuth('admin', '3378')
  const kv = KV(u)

  // console.log(await kv.getAll())
  console.log('set LOREM_ISPUM = 123')
  console.log(await kv.set('LOREM_ISPUM', 123))

  console.log('set LOREM_ISPUM_2 = 123')
  console.log(await kv.set('LOREM_ISPUM_2', 123))

  console.log('unset LOREM_ISPUM_2 = 123')
  console.log(await kv.unset('LOREM_ISPUM_2', 123))

  console.log('assert LOREM_ISPUM = 123')
  console.log(123 === await kv.getValue('LOREM_ISPUM'))

  console.log('secret')
  console.log(await kv.set('PASSWORD', 123, true))
  console.log(123 === await kv.getValue('PASSWORD'))
}

main()

