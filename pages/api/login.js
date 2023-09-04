export default async function handler(req, res) {
    const { username,password } = req.headers; // Use req.query to get query parameters from the URL
    if(username==undefined || password==undefined){
      return res.status(200).json({ success: false });
    }
   if(username=="iamkunal9" && password=="password")
   return res.status(200).json({ success: true });
   return res.status(200).json({ success: false });
  }