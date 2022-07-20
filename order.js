const axios = require("axios")
const app = express()
const request=require('request');
const port = 3003
const catalogServer = "http://192.168.1.167:5000"
app.get('/purchase/:id', async (req, res) => {
    try {
      const id = req.params.id;
      request(catalogServer + '/info/' + id, { json: true }, (err, response, body) => {
        if (err) {
          return res.send(err)
        }
        if (body.message) {
          return res.send({ message: 'something went worng' })
        }
        if (body.stock <= 0) {
          return res.send({ message: 'out of stock' })
        }
        const bookName = body.title
        request(
          catalogServer+ '/book/' + id + '?stock=-1',
          { json: true, method: 'PUT' },
          (err, response2, body) => {
            if (response2.statusCode == 200) {
              res.send({ message: 'thank you for your purchase. book: '+ bookName})
            } else {
              res.send({ message: 'something went wrong' })
            }
          }
        )
      })
    } catch (err) {
      console.log(err)
    }
})
app.listen(port, () => {
    console.log("Order Server is Running!")
  })

