const RandomNumber = (length, maximum = false) => {
  if (maximum)
    return Math.floor(Math.random() * length)
  else
    return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1))
}

export default RandomNumber;