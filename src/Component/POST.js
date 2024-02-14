async function POST(url,data){
    try {
        
        let response = await fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        })
        response = await response.json();
        return response;
      }
      catch (error) {
        console.log(error);
      }
}
export default POST;
