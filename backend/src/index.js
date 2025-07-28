"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Sample data
const sampleClients = [
    { id: 1, name: 'Acme Corp', email: 'contact@acme.com', phone: '555-1234', company: 'Acme Corporation', address: '123 Business St, City, State', notes: 'Regular corporate client', createdAt: '2024-01-15' },
    { id: 2, name: 'Beta Events', email: 'info@betaevents.com', phone: '555-5678', company: 'Beta Events LLC', address: '456 Event Ave, City, State', notes: 'Event planning company', createdAt: '2024-02-20' },
    { id: 3, name: 'Gamma Group', email: 'hello@gammagroup.com', phone: '555-9012', company: 'Gamma Group Inc', address: '789 Corporate Blvd, City, State', notes: 'Tech startup', createdAt: '2024-03-10' },
];
const sampleBookings = [
    {
        id: 'BK-2001',
        clientId: 1,
        clientName: 'Acme Corp',
        date: '2024-08-15',
        startTime: '18:00',
        endTime: '23:00',
        space: 'Main Hall',
        status: 'Confirmed',
        attendees: 150,
        eventType: 'Corporate Event',
        notes: 'Annual company dinner with keynote speaker',
        createdAt: '2024-07-01',
        totalAmount: 2500,
        depositPaid: 500,
    },
    {
        id: 'BK-2002',
        clientId: 2,
        clientName: 'Beta Events',
        date: '2024-07-28',
        startTime: '14:00',
        endTime: '22:00',
        space: 'Garden Room',
        status: 'Completed',
        attendees: 80,
        eventType: 'Wedding Reception',
        notes: 'Outdoor wedding reception with catering',
        createdAt: '2024-06-15',
        totalAmount: 1800,
        depositPaid: 1800,
    },
    {
        id: 'BK-2003',
        clientId: 3,
        clientName: 'Gamma Group',
        date: '2024-07-30',
        startTime: '19:00',
        endTime: '23:00',
        space: 'Rooftop',
        status: 'Pending',
        attendees: 60,
        eventType: 'Product Launch',
        notes: 'Tech product launch with demo stations',
        createdAt: '2024-07-10',
        totalAmount: 1200,
        depositPaid: 0,
    },
];
const samplePayments = [
    { id: 'PAY-001', clientId: 2, amount: 880, method: 'Credit Card', reference: 'CC-123456', status: 'completed', date: '2024-07-15' },
    { id: 'PAY-002', clientId: 3, amount: 500, method: 'Bank Transfer', reference: 'BT-789012', status: 'completed', date: '2024-07-20' },
];
const sampleInventoryCategories = [
    { id: 1, name: 'Audio Equipment', description: 'Speakers, microphones, mixers, and audio accessories', venueId: 1, createdAt: '2024-01-15' },
    { id: 2, name: 'Lighting Equipment', description: 'Stage lights, spotlights, LED panels, and lighting accessories', venueId: 1, createdAt: '2024-01-15' },
    { id: 3, name: 'Furniture & Seating', description: 'Tables, chairs, sofas, and decorative furniture', venueId: 1, createdAt: '2024-01-15' },
    { id: 4, name: 'Catering & Kitchen', description: 'Plates, glasses, cutlery, serving equipment, and kitchen appliances', venueId: 1, createdAt: '2024-01-15' },
    { id: 5, name: 'Projection & AV', description: 'Projectors, screens, TVs, and audiovisual equipment', venueId: 1, createdAt: '2024-01-15' },
    { id: 6, name: 'Staging & Rigging', description: 'Stage platforms, risers, trussing, and rigging equipment', venueId: 1, createdAt: '2024-01-15' },
    { id: 7, name: 'Decorations & Props', description: 'Balloons, banners, centerpieces, and decorative items', venueId: 1, createdAt: '2024-01-15' },
    { id: 8, name: 'Linens & Textiles', description: 'Tablecloths, napkins, chair covers, and fabric materials', venueId: 1, createdAt: '2024-01-15' },
    { id: 9, name: 'Bar & Beverage', description: 'Glassware, bar equipment, ice machines, and beverage dispensers', venueId: 1, createdAt: '2024-01-15' },
    { id: 10, name: 'Safety & Security', description: 'Fire extinguishers, first aid kits, security cameras, and safety equipment', venueId: 1, createdAt: '2024-01-15' },
    { id: 11, name: 'Cleaning & Maintenance', description: 'Cleaning supplies, tools, and maintenance equipment', venueId: 1, createdAt: '2024-01-15' },
    { id: 12, name: 'Office & Admin', description: 'Computers, printers, office supplies, and administrative equipment', venueId: 1, createdAt: '2024-01-15' },
];
const sampleInventoryItems = [
    {
        id: 1,
        name: 'Wireless Microphone Set',
        brand: 'Shure',
        description: 'Professional wireless microphone with receiver',
        sku: 'AUD-001',
        categoryId: 1,
        categoryName: 'Audio Equipment',
        venueId: 1,
        quantity: 8,
        minQuantity: 2,
        maxQuantity: 12,
        cost: 120.00,
        rentalFees: 25.00,
        specs: 'Frequency: 2.4GHz, Range: 100m, Battery: 8 hours',
        notes: 'High demand for corporate events',
        location: 'Storage Room A',
        supplier: 'AudioPro Supplies',
        supplierContact: '555-1234',
        lastRestocked: '2024-07-01',
        status: 'active',
        reorderMark: 3,
        reorderVendor: 'AudioPro Supplies',
        createdAt: '2024-01-15',
        updatedAt: '2024-07-01',
    },
    {
        id: 2,
        name: 'PA Speaker System',
        brand: 'JBL',
        description: '1000W powered speaker system',
        sku: 'AUD-002',
        categoryId: 1,
        categoryName: 'Audio Equipment',
        venueId: 1,
        quantity: 4,
        minQuantity: 2,
        maxQuantity: 6,
        cost: 650.00,
        rentalFees: 150.00,
        specs: 'Power: 1000W, Frequency: 50Hz-20kHz, Weight: 25kg',
        notes: 'Used for large events and outdoor functions',
        location: 'Storage Room A',
        supplier: 'AudioPro Supplies',
        supplierContact: '555-1234',
        lastRestocked: '2024-06-15',
        status: 'active',
        reorderMark: 3,
        reorderVendor: 'AudioPro Supplies',
        createdAt: '2024-01-15',
        updatedAt: '2024-06-15',
    },
    {
        id: 3,
        name: 'LED Stage Light',
        brand: 'Chauvet',
        description: 'RGB LED stage light with remote control',
        sku: 'LGT-001',
        categoryId: 2,
        categoryName: 'Lighting',
        venueId: 1,
        quantity: 12,
        minQuantity: 4,
        maxQuantity: 20,
        cost: 95.00,
        rentalFees: 20.00,
        specs: 'Power: 50W, Colors: 16.7M, Beam: 25 degrees',
        notes: 'Popular for weddings and parties',
        location: 'Storage Room B',
        supplier: 'LightTech Solutions',
        supplierContact: '555-5678',
        lastRestocked: '2024-07-10',
        status: 'active',
        reorderMark: 6,
        reorderVendor: 'LightTech Solutions',
        createdAt: '2024-01-15',
        updatedAt: '2024-07-10',
    },
    {
        id: 4,
        name: 'Round Table (6ft)',
        brand: 'EventPro',
        description: 'Round table seating 8-10 people',
        sku: 'FUR-001',
        categoryId: 3,
        categoryName: 'Furniture',
        venueId: 1,
        quantity: 15,
        minQuantity: 5,
        maxQuantity: 25,
        cost: 150.00,
        rentalFees: 35.00,
        specs: 'Diameter: 6ft, Material: Wood, Weight: 45kg',
        notes: 'Some tables have minor scratches',
        location: 'Storage Room C',
        supplier: 'Furniture World',
        supplierContact: '555-9012',
        lastRestocked: '2024-06-20',
        status: 'active',
        reorderMark: 8,
        reorderVendor: 'Furniture World',
        createdAt: '2024-01-15',
        updatedAt: '2024-06-20',
    },
    {
        id: 5,
        name: 'Champagne Glass',
        brand: 'Libbey',
        description: 'Crystal champagne flute',
        sku: 'CAT-001',
        categoryId: 4,
        categoryName: 'Catering Supplies',
        venueId: 1,
        quantity: 200,
        minQuantity: 50,
        maxQuantity: 300,
        cost: 6.50,
        rentalFees: 2.00,
        specs: 'Capacity: 6oz, Material: Crystal, Dishwasher safe',
        notes: 'Handle with care - fragile items',
        location: 'Storage Room D',
        supplier: 'Catering Plus',
        supplierContact: '555-3456',
        lastRestocked: '2024-07-05',
        status: 'active',
        reorderMark: 75,
        reorderVendor: 'Catering Plus',
        createdAt: '2024-01-15',
        updatedAt: '2024-07-05',
    },
    {
        id: 6,
        name: 'Projector Screen (10ft)',
        brand: 'Elite Screens',
        description: 'Retractable projector screen for presentations',
        sku: 'AV-001',
        categoryId: 5,
        categoryName: 'Projection & AV',
        venueId: 1,
        quantity: 3,
        minQuantity: 1,
        maxQuantity: 5,
        cost: 280.00,
        rentalFees: 75.00,
        specs: 'Size: 10ft diagonal, Aspect: 16:9, Material: Matte white',
        notes: 'One screen has minor crease',
        location: 'Storage Room A',
        supplier: 'AV Solutions',
        supplierContact: '555-7890',
        lastRestocked: '2024-05-10',
        status: 'active',
        reorderMark: 2,
        reorderVendor: 'AV Solutions',
        createdAt: '2024-01-15',
        updatedAt: '2024-05-10',
    },
    {
        id: 7,
        name: 'Spotlight (500W)',
        brand: 'Altman',
        description: 'Professional spotlight for stage lighting',
        sku: 'LGT-002',
        categoryId: 2,
        categoryName: 'Lighting',
        venueId: 1,
        quantity: 8,
        minQuantity: 3,
        maxQuantity: 15,
        cost: 145.00,
        rentalFees: 30.00,
        specs: 'Power: 500W, Beam: Adjustable 15-45 degrees',
        notes: 'High heat output - requires cooling time',
        location: 'Storage Room B',
        supplier: 'LightTech Solutions',
        supplierContact: '555-5678',
        lastRestocked: '2024-06-25',
        status: 'active',
        reorderMark: 5,
        reorderVendor: 'LightTech Solutions',
        createdAt: '2024-01-15',
        updatedAt: '2024-06-25',
    },
    {
        id: 8,
        name: 'Folding Chair',
        brand: 'Cosco',
        description: 'Standard folding chair for events',
        sku: 'FUR-002',
        categoryId: 3,
        categoryName: 'Furniture',
        venueId: 1,
        quantity: 100,
        minQuantity: 20,
        maxQuantity: 150,
        cost: 18.00,
        rentalFees: 5.00,
        specs: 'Weight capacity: 300lbs, Material: Steel frame, Fabric seat',
        notes: 'Some chairs need repair',
        location: 'Storage Room C',
        supplier: 'Furniture World',
        supplierContact: '555-9012',
        lastRestocked: '2024-07-15',
        status: 'active',
        reorderMark: 30,
        reorderVendor: 'Furniture World',
        createdAt: '2024-01-15',
        updatedAt: '2024-07-15',
    },
    {
        id: 9,
        name: 'Dinner Plate Set',
        brand: 'Corelle',
        description: 'Elegant dinner plates for formal events',
        sku: 'CAT-002',
        categoryId: 4,
        categoryName: 'Catering Supplies',
        venueId: 1,
        quantity: 150,
        minQuantity: 30,
        maxQuantity: 200,
        cost: 9.00,
        rentalFees: 3.00,
        specs: 'Size: 10.5 inch, Material: Vitrelle glass, Dishwasher safe',
        notes: 'Premium quality for upscale events',
        location: 'Storage Room D',
        supplier: 'Catering Plus',
        supplierContact: '555-3456',
        lastRestocked: '2024-07-08',
        status: 'active',
        reorderMark: 50,
        reorderVendor: 'Catering Plus',
        createdAt: '2024-01-15',
        updatedAt: '2024-07-08',
    },
    {
        id: 10,
        name: 'Sound Mixer',
        brand: 'Behringer',
        description: '8-channel audio mixer for live events',
        sku: 'AUD-003',
        categoryId: 1,
        categoryName: 'Audio Equipment',
        venueId: 1,
        quantity: 2,
        minQuantity: 1,
        maxQuantity: 3,
        cost: 350.00,
        rentalFees: 80.00,
        specs: 'Channels: 8, Phantom power: Yes, USB interface: Yes',
        notes: 'Requires trained operator',
        location: 'Storage Room A',
        supplier: 'AudioPro Supplies',
        supplierContact: '555-1234',
        lastRestocked: '2024-04-20',
        status: 'active',
        reorderMark: 2,
        reorderVendor: 'AudioPro Supplies',
        createdAt: '2024-01-15',
        updatedAt: '2024-04-20',
    },
    {
        id: 11,
        name: 'Fog Machine',
        brand: 'Antari',
        description: 'Professional fog machine for special effects',
        sku: 'LGT-003',
        categoryId: 2,
        categoryName: 'Lighting',
        venueId: 1,
        quantity: 1,
        minQuantity: 1,
        maxQuantity: 2,
        cost: 220.00,
        rentalFees: 45.00,
        specs: 'Output: 2000 cu ft/min, Tank: 1L, Heat up: 3 minutes',
        notes: 'Use only approved fog fluid',
        location: 'Storage Room B',
        supplier: 'LightTech Solutions',
        supplierContact: '555-5678',
        lastRestocked: '2024-03-15',
        status: 'active',
        reorderMark: 1,
        reorderVendor: 'LightTech Solutions',
        createdAt: '2024-01-15',
        updatedAt: '2024-03-15',
    },
    {
        id: 12,
        name: 'Bar Stool',
        brand: 'Winsome',
        description: 'Modern bar stool for cocktail areas',
        sku: 'FUR-003',
        categoryId: 3,
        categoryName: 'Furniture',
        venueId: 1,
        quantity: 25,
        minQuantity: 5,
        maxQuantity: 40,
        cost: 55.00,
        rentalFees: 15.00,
        specs: 'Height: 30 inch, Weight capacity: 250lbs, Material: Wood',
        notes: 'Popular for cocktail receptions',
        location: 'Storage Room C',
        supplier: 'Furniture World',
        supplierContact: '555-9012',
        lastRestocked: '2024-06-10',
        status: 'active',
        reorderMark: 8,
        reorderVendor: 'Furniture World',
        createdAt: '2024-01-15',
        updatedAt: '2024-06-10',
    },
    {
        id: 13,
        name: 'Wine Glass Set',
        brand: 'Riedel',
        description: 'Premium wine glasses for events',
        sku: 'CAT-003',
        categoryId: 4,
        categoryName: 'Catering Supplies',
        venueId: 1,
        quantity: 80,
        minQuantity: 20,
        maxQuantity: 120,
        cost: 12.00,
        rentalFees: 4.00,
        specs: 'Capacity: 12oz, Material: Crystal, Hand wash only',
        notes: 'Premium brand - handle with extreme care',
        location: 'Storage Room D',
        supplier: 'Catering Plus',
        supplierContact: '555-3456',
        lastRestocked: '2024-07-12',
        status: 'active',
        reorderMark: 25,
        reorderVendor: 'Catering Plus',
        createdAt: '2024-01-15',
        updatedAt: '2024-07-12',
    },
    {
        id: 14,
        name: 'Wireless Headset',
        brand: 'Sennheiser',
        description: 'Professional wireless headset for presenters',
        sku: 'AUD-004',
        categoryId: 1,
        categoryName: 'Audio Equipment',
        venueId: 1,
        quantity: 0,
        minQuantity: 2,
        maxQuantity: 8,
        cost: 160.00,
        rentalFees: 35.00,
        specs: 'Frequency: 2.4GHz, Range: 150m, Battery: 10 hours',
        notes: 'Out of stock - high demand',
        location: 'Storage Room A',
        supplier: 'AudioPro Supplies',
        supplierContact: '555-1234',
        lastRestocked: '2024-06-01',
        status: 'active',
        reorderMark: 4,
        reorderVendor: 'AudioPro Supplies',
        createdAt: '2024-01-15',
        updatedAt: '2024-06-01',
    },
    {
        id: 15,
        name: 'LED Strip Light',
        brand: 'Philips Hue',
        description: 'Flexible LED strip for ambient lighting',
        sku: 'LGT-004',
        categoryId: 2,
        categoryName: 'Lighting',
        venueId: 1,
        quantity: 5,
        minQuantity: 3,
        maxQuantity: 10,
        cost: 65.00,
        rentalFees: 15.00,
        specs: 'Length: 2m, Colors: 16M, Power: 24W, IP65 rated',
        notes: 'Waterproof - suitable for outdoor use',
        location: 'Storage Room B',
        supplier: 'LightTech Solutions',
        supplierContact: '555-5678',
        lastRestocked: '2024-07-18',
        status: 'active',
        reorderMark: 4,
        reorderVendor: 'LightTech Solutions',
        createdAt: '2024-01-15',
        updatedAt: '2024-07-18',
    },
    {
        id: 16,
        name: '4K Projector',
        brand: 'Epson',
        description: 'Professional 4K projector for high-quality presentations',
        sku: 'AV-002',
        categoryId: 5,
        categoryName: 'Projection & AV',
        venueId: 1,
        quantity: 2,
        minQuantity: 1,
        maxQuantity: 3,
        cost: 1200.00,
        rentalFees: 200.00,
        specs: 'Resolution: 4K, Brightness: 4000 lumens, Contrast: 100,000:1',
        notes: 'Premium equipment for corporate events',
        location: 'Storage Room A',
        supplier: 'AV Solutions',
        supplierContact: '555-7890',
        lastRestocked: '2024-06-15',
        status: 'active',
        reorderMark: 1,
        reorderVendor: 'AV Solutions',
        createdAt: '2024-01-15',
        updatedAt: '2024-06-15',
    },
    {
        id: 17,
        name: 'Stage Platform (4x8ft)',
        brand: 'StageRight',
        description: 'Modular stage platform for performances',
        sku: 'STG-001',
        categoryId: 6,
        categoryName: 'Staging & Rigging',
        venueId: 1,
        quantity: 8,
        minQuantity: 2,
        maxQuantity: 12,
        cost: 180.00,
        rentalFees: 45.00,
        specs: 'Size: 4x8ft, Height: 2ft, Weight capacity: 500lbs per panel',
        notes: 'Interlocking panels for custom configurations',
        location: 'Storage Room E',
        supplier: 'Stage Solutions',
        supplierContact: '555-2345',
        lastRestocked: '2024-05-20',
        status: 'active',
        reorderMark: 3,
        reorderVendor: 'Stage Solutions',
        createdAt: '2024-01-15',
        updatedAt: '2024-05-20',
    },
    {
        id: 18,
        name: 'Balloon Arch Kit',
        brand: 'PartyPro',
        description: 'Complete balloon arch kit for decorations',
        sku: 'DEC-001',
        categoryId: 7,
        categoryName: 'Decorations & Props',
        venueId: 1,
        quantity: 15,
        minQuantity: 5,
        maxQuantity: 25,
        cost: 25.00,
        rentalFees: 8.00,
        specs: 'Includes 50 balloons, arch frame, and helium tank',
        notes: 'Popular for birthday parties and celebrations',
        location: 'Storage Room F',
        supplier: 'Party Supplies Co',
        supplierContact: '555-4567',
        lastRestocked: '2024-07-20',
        status: 'active',
        reorderMark: 8,
        reorderVendor: 'Party Supplies Co',
        createdAt: '2024-01-15',
        updatedAt: '2024-07-20',
    },
    {
        id: 19,
        name: 'Tablecloth (Round 6ft)',
        brand: 'LinenPro',
        description: 'Premium polyester tablecloth for round tables',
        sku: 'LIN-001',
        categoryId: 8,
        categoryName: 'Linens & Textiles',
        venueId: 1,
        quantity: 30,
        minQuantity: 10,
        maxQuantity: 50,
        cost: 18.00,
        rentalFees: 6.00,
        specs: 'Size: 6ft round, Material: Polyester, Color: White',
        notes: 'Stain-resistant and wrinkle-free',
        location: 'Storage Room G',
        supplier: 'Linen World',
        supplierContact: '555-6789',
        lastRestocked: '2024-07-10',
        status: 'active',
        reorderMark: 15,
        reorderVendor: 'Linen World',
        createdAt: '2024-01-15',
        updatedAt: '2024-07-10',
    },
    {
        id: 20,
        name: 'Ice Machine',
        brand: 'Scotsman',
        description: 'Commercial ice machine for events',
        sku: 'BAR-001',
        categoryId: 9,
        categoryName: 'Bar & Beverage',
        venueId: 1,
        quantity: 1,
        minQuantity: 1,
        maxQuantity: 2,
        cost: 850.00,
        rentalFees: 120.00,
        specs: 'Capacity: 100lbs/day, Ice type: Cubed, Power: 115V',
        notes: 'Requires water connection and drainage',
        location: 'Storage Room H',
        supplier: 'Bar Equipment Plus',
        supplierContact: '555-8901',
        lastRestocked: '2024-04-15',
        status: 'active',
        reorderMark: 1,
        reorderVendor: 'Bar Equipment Plus',
        createdAt: '2024-01-15',
        updatedAt: '2024-04-15',
    },
    {
        id: 21,
        name: 'Fire Extinguisher',
        brand: 'Kidde',
        description: 'ABC fire extinguisher for venue safety',
        sku: 'SAF-001',
        categoryId: 10,
        categoryName: 'Safety & Security',
        venueId: 1,
        quantity: 12,
        minQuantity: 8,
        maxQuantity: 20,
        cost: 45.00,
        rentalFees: 0.00,
        specs: 'Type: ABC, Capacity: 5lbs, Pressure: 195 PSI',
        notes: 'Required safety equipment - not for rental',
        location: 'Storage Room I',
        supplier: 'Safety First',
        supplierContact: '555-0123',
        lastRestocked: '2024-06-01',
        status: 'active',
        reorderMark: 4,
        reorderVendor: 'Safety First',
        createdAt: '2024-01-15',
        updatedAt: '2024-06-01',
    },
    {
        id: 22,
        name: 'Vacuum Cleaner',
        brand: 'Dyson',
        description: 'Commercial vacuum cleaner for venue cleaning',
        sku: 'CLN-001',
        categoryId: 11,
        categoryName: 'Cleaning & Maintenance',
        venueId: 1,
        quantity: 3,
        minQuantity: 2,
        maxQuantity: 5,
        cost: 280.00,
        rentalFees: 0.00,
        specs: 'Type: Cordless, Battery: 60min, Capacity: 0.5L',
        notes: 'Internal use only - not for rental',
        location: 'Storage Room J',
        supplier: 'Cleaning Supplies Co',
        supplierContact: '555-3456',
        lastRestocked: '2024-05-15',
        status: 'active',
        reorderMark: 2,
        reorderVendor: 'Cleaning Supplies Co',
        createdAt: '2024-01-15',
        updatedAt: '2024-05-15',
    },
    {
        id: 23,
        name: 'Laptop (Presentation)',
        brand: 'Dell',
        description: 'Presentation laptop for events',
        sku: 'OFF-001',
        categoryId: 12,
        categoryName: 'Office & Admin',
        venueId: 1,
        quantity: 2,
        minQuantity: 1,
        maxQuantity: 3,
        cost: 650.00,
        rentalFees: 50.00,
        specs: 'Processor: i5, RAM: 8GB, Storage: 256GB SSD, OS: Windows 11',
        notes: 'Pre-loaded with presentation software',
        location: 'Office',
        supplier: 'Tech Solutions',
        supplierContact: '555-7890',
        lastRestocked: '2024-03-20',
        status: 'active',
        reorderMark: 1,
        reorderVendor: 'Tech Solutions',
        createdAt: '2024-01-15',
        updatedAt: '2024-03-20',
    },
    {
        id: 24,
        name: 'LED Video Wall Panel',
        brand: 'Samsung',
        description: '55-inch LED video wall panel for displays',
        sku: 'AV-003',
        categoryId: 5,
        categoryName: 'Projection & AV',
        venueId: 1,
        quantity: 4,
        minQuantity: 2,
        maxQuantity: 8,
        cost: 1200.00,
        rentalFees: 180.00,
        specs: 'Size: 55-inch, Resolution: 4K, Brightness: 500 nits',
        notes: 'Can be configured in video wall setup',
        location: 'Storage Room A',
        supplier: 'AV Solutions',
        supplierContact: '555-7890',
        lastRestocked: '2024-06-10',
        status: 'active',
        reorderMark: 2,
        reorderVendor: 'AV Solutions',
        createdAt: '2024-01-15',
        updatedAt: '2024-06-10',
    },
    {
        id: 25,
        name: 'Truss System (10ft)',
        brand: 'Global Truss',
        description: 'Aluminum truss system for lighting and sound',
        sku: 'STG-002',
        categoryId: 6,
        categoryName: 'Staging & Rigging',
        venueId: 1,
        quantity: 6,
        minQuantity: 2,
        maxQuantity: 10,
        cost: 320.00,
        rentalFees: 60.00,
        specs: 'Length: 10ft, Material: Aluminum, Load capacity: 500kg',
        notes: 'Professional rigging required for installation',
        location: 'Storage Room E',
        supplier: 'Stage Solutions',
        supplierContact: '555-2345',
        lastRestocked: '2024-05-25',
        status: 'active',
        reorderMark: 3,
        reorderVendor: 'Stage Solutions',
        createdAt: '2024-01-15',
        updatedAt: '2024-05-25',
    }
];
const sampleInventoryTransactions = [
    {
        id: 1,
        itemId: 1,
        itemName: 'Wireless Microphone Set',
        type: 'in',
        quantity: 4,
        previousQuantity: 4,
        newQuantity: 8,
        reason: 'Restock',
        reference: 'PO-2024-001',
        notes: 'Regular restock order',
        performedBy: 'John Manager',
        createdAt: '2024-07-01',
    },
    {
        id: 2,
        itemId: 1,
        itemName: 'Wireless Microphone Set',
        type: 'out',
        quantity: 2,
        previousQuantity: 8,
        newQuantity: 6,
        reason: 'Event usage',
        reference: 'BK-2001',
        notes: 'Used for corporate event',
        performedBy: 'Sarah Staff',
        createdAt: '2024-07-15',
    },
    {
        id: 3,
        itemId: 5,
        itemName: 'Champagne Glass',
        type: 'out',
        quantity: 50,
        previousQuantity: 200,
        newQuantity: 150,
        reason: 'Event usage',
        reference: 'BK-2002',
        notes: 'Wedding reception',
        performedBy: 'Sarah Staff',
        createdAt: '2024-07-28',
    },
];
const sampleInventoryAlerts = [
    {
        id: 1,
        itemId: 2,
        itemName: 'PA Speaker System',
        type: 'low_stock',
        message: 'PA Speaker System quantity (4) is approaching minimum threshold (2)',
        isRead: false,
        createdAt: '2024-07-20',
    },
    {
        id: 2,
        itemId: 5,
        itemName: 'Champagne Glass',
        type: 'low_stock',
        message: 'Champagne Glass quantity (150) is approaching minimum threshold (50)',
        isRead: false,
        createdAt: '2024-07-28',
    },
    {
        id: 3,
        itemId: 14,
        itemName: 'Wireless Headset',
        type: 'low_stock',
        message: 'Wireless Headset is out of stock (0) - minimum threshold is 2',
        isRead: false,
        createdAt: '2024-07-25',
    },
    {
        id: 4,
        itemId: 15,
        itemName: 'LED Strip Light',
        type: 'low_stock',
        message: 'LED Strip Light quantity (5) is approaching minimum threshold (3)',
        isRead: false,
        createdAt: '2024-07-22',
    },
    {
        id: 5,
        itemId: 10,
        itemName: 'Sound Mixer',
        type: 'low_stock',
        message: 'Sound Mixer quantity (2) is at minimum threshold (1)',
        isRead: true,
        createdAt: '2024-07-15',
    },
    {
        id: 6,
        itemId: 4,
        itemName: 'Round Table (6ft)',
        type: 'damage',
        message: 'Round Table #4 has significant scratches and needs repair',
        isRead: false,
        createdAt: '2024-07-26',
    },
    {
        id: 7,
        itemId: 8,
        itemName: 'Folding Chair',
        type: 'damage',
        message: '5 Folding chairs have broken legs and need replacement',
        isRead: false,
        createdAt: '2024-07-24',
    },
    {
        id: 8,
        itemId: 6,
        itemName: 'Projector Screen (10ft)',
        type: 'damage',
        message: 'Projector Screen #2 has a permanent crease affecting display quality',
        isRead: true,
        createdAt: '2024-07-18',
    },
];
const sampleVendors = [
    {
        id: 1,
        name: 'AudioPro Supplies',
        contactPerson: 'John Smith',
        email: 'john@audiopro.com',
        phone: '555-1234',
        address: '123 Audio Street, Tech City, TC 12345',
        website: 'www.audiopro.com',
        notes: 'Primary audio equipment supplier',
        createdAt: '2024-01-15',
    },
    {
        id: 2,
        name: 'LightTech Solutions',
        contactPerson: 'Sarah Johnson',
        email: 'sarah@lighttech.com',
        phone: '555-5678',
        address: '456 Lighting Ave, Bright City, BC 67890',
        website: 'www.lighttech.com',
        notes: 'Professional lighting equipment',
        createdAt: '2024-01-15',
    },
    {
        id: 3,
        name: 'Furniture World',
        contactPerson: 'Mike Davis',
        email: 'mike@furnitureworld.com',
        phone: '555-9012',
        address: '789 Furniture Blvd, Comfort City, CC 13579',
        website: 'www.furnitureworld.com',
        notes: 'Event furniture and seating',
        createdAt: '2024-01-15',
    },
    {
        id: 4,
        name: 'Catering Plus',
        contactPerson: 'Lisa Wilson',
        email: 'lisa@cateringplus.com',
        phone: '555-3456',
        address: '321 Catering Way, Food City, FC 24680',
        website: 'www.cateringplus.com',
        notes: 'Premium catering supplies and glassware',
        createdAt: '2024-01-15',
    },
    {
        id: 5,
        name: 'AV Solutions',
        contactPerson: 'David Brown',
        email: 'david@avsolutions.com',
        phone: '555-7890',
        address: '654 AV Road, Media City, MC 97531',
        website: 'www.avsolutions.com',
        notes: 'Audio-visual equipment and projectors',
        createdAt: '2024-01-15',
    },
];
const samplePurchaseOrders = [
    {
        id: 1,
        vendorId: 1,
        vendorName: 'AudioPro Supplies',
        orderNumber: 'PO-2024-001',
        orderDate: '2024-07-15',
        expectedDelivery: '2024-07-25',
        status: 'confirmed',
        totalAmount: 2400.00,
        notes: 'Restocking wireless microphones and headsets',
        items: [
            {
                id: 1,
                itemId: 1,
                itemName: 'Wireless Microphone Set',
                quantity: 4,
                unitCost: 120.00,
                totalCost: 480.00,
            },
            {
                id: 2,
                itemId: 14,
                itemName: 'Wireless Headset',
                quantity: 6,
                unitCost: 160.00,
                totalCost: 960.00,
            },
        ],
        createdAt: '2024-07-15',
    },
    {
        id: 2,
        vendorId: 2,
        vendorName: 'LightTech Solutions',
        orderNumber: 'PO-2024-002',
        orderDate: '2024-07-20',
        expectedDelivery: '2024-08-05',
        status: 'sent',
        totalAmount: 1200.00,
        notes: 'Additional LED lights for upcoming events',
        items: [
            {
                id: 3,
                itemId: 3,
                itemName: 'LED Stage Light',
                quantity: 8,
                unitCost: 95.00,
                totalCost: 760.00,
            },
            {
                id: 4,
                itemId: 15,
                itemName: 'LED Strip Light',
                quantity: 5,
                unitCost: 65.00,
                totalCost: 325.00,
            },
        ],
        createdAt: '2024-07-20',
    },
    {
        id: 3,
        vendorId: 3,
        vendorName: 'Furniture World',
        orderNumber: 'PO-2024-003',
        orderDate: '2024-07-22',
        expectedDelivery: '2024-08-10',
        status: 'draft',
        totalAmount: 1500.00,
        notes: 'Replacement tables and chairs',
        items: [
            {
                id: 5,
                itemId: 4,
                itemName: 'Round Table (6ft)',
                quantity: 5,
                unitCost: 150.00,
                totalCost: 750.00,
            },
            {
                id: 6,
                itemId: 8,
                itemName: 'Folding Chair',
                quantity: 50,
                unitCost: 18.00,
                totalCost: 900.00,
            },
        ],
        createdAt: '2024-07-22',
    },
];
// In-memory data storage (replace with database in production)
let clients = [...sampleClients];
let bookings = [...sampleBookings];

let payments = [...samplePayments];
let inventoryCategories = [...sampleInventoryCategories];
let inventoryItems = [...sampleInventoryItems];
let inventoryTransactions = [...sampleInventoryTransactions];
let inventoryAlerts = [...sampleInventoryAlerts];
let vendors = [...sampleVendors];
let purchaseOrders = [...samplePurchaseOrders];
// Validation helpers
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function validatePhone(phone) {
    const phoneRegex = /^[\d\s\-\(\)\+]+$/;
    return phoneRegex.test(phone) && phone.length >= 10;
}
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
// Simple login endpoint (for demo purposes)
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Simple hardcoded authentication for demo
    if (username === 'admin' && password === 'admin') {
        res.json({ success: true, message: 'Login successful' });
    }
    else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});
// Logout endpoint
app.post('/logout', (req, res) => {
    res.json({ success: true, message: 'Logout successful' });
});
// Dashboard analytics
app.get('/api/dashboard', (req, res) => {
    const totalClients = clients.length;
    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter(bk => bk.status === 'Pending').length;
    const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const pendingBalance = 0; // No invoices, so no pending balance
    const overdueCount = 0; // No invoices, so no overdue count
    
    res.json({
        totalClients,
        totalBookings,
        pendingBalance,
        overdueCount,
        pendingBookings,
        totalRevenue,
        recentActivity: [
            { type: 'payment', text: 'Payment received from Beta Events', date: '2024-07-15' },
            { type: 'booking', text: 'New booking: Gamma Group for Rooftop', date: '2024-07-10' },
            { type: 'client', text: 'New client registered: Acme Corp', date: '2024-07-25' },
        ],
    });
});
// Clients API
app.get('/api/clients', (req, res) => {
    const { search, status } = req.query;
    let filteredClients = [...clients];
    if (search) {
        const searchTerm = search.toString().toLowerCase();
        filteredClients = filteredClients.filter(client => {
            var _a;
            return client.name.toLowerCase().includes(searchTerm) ||
                client.email.toLowerCase().includes(searchTerm) ||
                ((_a = client.company) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(searchTerm));
        });
    }
    if (status && status !== 'all') {
        // Filter by booking status
        const activeClientIds = bookings
            .filter(b => b.status === 'Confirmed')
            .map(b => b.clientId);
        if (status === 'active') {
            filteredClients = filteredClients.filter(c => activeClientIds.includes(c.id));
        }
        else if (status === 'inactive') {
            filteredClients = filteredClients.filter(c => !activeClientIds.includes(c.id));
        }
    }
    res.json(filteredClients);
});
app.get('/api/clients/:id', (req, res) => {
    const client = clients.find(c => c.id === parseInt(req.params.id));
    if (!client) {
        return res.status(404).json({ error: 'Client not found' });
    }
    res.json(client);
});
app.post('/api/clients', (req, res) => {
    const { name, email, phone, company, address, notes } = req.body;
    // Validation
    if (!name || !email || !phone) {
        return res.status(400).json({ error: 'Name, email, and phone are required' });
    }
    if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }
    if (!validatePhone(phone)) {
        return res.status(400).json({ error: 'Invalid phone format' });
    }
    const newClient = {
        id: Math.max(...clients.map(c => c.id)) + 1,
        name,
        email,
        phone,
        company,
        address,
        notes,
        createdAt: new Date().toISOString().slice(0, 10),
    };
    clients.push(newClient);
    res.status(201).json(newClient);
});
app.put('/api/clients/:id', (req, res) => {
    const clientId = parseInt(req.params.id);
    const clientIndex = clients.findIndex(c => c.id === clientId);
    if (clientIndex === -1) {
        return res.status(404).json({ error: 'Client not found' });
    }
    const { name, email, phone, company, address, notes } = req.body;
    // Validation
    if (!name || !email || !phone) {
        return res.status(400).json({ error: 'Name, email, and phone are required' });
    }
    if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }
    if (!validatePhone(phone)) {
        return res.status(400).json({ error: 'Invalid phone format' });
    }
    clients[clientIndex] = Object.assign(Object.assign({}, clients[clientIndex]), { name,
        email,
        phone,
        company,
        address,
        notes });
    res.json(clients[clientIndex]);
});
app.delete('/api/clients/:id', (req, res) => {
    const clientId = parseInt(req.params.id);
    const clientIndex = clients.findIndex(c => c.id === clientId);
    if (clientIndex === -1) {
        return res.status(404).json({ error: 'Client not found' });
    }
    // Check if client has associated bookings
    const hasBookings = bookings.some(b => b.clientId === clientId);
    if (hasBookings) {
        return res.status(400).json({ error: 'Cannot delete client with associated bookings' });
    }
    clients.splice(clientIndex, 1);
    res.status(204).send();
});
// Bookings API
app.get('/api/bookings', (req, res) => {
    const { search, status, space } = req.query;
    let filteredBookings = [...bookings];
    if (search) {
        const searchTerm = search.toString().toLowerCase();
        filteredBookings = filteredBookings.filter(booking => booking.clientName.toLowerCase().includes(searchTerm) ||
            booking.eventType.toLowerCase().includes(searchTerm) ||
            booking.space.toLowerCase().includes(searchTerm));
    }
    if (status && status !== 'all') {
        filteredBookings = filteredBookings.filter(b => b.status === status);
    }
    if (space && space !== 'all') {
        filteredBookings = filteredBookings.filter(b => b.space === space);
    }
    res.json(filteredBookings);
});
app.get('/api/bookings/:id', (req, res) => {
    const booking = bookings.find(b => b.id === req.params.id);
    if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
});
app.post('/api/bookings', (req, res) => {
    const { clientId, date, startTime, endTime, space, attendees, eventType, notes, totalAmount, depositPaid } = req.body;
    // Validation
    if (!clientId || !date || !startTime || !endTime || !space || !attendees || !eventType) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    if (attendees <= 0) {
        return res.status(400).json({ error: 'Number of attendees must be greater than 0' });
    }
    if (totalAmount < 0) {
        return res.status(400).json({ error: 'Total amount cannot be negative' });
    }
    if (depositPaid < 0 || depositPaid > totalAmount) {
        return res.status(400).json({ error: 'Invalid deposit amount' });
    }
    const client = clients.find(c => c.id === clientId);
    if (!client) {
        return res.status(400).json({ error: 'Client not found' });
    }
    const newBooking = {
        id: 'BK-' + (2000 + bookings.length + 1),
        clientId,
        clientName: client.name,
        date,
        startTime,
        endTime,
        space,
        status: 'Pending',
        attendees,
        eventType,
        notes: notes || '',
        createdAt: new Date().toISOString().slice(0, 10),
        totalAmount,
        depositPaid: depositPaid || 0,
    };
    bookings.push(newBooking);
    res.status(201).json(newBooking);
});
app.put('/api/bookings/:id', (req, res) => {
    const bookingId = req.params.id;
    const bookingIndex = bookings.findIndex(b => b.id === bookingId);
    if (bookingIndex === -1) {
        return res.status(404).json({ error: 'Booking not found' });
    }
    const { clientId, date, startTime, endTime, space, status, attendees, eventType, notes, totalAmount, depositPaid } = req.body;
    // Validation
    if (!clientId || !date || !startTime || !endTime || !space || !attendees || !eventType) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const client = clients.find(c => c.id === clientId);
    if (!client) {
        return res.status(400).json({ error: 'Client not found' });
    }
    bookings[bookingIndex] = Object.assign(Object.assign({}, bookings[bookingIndex]), { clientId, clientName: client.name, date,
        startTime,
        endTime,
        space,
        status,
        attendees,
        eventType, notes: notes || '', totalAmount, depositPaid: depositPaid || 0 });
    res.json(bookings[bookingIndex]);
});
app.delete('/api/bookings/:id', (req, res) => {
    const bookingId = req.params.id;
    const bookingIndex = bookings.findIndex(b => b.id === bookingId);
    if (bookingIndex === -1) {
        return res.status(404).json({ error: 'Booking not found' });
    }
    bookings.splice(bookingIndex, 1);
    res.status(204).send();
});

// Payments API
app.get('/api/payments', (req, res) => {
    res.json(payments);
});
app.post('/api/payments', (req, res) => {
    const { clientId, amount, method, reference } = req.body;
    // Validation
    if (!clientId || !amount || !method) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const client = clients.find(c => c.id === clientId);
    if (!client) {
        return res.status(400).json({ error: 'Client not found' });
    }
    if (amount <= 0) {
        return res.status(400).json({ error: 'Payment amount must be greater than 0' });
    }
    const newPayment = {
        id: 'PAY-' + (payments.length + 1).toString().padStart(3, '0'),
        clientId,
        amount,
        method,
        reference: reference || '',
        status: 'completed',
        date: new Date().toISOString().slice(0, 10),
    };
    payments.push(newPayment);
    res.status(201).json(newPayment);
});
// Inventory Categories API
app.get('/api/inventory/categories', (req, res) => {
    const { search } = req.query;
    let filteredCategories = [...inventoryCategories];
    if (search) {
        const searchTerm = search.toString().toLowerCase();
        filteredCategories = filteredCategories.filter(category => {
            var _a;
            return category.name.toLowerCase().includes(searchTerm) ||
                ((_a = category.description) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(searchTerm));
        });
    }
    res.json(filteredCategories);
});
app.post('/api/inventory/categories', (req, res) => {
    const { name, description, venueId } = req.body;
    if (!name || !venueId) {
        return res.status(400).json({ error: 'Name and venueId are required' });
    }
    const newCategory = {
        id: Math.max(...inventoryCategories.map(c => c.id)) + 1,
        name,
        description,
        venueId,
        createdAt: new Date().toISOString().slice(0, 10),
    };
    inventoryCategories.push(newCategory);
    res.status(201).json(newCategory);
});
// Inventory Items API
app.get('/api/inventory/items', (req, res) => {
    const { search, category, status, lowStock } = req.query;
    let filteredItems = [...inventoryItems];
    if (search) {
        const searchTerm = search.toString().toLowerCase();
        filteredItems = filteredItems.filter(item => {
            var _a;
            return item.name.toLowerCase().includes(searchTerm) ||
                item.sku.toLowerCase().includes(searchTerm) ||
                ((_a = item.description) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(searchTerm));
        });
    }
    if (category && category !== 'all') {
        filteredItems = filteredItems.filter(item => item.categoryId === parseInt(category.toString()));
    }
    if (status && status !== 'all') {
        filteredItems = filteredItems.filter(item => item.status === status);
    }
    if (lowStock === 'true') {
        filteredItems = filteredItems.filter(item => item.quantity <= item.minQuantity);
    }
    res.json(filteredItems);
});
app.get('/api/inventory/items/:id', (req, res) => {
    const item = inventoryItems.find(i => i.id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).json({ error: 'Inventory item not found' });
    }
    res.json(item);
});
app.post('/api/inventory/items', (req, res) => {
    const { name, brand, description, sku, categoryId, venueId, quantity, minQuantity, maxQuantity, cost, rentalFees, specs, location, supplier, supplierContact, notes, reorderMark, reorderVendor } = req.body;
    if (!name || !sku || !categoryId || !venueId) {
        return res.status(400).json({ error: 'Name, SKU, categoryId, and venueId are required' });
    }
    // Check if SKU already exists
    if (inventoryItems.some(item => item.sku === sku)) {
        return res.status(400).json({ error: 'SKU already exists' });
    }
    const category = inventoryCategories.find(c => c.id === categoryId);
    if (!category) {
        return res.status(400).json({ error: 'Category not found' });
    }
    const newItem = {
        id: Math.max(...inventoryItems.map(i => i.id)) + 1,
        name,
        brand: brand || 'Generic',
        description,
        sku,
        categoryId,
        categoryName: category.name,
        venueId,
        quantity: quantity || 0,
        minQuantity: minQuantity || 0,
        maxQuantity,
        cost: cost || 0,
        rentalFees: rentalFees || 0,
        specs: specs || '',
        location,
        supplier,
        supplierContact,
        status: 'active',
        notes,
        reorderMark: reorderMark || 0,
        reorderVendor: reorderVendor || supplier || '',
        createdAt: new Date().toISOString().slice(0, 10),
        updatedAt: new Date().toISOString().slice(0, 10),
    };
    inventoryItems.push(newItem);
    res.status(201).json(newItem);
});
app.put('/api/inventory/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const itemIndex = inventoryItems.findIndex(i => i.id === itemId);
    if (itemIndex === -1) {
        return res.status(404).json({ error: 'Inventory item not found' });
    }
    const { name, brand, description, categoryId, quantity, minQuantity, maxQuantity, cost, rentalFees, specs, location, supplier, supplierContact, status, notes, reorderMark, reorderVendor } = req.body;
    if (!name || !categoryId) {
        return res.status(400).json({ error: 'Name and categoryId are required' });
    }
    const category = inventoryCategories.find(c => c.id === categoryId);
    if (!category) {
        return res.status(400).json({ error: 'Category not found' });
    }
    inventoryItems[itemIndex] = Object.assign(Object.assign({}, inventoryItems[itemIndex]), { name, brand: brand || inventoryItems[itemIndex].brand, description,
        categoryId, categoryName: category.name, quantity: quantity || 0, minQuantity: minQuantity || 0, maxQuantity, cost: cost || 0, rentalFees: rentalFees || 0, specs: specs || inventoryItems[itemIndex].specs, location,
        supplier,
        supplierContact, status: status || 'active', notes, reorderMark: reorderMark || 0, reorderVendor: reorderVendor || supplier || '', updatedAt: new Date().toISOString().slice(0, 10) });
    res.json(inventoryItems[itemIndex]);
});
// Inventory Transactions API
app.get('/api/inventory/transactions', (req, res) => {
    const { itemId, type, search } = req.query;
    let filteredTransactions = [...inventoryTransactions];
    if (itemId) {
        filteredTransactions = filteredTransactions.filter(t => t.itemId === parseInt(itemId.toString()));
    }
    if (type && type !== 'all') {
        filteredTransactions = filteredTransactions.filter(t => t.type === type);
    }
    if (search) {
        const searchTerm = search.toString().toLowerCase();
        filteredTransactions = filteredTransactions.filter(t => {
            var _a, _b;
            return t.itemName.toLowerCase().includes(searchTerm) ||
                ((_a = t.reason) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(searchTerm)) ||
                ((_b = t.reference) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(searchTerm));
        });
    }
    res.json(filteredTransactions);
});
app.post('/api/inventory/transactions', (req, res) => {
    const { itemId, type, quantity, reason, reference, notes, performedBy } = req.body;
    if (!itemId || !type || !quantity || !performedBy) {
        return res.status(400).json({ error: 'itemId, type, quantity, and performedBy are required' });
    }
    const item = inventoryItems.find(i => i.id === itemId);
    if (!item) {
        return res.status(400).json({ error: 'Inventory item not found' });
    }
    const previousQuantity = item.quantity;
    let newQuantity = previousQuantity;
    switch (type) {
        case 'in':
            newQuantity = previousQuantity + quantity;
            break;
        case 'out':
            if (quantity > previousQuantity) {
                return res.status(400).json({ error: 'Insufficient stock' });
            }
            newQuantity = previousQuantity - quantity;
            break;
        case 'adjustment':
            newQuantity = quantity;
            break;
        case 'damage':
        case 'expiry':
            if (quantity > previousQuantity) {
                return res.status(400).json({ error: 'Insufficient stock' });
            }
            newQuantity = previousQuantity - quantity;
            break;
        default:
            return res.status(400).json({ error: 'Invalid transaction type' });
    }
    const newTransaction = {
        id: Math.max(...inventoryTransactions.map(t => t.id)) + 1,
        itemId,
        itemName: item.name,
        type,
        quantity,
        previousQuantity,
        newQuantity,
        reason,
        reference,
        notes,
        performedBy,
        createdAt: new Date().toISOString().slice(0, 10),
    };
    inventoryTransactions.push(newTransaction);
    // Update item quantity
    const itemIndex = inventoryItems.findIndex(i => i.id === itemId);
    if (itemIndex !== -1) {
        inventoryItems[itemIndex].quantity = newQuantity;
        inventoryItems[itemIndex].updatedAt = new Date().toISOString().slice(0, 10);
        // Update lastRestocked if it's an 'in' transaction
        if (type === 'in') {
            inventoryItems[itemIndex].lastRestocked = new Date().toISOString().slice(0, 10);
        }
    }
    res.status(201).json(newTransaction);
});
// Inventory Alerts API
app.get('/api/inventory/alerts', (req, res) => {
    const { type, isRead } = req.query;
    let filteredAlerts = [...inventoryAlerts];
    if (type && type !== 'all') {
        filteredAlerts = filteredAlerts.filter(a => a.type === type);
    }
    if (isRead !== undefined) {
        filteredAlerts = filteredAlerts.filter(a => a.isRead === (isRead === 'true'));
    }
    res.json(filteredAlerts);
});
app.put('/api/inventory/alerts/:id/read', (req, res) => {
    const alertId = parseInt(req.params.id);
    const alertIndex = inventoryAlerts.findIndex(a => a.id === alertId);
    if (alertIndex === -1) {
        return res.status(404).json({ error: 'Alert not found' });
    }
    inventoryAlerts[alertIndex].isRead = true;
    res.json(inventoryAlerts[alertIndex]);
});
// Inventory Analytics
app.get('/api/inventory/analytics', (req, res) => {
    const totalItems = inventoryItems.length;
    const totalValue = inventoryItems.reduce((sum, item) => sum + (item.quantity * item.cost), 0);
    const lowStockItems = inventoryItems.filter(item => item.quantity <= item.minQuantity).length;
    const outOfStockItems = inventoryItems.filter(item => item.quantity === 0).length;
    const activeItems = inventoryItems.filter(item => item.status === 'active').length;
    const recentTransactions = inventoryTransactions
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);
    res.json({
        totalItems,
        totalValue,
        lowStockItems,
        outOfStockItems,
        activeItems,
        recentTransactions,
    });
});
// Vendors API
app.get('/api/inventory/vendors', (req, res) => {
    const { search } = req.query;
    let filteredVendors = [...vendors];
    if (search) {
        const searchTerm = search.toString().toLowerCase();
        filteredVendors = filteredVendors.filter(vendor => vendor.name.toLowerCase().includes(searchTerm) ||
            vendor.contactPerson.toLowerCase().includes(searchTerm) ||
            vendor.email.toLowerCase().includes(searchTerm));
    }
    res.json(filteredVendors);
});
app.post('/api/inventory/vendors', (req, res) => {
    const { name, contactPerson, email, phone, address, website, notes } = req.body;
    if (!name || !contactPerson || !email || !phone || !address) {
        return res.status(400).json({ error: 'Name, contact person, email, phone, and address are required' });
    }
    const newVendor = {
        id: Math.max(...vendors.map(v => v.id)) + 1,
        name,
        contactPerson,
        email,
        phone,
        address,
        website,
        notes,
        createdAt: new Date().toISOString().slice(0, 10),
    };
    vendors.push(newVendor);
    res.status(201).json(newVendor);
});
// Purchase Orders API
app.get('/api/inventory/purchase-orders', (req, res) => {
    const { status, vendorId, search, priority } = req.query;
    let filteredOrders = [...purchaseOrders];
    if (status && status !== 'all') {
        filteredOrders = filteredOrders.filter(order => order.status === status);
    }
    if (vendorId) {
        filteredOrders = filteredOrders.filter(order => order.vendorId === parseInt(vendorId.toString()));
    }
    if (priority && priority !== 'all') {
        filteredOrders = filteredOrders.filter(order => order.priority === priority);
    }
    if (search) {
        const searchTerm = search.toString().toLowerCase();
        filteredOrders = filteredOrders.filter(order => {
            var _a;
            return order.orderNumber.toLowerCase().includes(searchTerm) ||
                order.vendorName.toLowerCase().includes(searchTerm) ||
                ((_a = order.notes) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(searchTerm));
        });
    }
    // Sort by creation date (newest first)
    filteredOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    res.json(filteredOrders);
});
app.post('/api/inventory/purchase-orders', (req, res) => {
    const { vendorId, orderNumber, orderDate, expectedDelivery, notes, items, terms, shippingMethod, priority } = req.body;
    if (!vendorId || !orderNumber || !orderDate || !items || items.length === 0) {
        return res.status(400).json({ error: 'Vendor ID, order number, order date, and items are required' });
    }
    const vendor = vendors.find(v => v.id === vendorId);
    if (!vendor) {
        return res.status(400).json({ error: 'Vendor not found' });
    }
    const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.unitCost), 0);
    const newOrder = {
        id: Math.max(...purchaseOrders.map(o => o.id)) + 1,
        vendorId,
        vendorName: vendor.name,
        orderNumber,
        orderDate,
        expectedDelivery,
        status: 'draft',
        totalAmount,
        notes,
        terms: terms || 'Net 30',
        shippingMethod: shippingMethod || 'Standard',
        priority: priority || 'normal',
        items: items.map((item, index) => ({
            id: index + 1,
            itemId: item.itemId,
            itemName: item.itemName,
            quantity: item.quantity,
            unitCost: item.unitCost,
            totalCost: item.quantity * item.unitCost,
            sku: item.sku,
            description: item.description,
        })),
        createdAt: new Date().toISOString().slice(0, 10),
    };
    purchaseOrders.push(newOrder);
    res.status(201).json(newOrder);
});
// Get single purchase order
app.get('/api/inventory/purchase-orders/:id', (req, res) => {
    const orderId = parseInt(req.params.id);
    const order = purchaseOrders.find(o => o.id === orderId);
    if (!order) {
        return res.status(404).json({ error: 'Purchase order not found' });
    }
    res.json(order);
});
// Update purchase order status
app.put('/api/inventory/purchase-orders/:id/status', (req, res) => {
    const orderId = parseInt(req.params.id);
    const { status, approvedBy } = req.body;
    const orderIndex = purchaseOrders.findIndex(o => o.id === orderId);
    if (orderIndex === -1) {
        return res.status(404).json({ error: 'Purchase order not found' });
    }
    const order = purchaseOrders[orderIndex];
    order.status = status;
    // Update timestamps based on status
    switch (status) {
        case 'sent':
            order.sentAt = new Date().toISOString().slice(0, 10);
            break;
        case 'confirmed':
            order.approvedBy = approvedBy;
            order.approvedAt = new Date().toISOString().slice(0, 10);
            break;
        case 'received':
            order.receivedAt = new Date().toISOString().slice(0, 10);
            break;
    }
    purchaseOrders[orderIndex] = order;
    res.json(order);
});
// Get purchase order analytics
app.get('/api/inventory/purchase-orders/analytics', (req, res) => {
    const totalOrders = purchaseOrders.length;
    const totalSpent = purchaseOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const pendingOrders = purchaseOrders.filter(order => order.status === 'draft' || order.status === 'sent').length;
    const confirmedOrders = purchaseOrders.filter(order => order.status === 'confirmed').length;
    const receivedOrders = purchaseOrders.filter(order => order.status === 'received').length;
    // Vendor performance
    const vendorStats = vendors.map(vendor => {
        const vendorOrders = purchaseOrders.filter(order => order.vendorId === vendor.id);
        const totalVendorSpent = vendorOrders.reduce((sum, order) => sum + order.totalAmount, 0);
        const avgOrderValue = vendorOrders.length > 0 ? totalVendorSpent / vendorOrders.length : 0;
        return {
            vendorId: vendor.id,
            vendorName: vendor.name,
            totalOrders: vendorOrders.length,
            totalSpent: totalVendorSpent,
            avgOrderValue: avgOrderValue,
            lastOrderDate: vendorOrders.length > 0 ?
                vendorOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].createdAt :
                null
        };
    });
    res.json({
        totalOrders,
        totalSpent,
        pendingOrders,
        confirmedOrders,
        receivedOrders,
        vendorStats
    });
});
// Client details with bookings and payments
app.get('/api/clients/:id/details', (req, res) => {
    const clientId = parseInt(req.params.id);
    const client = clients.find(c => c.id === clientId);
    if (!client) {
        return res.status(404).json({ error: 'Client not found' });
    }
    const clientBookings = bookings.filter(b => b.clientId === clientId);
    const clientPayments = payments.filter(p => p.clientId === clientId);
    res.json({
        client,
        bookings: clientBookings,
        payments: clientPayments,
    });
});
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Dashboard: http://localhost:${PORT}/api/health`);
    console.log(`👥 Clients: http://localhost:${PORT}/api/clients`);
    console.log(`📅 Bookings: http://localhost:${PORT}/api/bookings`);
    console.log(`💳 Payments: http://localhost:${PORT}/api/payments`);
    console.log(`📦 Inventory: http://localhost:${PORT}/api/inventory/items`);
    console.log(`🔄 Transactions: http://localhost:${PORT}/api/inventory/transactions`);
    console.log(`🏷️ Categories: http://localhost:${PORT}/api/inventory/categories`);
    console.log(`⚠️ Alerts: http://localhost:${PORT}/api/inventory/alerts`);
});
// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    process.exit(0);
});
process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    process.exit(0);
});
