import crypto from 'crypto'

const KEY = '165294fb-3d43-469f-9ad3-b5b081a0cfcb'

export const random = () => crypto.randomBytes(128).toString('base64')
export const authentication = (salt: string, password: string) => { 
    return crypto.createHmac('sha256', [salt, password].join('/')).update(KEY).digest('hex')
 }