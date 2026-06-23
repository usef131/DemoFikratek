const getInvestors = async () => {
  try {
    const res = await axios.get('/api/users/investors')

    setInvestors(res.data.investors)
  } catch (err) {
    console.log(err)
  }
}