export default function () {
  return {
    token: localStorage.getItem('jwt-token')
  }
}
