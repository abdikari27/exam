const wholeMilkImg = "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop";
const matureCheddarImg = "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=300&fit=crop";
const galaApplesImg = "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop";
const sourdoughLoafImg = "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop";
const freeRangeEggsImg = "https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?w=400&h=300&fit=crop";
const wildflowerHoneyImg = "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop";
const strawberryJamImg = "https://images.unsplash.com/photo-1564750497011-ead0ce4b9448?w=400&h=300&fit=crop";
const doubleCreamImg = "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=300&fit=crop";
const carrotsImg = "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400&h=300&fit=crop";
const mixedSaladImg = "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop";
const tomatoesImg = "https://images.unsplash.com/photo-1558818498-28c1e002b655?w=400&h=300&fit=crop";
const appleJuiceImg = "https://images.unsplash.com/photo-1576673442511-7e39b6545c87?w=400&h=300&fit=crop";
const potatoesImg = "https://images.unsplash.com/photo-1518977676601-b53f82bbe075?w=400&h=300&fit=crop";
const croissantsImg = "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=400&h=300&fit=crop";
const farmButterImg = "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&h=300&fit=crop";
const asparagusImg = "https://images.unsplash.com/photo-1515471209610-dae1c92d8777?w=400&h=300&fit=crop";

export interface Producer {
  id: string;
  name: string;
  description: string;
  location: string;
  image: string;
  methods: string;
  established: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  producer: Producer;
  image: string;
  stock: number;
  unit: string;
  origin: string;
  organic: boolean;
}

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "confirmed" | "ready" | "collected" | "delivered";
  method: "collection" | "delivery";
}

export const producers: Producer[] = [
  {
    id: "p1", name: "Meadow Farm",
    description: "Family-run dairy farm producing fresh milk, cream and artisan cheeses using traditional methods.",
    location: "Greenfield Valley",
    image: "https://images.unsplash.com/photo-1527847263472-aa5338d178b8?w=400&h=300&fit=crop",
    methods: "Free-range, grass-fed cattle with no artificial hormones or antibiotics.",
    established: "1987",
  },
  {
    id: "p2", name: "Orchard Lane",
    description: "Specialist fruit grower providing seasonal apples, pears, plums and soft fruits.",
    location: "Hillside Estate",
    image: "https://images.unsplash.com/photo-1474564862106-1f23d10b9d72?w=400&h=300&fit=crop",
    methods: "Integrated pest management with minimal chemical use. Hand-picked at peak ripeness.",
    established: "2003",
  },
  {
    id: "p3", name: "Greenfield Bakery",
    description: "Artisan bakery creating sourdough breads, pastries and cakes using locally sourced flour.",
    location: "Greenfield Town Centre",
    image: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400&h=300&fit=crop",
    methods: "Slow fermentation processes. All ingredients sourced within 30 miles.",
    established: "2015",
  },
  {
    id: "p4", name: "River Valley Eggs",
    description: "Free-range egg producer with happy hens roaming across open pastures.",
    location: "River Valley",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop",
    methods: "Fully free-range. Hens fed on natural grain mix with no artificial additives.",
    established: "2010",
  },
  {
    id: "p5", name: "Wildflower Honey Co.",
    description: "Small-batch honey producer maintaining hives across local wildflower meadows.",
    location: "Greenfield Meadows",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=300&fit=crop",
    methods: "Natural beekeeping. No heat treatment to preserve enzymes and nutrients.",
    established: "2018",
  },
  {
    id: "p6", name: "Greenfield Growers",
    description: "Community vegetable growers cultivating seasonal vegetables using sustainable methods.",
    location: "Greenfield Allotments",
    image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=400&h=300&fit=crop",
    methods: "No-dig raised beds with organic compost. Crop rotation and companion planting.",
    established: "2012",
  },
];

export const products: Product[] = [
  {
    id: "prod1", name: "Whole Milk", description: "Fresh whole milk from grass-fed cows, delivered daily.",
    price: 1.80, category: "Dairy", producer: producers[0], image: wholeMilkImg,
    stock: 45, unit: "per litre", origin: "Meadow Farm, Greenfield Valley", organic: true,
  },
  {
    id: "prod2", name: "Mature Cheddar", description: "Aged for 12 months for a rich, sharp flavour.",
    price: 5.50, category: "Dairy", producer: producers[0], image: matureCheddarImg,
    stock: 20, unit: "per 300g block", origin: "Meadow Farm, Greenfield Valley", organic: true,
  },
  {
    id: "prod3", name: "Gala Apples", description: "Crisp and sweet seasonal apples, hand-picked from the orchard.",
    price: 2.20, category: "Fruit", producer: producers[1], image: galaApplesImg,
    stock: 60, unit: "per kg", origin: "Orchard Lane, Hillside Estate", organic: false,
  },
  {
    id: "prod4", name: "Sourdough Loaf", description: "Slow-fermented sourdough with a crispy crust and soft crumb.",
    price: 3.50, category: "Bakery", producer: producers[2], image: sourdoughLoafImg,
    stock: 15, unit: "per loaf", origin: "Greenfield Bakery, Town Centre", organic: true,
  },
  {
    id: "prod5", name: "Free-Range Eggs", description: "Large free-range eggs from pasture-roaming hens.",
    price: 3.00, category: "Eggs", producer: producers[3], image: freeRangeEggsImg,
    stock: 30, unit: "per dozen", origin: "River Valley", organic: true,
  },
  {
    id: "prod6", name: "Wildflower Honey", description: "Raw wildflower honey with complex floral notes.",
    price: 6.50, category: "Preserves", producer: producers[4], image: wildflowerHoneyImg,
    stock: 12, unit: "per 340g jar", origin: "Greenfield Meadows", organic: true,
  },
  {
    id: "prod7", name: "Strawberry Jam", description: "Made with summer strawberries and raw cane sugar.",
    price: 4.00, category: "Preserves", producer: producers[1], image: strawberryJamImg,
    stock: 25, unit: "per 300g jar", origin: "Orchard Lane, Hillside Estate", organic: false,
  },
  {
    id: "prod8", name: "Double Cream", description: "Rich double cream perfect for desserts and cooking.",
    price: 2.50, category: "Dairy", producer: producers[0], image: doubleCreamImg,
    stock: 18, unit: "per 300ml", origin: "Meadow Farm, Greenfield Valley", organic: true,
  },
  {
    id: "prod9", name: "Bunched Carrots", description: "Sweet, crunchy carrots pulled fresh from the soil.",
    price: 1.60, category: "Vegetables", producer: producers[5], image: carrotsImg,
    stock: 40, unit: "per bunch", origin: "Greenfield Allotments", organic: true,
  },
  {
    id: "prod10", name: "Mixed Salad Leaves", description: "A vibrant mix of lettuce, rocket and baby spinach.",
    price: 2.00, category: "Vegetables", producer: producers[5], image: mixedSaladImg,
    stock: 22, unit: "per bag", origin: "Greenfield Allotments", organic: true,
  },
  {
    id: "prod11", name: "Vine Tomatoes", description: "Sun-ripened tomatoes grown in our polytunnels.",
    price: 2.80, category: "Vegetables", producer: producers[5], image: tomatoesImg,
    stock: 35, unit: "per 500g", origin: "Greenfield Allotments", organic: true,
  },
  {
    id: "prod12", name: "Apple Juice", description: "Fresh-pressed juice from heritage apple varieties.",
    price: 3.20, category: "Drinks", producer: producers[1], image: appleJuiceImg,
    stock: 28, unit: "per 750ml bottle", origin: "Orchard Lane, Hillside Estate", organic: false,
  },
  {
    id: "prod13", name: "New Potatoes", description: "Earthy new potatoes, perfect boiled with butter and mint.",
    price: 1.90, category: "Vegetables", producer: producers[5], image: potatoesImg,
    stock: 50, unit: "per kg", origin: "Greenfield Allotments", organic: true,
  },
  {
    id: "prod14", name: "Butter Croissants", description: "Flaky, golden croissants made with local farm butter.",
    price: 2.80, category: "Bakery", producer: producers[2], image: croissantsImg,
    stock: 10, unit: "pack of 3", origin: "Greenfield Bakery, Town Centre", organic: false,
  },
  {
    id: "prod15", name: "Farm Butter", description: "Hand-churned salted butter from grass-fed cows.",
    price: 3.80, category: "Dairy", producer: producers[0], image: farmButterImg,
    stock: 16, unit: "per 250g block", origin: "Meadow Farm, Greenfield Valley", organic: true,
  },
  {
    id: "prod16", name: "Fresh Asparagus", description: "Seasonal British asparagus, tender and flavourful.",
    price: 3.50, category: "Vegetables", producer: producers[5], image: asparagusImg,
    stock: 8, unit: "per bunch", origin: "Greenfield Allotments", organic: true,
  },
];

export const sampleOrders: Order[] = [
  {
    id: "ORD-001", date: "2026-03-20", status: "delivered", method: "delivery", total: 15.30,
    items: [
      { product: products[0], quantity: 2 },
      { product: products[3], quantity: 1 },
      { product: products[5], quantity: 1 },
    ],
  },
  {
    id: "ORD-002", date: "2026-03-25", status: "ready", method: "collection", total: 8.70,
    items: [
      { product: products[2], quantity: 2 },
      { product: products[4], quantity: 1 },
    ],
  },
];

export const categories = ["All", "Dairy", "Fruit", "Vegetables", "Bakery", "Eggs", "Preserves", "Drinks"];
