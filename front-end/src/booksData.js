const booksData = [
  {
    "id": "1",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "description": "A story about the American dream and the downfall of those who attempt to reach its illusory goals. Set in the 1920s, the novel follows Jay Gatsby's obsessive love for Daisy Buchanan.",
    "rating": 4.5,
    "imageUrl": "https://m.media-amazon.com/images/M/MV5BODRjYWRiNzEtZjYzMy00Y2YxLTg2MjUtZTBmNGVjYmQ5ZGYzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
  },
  {
    "id": "2",
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "description": "A young girl named Scout Finch learns valuable lessons about race, justice, and morality when her father, a lawyer, defends a black man accused of raping a white woman in the Deep South.",
    "rating": 4.8,
    "imageUrl": "https://m.media-amazon.com/images/M/MV5BZTlkYWU4MGEtZmQyYi00OWEzLTgzY2EtYzVjOTEzYzAyNTk1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
  },
  {
    "id": "3",
    "title": "1984",
    "author": "George Orwell",
    "description": "In a totalitarian society controlled by the Party, Winston Smith tries to rebel against the oppressive regime led by Big Brother. The novel explores themes of surveillance, censorship, and individual freedom.",
    "rating": 4.7,
    "imageUrl": "https://anylang.net/sites/default/files/styles/book_image/public/covers/1984.jpg?itok=IVpqqKj5"
  },
  {
    "id": "4",
    "title": "Moby Dick",
    "author": "Herman Melville",
    "description": "A riveting tale of obsession, Captain Ahab sets sail on a dangerous journey to capture the elusive white whale, Moby Dick, with whom he has an unresolved personal conflict.",
    "rating": 4.2,
    "imageUrl": "https://m.media-amazon.com/images/I/610qaD5PskL.jpg"
  },
  {
    "id": "5",
    "title": "Pride and Prejudice",
    "author": "Jane Austen",
    "description": "Elizabeth Bennet, a young woman in Regency-era England, navigates the intricacies of social expectations, love, and family, particularly in her relationship with the proud Mr. Darcy.",
    "rating": 4.6,
    "imageUrl": "https://shop.bbc.com/cdn/shop/products/Pride_Prejudice_DVD_BD_combo.jpg?v=1727619570"
  },
  {
    "id": "6",
    "title": "Brave New World",
    "author": "Aldous Huxley",
    "description": "In a futuristic society where people are genetically engineered and controlled by the government, Bernard Marx tries to break free from societal restrictions, challenging the status quo.",
    "rating": 4.3,
    "imageUrl": "https://images.penguinrandomhouse.com/cover/9780060850524"
  },
  {
    "id": "7",
    "title": "Frankenstein",
    "author": "Mary Shelley",
    "description": "A scientist, Victor Frankenstein, creates a creature from body parts, but the monster turns into a tragic figure seeking revenge after being abandoned by his creator.",
    "rating": 4.5,
    "imageUrl": "https://m.media-amazon.com/images/M/MV5BNDhjNjgxN2EtZGIxZC00NDQzLThmOWMtZDgwNmYwZDQ3MzZiXkEyXkFqcGc@._V1_.jpg"
  },
  {
    "id": "8",
    "title": "Jane Eyre",
    "author": "Charlotte Brontë",
    "description": "A young orphan, Jane Eyre, faces numerous challenges before finding love with the mysterious Mr. Rochester. The novel explores themes of independence, morality, and social class.",
    "rating": 4.4,
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyG5qzgml0oEqSYbKtcaeIr18WDTauy5CWuQ&s"
  },
  {
    "id": "9",
    "title": "The Catcher in the Rye",
    "author": "J.D. Salinger",
    "description": "A young man named Holden Caulfield narrates his story of alienation, identity struggles, and the search for truth in a world he feels disconnected from.",
    "rating": 4.0,
    "imageUrl": "https://manhattanrarebooks.cdn.bibliopolis.com/pictures/1918.jpg?auto=webp&v=1497282947"
  },
  {
    "id": "10",
    "title": "The Odyssey",
    "author": "Homer",
    "description": "The epic journey of Odysseus as he travels home after the Trojan War. Along the way, he faces numerous challenges and temptations while trying to reunite with his wife and son.",
    "rating": 4.6,
    "imageUrl": "https://prodimage.images-bn.com/pimages/9781435163102_p1_v3_s600x595.jpg"
  },
  {
    "id": "11",
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "description": "Bilbo Baggins, a hobbit, is swept into an adventure to reclaim treasure guarded by the dragon Smaug. Along the way, he learns about bravery, friendship, and the complexity of good and evil.",
    "rating": 4.7,
    "imageUrl": "https://d3ddkgxe55ca6c.cloudfront.net/assets/t1496538667/a/af/64/147470-ml-1141823.jpg"
  },
  {
    "id": "12",
    "title": "The Lord of the Rings",
    "author": "J.R.R. Tolkien",
    "description": "Frodo Baggins embarks on a perilous journey to destroy the One Ring and save Middle-earth from the power of Sauron. This epic tale explores friendship, sacrifice, and the struggle between good and evil.",
    "rating": 4.9,
    "imageUrl": "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p28828_p_v8_ao.jpg"
  },
  {
    "id": "13",
    "title": "The Chronicles of Narnia",
    "author": "C.S. Lewis",
    "description": "A series of adventures in the magical land of Narnia, where children encounter mystical creatures and fight to save the world from the evil White Witch.",
    "rating": 4.8,
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ2mMSmME7MirlBQrV877OEIe6BHO1mq5Q7g&s"
  },
  {
    "id": "14",
    "title": "The Kite Runner",
    "author": "Khaled Hosseini",
    "description": "A story of friendship, betrayal, and redemption set against the backdrop of Afghanistan's political upheaval. Amir seeks forgiveness from his childhood friend Hassan for a past wrong.",
    "rating": 4.7,
    "imageUrl": "https://miro.medium.com/v2/resize:fit:1400/1*DanxK6MUuQsdfId-quhb-g.jpeg"
  },
  {
    "id": "15",
    "title": "The Book Thief",
    "author": "Markus Zusak",
    "description": "During World War II, young Liesel steals books to cope with the horrors of Nazi Germany. Narrated by Death, the novel reveals themes of love, loss, and the power of words.",
    "rating": 4.6,
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt8tDgl0H5vUkwpYd6WQyBvLFkdoAwka22JA&s"
  },
  {
    "id": "16",
    "title": "The Hunger Games",
    "author": "Suzanne Collins",
    "description": "In a dystopian future, Katniss Everdeen volunteers for a deadly competition to save her sister. As she struggles to survive, she becomes a symbol of resistance against the oppressive Capitol.",
    "rating": 4.3,
    "imageUrl": "https://m.media-amazon.com/images/I/71WSzS6zvCL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    "id": "17",
    "title": "The Alchemist",
    "author": "Paulo Coelho",
    "description": "A young shepherd named Santiago travels across the desert in search of treasure. Along the way, he learns valuable life lessons about pursuing one's dreams and listening to one's heart.",
    "rating": 4.4,
    "imageUrl": "https://junealholder.blog/wp-content/uploads/2019/05/img_20190505_155026_731-1.jpg?w=1200"
  },
  {
    "id": "18",
    "title": "The Shining",
    "author": "Stephen King",
    "description": "Jack Torrance, a winter caretaker at an isolated hotel, slowly descends into madness due to the supernatural forces haunting the hotel, threatening his family in the process.",
    "rating": 4.5,
    "imageUrl": "https://m.media-amazon.com/images/M/MV5BNmM5ZThhY2ItOGRjOS00NzZiLWEwYTItNDgyMjFkOTgxMmRiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
  },
  {
    "id": "19",
    "title": "The Picture of Dorian Gray",
    "author": "Oscar Wilde",
    "description": "Dorian Gray, a young man of beauty and charm, remains youthful while a portrait of him ages and bears the weight of his sins, exploring themes of vanity and moral corruption.",
    "rating": 4.4,
    "imageUrl": "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781625587534/the-picture-of-dorian-gray-9781625587534_hr.jpg"
  },
  {
    "id": "20",
    "title": "Animal Farm",
    "author": "George Orwell",
    "description": "In this allegorical novella, farm animals overthrow their human master and establish their own government, only to see their ideals corrupted by power and greed.",
    "rating": 4.6,
    "imageUrl": "https://m.media-amazon.com/images/I/91Lbhwt5RzL._AC_UF1000,1000_QL80_.jpg"
  }
];
export default booksData;