-- Sample data so the API returns something straight away

INSERT INTO producers (id, name, description, location, image, methods, established) VALUES
('p1', 'Meadow Farm', 'Family-run dairy farm producing fresh milk, cream and artisan cheeses using traditional methods.', 'Greenfield Valley', 'https://images.unsplash.com/photo-1527847263472-aa5338d178b8?w=400&h=300&fit=crop', 'Free-range, grass-fed cattle with no artificial hormones or antibiotics.', '1987'),
('p2', 'Orchard Lane', 'Specialist fruit grower providing seasonal apples, pears, plums and soft fruits.', 'Hillside Estate', 'https://images.unsplash.com/photo-1474564862106-1f23d10b9d72?w=400&h=300&fit=crop', 'Integrated pest management with minimal chemical use. Hand-picked at peak ripeness.', '2003'),
('p3', 'Greenfield Bakery', 'Artisan bakery creating sourdough breads, pastries and cakes using locally sourced flour.', 'Greenfield Town Centre', 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400&h=300&fit=crop', 'Slow fermentation processes. All ingredients sourced within 30 miles.', '2015'),
('p4', 'River Valley Eggs', 'Free-range egg producer with happy hens roaming across open pastures.', 'River Valley', 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop', 'Fully free-range. Hens fed on natural grain mix with no artificial additives.', '2010'),
('p5', 'Wildflower Honey Co.', 'Small-batch honey producer maintaining hives across local wildflower meadows.', 'Greenfield Meadows', 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=300&fit=crop', 'Natural beekeeping. No heat treatment to preserve enzymes and nutrients.', '2018'),
('p6', 'Greenfield Growers', 'Community vegetable growers cultivating seasonal vegetables using sustainable methods.', 'Greenfield Allotments', 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=400&h=300&fit=crop', 'No-dig raised beds with organic compost. Crop rotation and companion planting.', '2012')
ON CONFLICT (id) DO NOTHING;

INSERT INTO products (id, producer_id, name, description, price_pence, category, image, stock, unit, origin, organic) VALUES
('prod1', 'p1', 'Whole Milk', 'Fresh whole milk from grass-fed cows, delivered daily.', 180, 'Dairy', 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop', 45, 'per litre', 'Meadow Farm, Greenfield Valley', true),
('prod2', 'p1', 'Mature Cheddar', 'Aged for 12 months for a rich, sharp flavour.', 550, 'Dairy', 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=300&fit=crop', 20, 'per 300g block', 'Meadow Farm, Greenfield Valley', true),
('prod3', 'p2', 'Gala Apples', 'Crisp and sweet seasonal apples, hand-picked from the orchard.', 220, 'Fruit', 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop', 60, 'per kg', 'Orchard Lane, Hillside Estate', false),
('prod4', 'p3', 'Sourdough Loaf', 'Slow-fermented sourdough with a crispy crust and soft crumb.', 350, 'Bakery', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop', 15, 'per loaf', 'Greenfield Bakery, Town Centre', true),
('prod5', 'p4', 'Free-Range Eggs', 'Large free-range eggs from pasture-roaming hens.', 300, 'Eggs', 'https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?w=400&h=300&fit=crop', 30, 'per dozen', 'River Valley', true),
('prod6', 'p5', 'Wildflower Honey', 'Raw wildflower honey with complex floral notes.', 650, 'Preserves', 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop', 12, 'per 340g jar', 'Greenfield Meadows', true)
ON CONFLICT (id) DO NOTHING;

