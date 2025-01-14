const express = require('express');
const cors = require('cors'); // CORS modulini import qilish
const app = express();

app.use(cors()); // CORSni barcha so'rovlar uchun yoqish

app.use(express.json());

const books = [
  { id: 1, title: 'Book 1', author: 'Author 1' },
  { id: 2, title: 'Book 2', author: 'Author 2' },
  { id: 3, title: 'Book 3', author: 'Author 3' },
  { id: 4, title: 'Book 4', author: 'Author 4' }
];

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.get('/api/books', (req, res) => {
  res.send(books);
});

app.post('/api/books', (req, res) => {
  const newbook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
  };
  books.push(newbook);
  res.status(201).send(newbook);
});

app.delete('/api/books/:id', (req, res) => {
  const bookIndex = books.findIndex((item) => item.id === parseInt(req.params.id));
  if (bookIndex === -1) {
    return res.status(404).send("Kitob mavjud emas");
  }

  // O'chirilgan kitobni qaytarish
  const deletedBook = books.splice(bookIndex, 1)[0]; // Kitobni olib tashlash va o'chirilgan kitobni saqlash
  res.status(200).send(deletedBook); // O'chirilgan kitobni qaytarish
});


app.get('/api/books/:id', (req, res) => {
  const bookid = books.find((item) => item.id === parseInt(req.params.id));
  if (!bookid) {
    return res.status(404).send("Kitob mavjud emas");
  }
  res.send(bookid);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
