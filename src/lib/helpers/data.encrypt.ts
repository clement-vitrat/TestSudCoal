'use client'

export async function storeEncryptedData(
  key: string,
  data: object
): Promise<void> {
  const encryptionKey = await generateKey()
  const encryptedData = await encrypt(encryptionKey, JSON.stringify(data))
  localStorage.setItem(key, encryptedData)
}

export async function getDecryptedData(key: string): Promise<object | null> {
  const encryptedData = localStorage.getItem(key)
  if (!encryptedData) {
    return null
  }
  const encryptionKey = await generateKey()
  const decryptedData = await decrypt(encryptionKey, encryptedData)
  return JSON.parse(decryptedData)
}

type EncryptionKey = CryptoKey & { algorithm: { name: string } }

async function generateKey(): Promise<EncryptionKey> {
  if (
    typeof window !== 'undefined' &&
    'crypto' in window &&
    'subtle' in window.crypto
  ) {
    let key = await getKeyFromDB()
    if (key) {
      return key
    }
    key = (await window.crypto.subtle.generateKey(
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    )) as EncryptionKey
    await setKeyInDB(key)
    return key
  }
  throw new Error('Web Crypto API is not supported in this environment.')
}

async function encrypt(key: EncryptionKey, data: string): Promise<string> {
  if (
    typeof window !== 'undefined' &&
    'crypto' in window &&
    'subtle' in window.crypto
  ) {
    const dataBuffer = new TextEncoder().encode(data)
    const iv = window.crypto.getRandomValues(new Uint8Array(12))
    const encryptedBuffer = await window.crypto.subtle.encrypt(
      { name: key.algorithm.name, iv },
      key,
      dataBuffer
    )
    const combinedBuffer = new Uint8Array(
      iv.length + encryptedBuffer.byteLength
    )
    combinedBuffer.set(iv, 0)
    combinedBuffer.set(new Uint8Array(encryptedBuffer), iv.length)
    return btoa(String.fromCharCode.apply(null, Array.from(combinedBuffer)))
  }
  throw new Error('Web crypto API is not supported in this environment')
}

async function decrypt(key: EncryptionKey, data: string): Promise<string> {
  if (
    typeof window !== 'undefined' &&
    'crypto' in window &&
    'subtle' in window.crypto
  ) {
    const combinedBuffer = new Uint8Array(
      atob(data)
        .split('')
        .map(c => c.charCodeAt(0))
    )
    const iv = combinedBuffer.slice(0, 12)
    const encryptedBuffer = combinedBuffer.slice(12)
    try {
      const decryptedBuffer = await window.crypto.subtle.decrypt(
        { name: key.algorithm.name, iv: iv },
        key,
        new Uint8Array(
          encryptedBuffer.buffer,
          encryptedBuffer.byteOffset,
          encryptedBuffer.byteLength
        )
      )
      return new TextDecoder().decode(new Uint8Array(decryptedBuffer))
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  throw new Error('Web crypto API is not supported in this environment')
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('encryption', 1)
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
    request.onupgradeneeded = () => {
      request.result.createObjectStore('keys')
    }
  })
}

async function getKeyFromDB(): Promise<EncryptionKey | undefined> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('keys', 'readonly')
    const store = transaction.objectStore('keys')
    const request = store.get('encryptionKey')
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result as EncryptionKey)
  })
}

async function setKeyInDB(key: EncryptionKey): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('keys', 'readwrite')
    const store = transaction.objectStore('keys')
    const request = store.put(key, 'encryptionKey')
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve()
  })
}
