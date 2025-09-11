
async function SignIn(inputData: { email: string; password: string }) {
  const res = await fetch("http://localhost:8080/api/v1/signin", {
    method: "POST",
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify(inputData)
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || 'failed to signIn!')
  }
  console.log(res.json)
  return res.json()
}


async function SignUp(inputData: { username: string, email: string, password: string }) {
  const res = await fetch("http://localhost:8080/api/v1/signup", {
    method: "POST",
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify(inputData)
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || 'failed to signUp!')
  }
  return res.json()
}
