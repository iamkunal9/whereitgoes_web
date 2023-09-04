// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var Whereitgoes = require("whereitgoes");
var whereitgoes = new Whereitgoes();
export default async function handler(req, res) {
  const { url } = req.query; // Use req.query to get query parameters from the URL
  console.log(url)
  if(url==undefined){
    return res.status(500).json({ error: "Nops" });
  }
  try {
    var json = await whereitgoes.getredirect(url);
    res.status(200).json({ json }); // Sending the final URL in the response
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}
