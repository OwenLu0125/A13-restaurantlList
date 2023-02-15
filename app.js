// 載入 express 
const express = require('express')
const app = express()

// 載入 express-handlebars
const exphbs = require('express-handlebars')

// 載入 餐廳 jason 資料
const restaurantsData = require('./restaurant.json').results

// 設置連接埠號
const port = 3000

// 設置樣板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設置靜態檔案
app.use(express.static('public'))

// 以下開始進行路由器設定 //
app.get('/', (req, res) => {
  res.render('index', { restaurantsData })
})

app.get('/restaurants/:restaurantId', (req, res) => {
  const { restaurantId } = req.params
  const restaurantData = restaurantsData.find(
    (data) => data.id === Number(restaurantId)

  )
  res.render('show', { restaurantData })
})

// 關於搜尋功能的路由器設定
app.get('/search', (req, res) => {
  if (!req.query.keywords) {
    return res.redirect('/')
  }

  const keywords = req.query.keywords
  const keyword = req.query.keywords.trim().toLowerCase()

  const filterRestaurantsData = restaurantsData.filter(
    (data) =>
      data.name.toLowerCase().includes(keyword) ||
      data.category.includes(keyword)
  )

  res.render('index', { restaurantsData: filterRestaurantsData, keywords })
})
// 伺服器監聽器
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
