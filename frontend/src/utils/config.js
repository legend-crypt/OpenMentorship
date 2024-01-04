

const config = (accessToken) => {
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
}
export default config;